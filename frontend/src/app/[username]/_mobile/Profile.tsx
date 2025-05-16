"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getUserByName } from "@/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HeaderMobileProfile from "./_components/Header";
import EventCardsMobile from "./_components/EventCardMobile";
import Friends from "./_components/Friends";
import Blackhole from "@/img/wallpapersden.com_black-hole-hd-digital_3840x1620.jpg";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";

import AddFriendButton from "./_components/AddFriendButton";

const ViewUserProfileMobile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<any | null>(null);
  const [friendsPageOpen, setFriendsPageOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const data = await getUserByName(
          typeof username === "string" ? username : ""
        );
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setCurrentUserId(storedUserId);
    }
  }, []);

  if (!userData) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile
        name={userData.name || "Unknown"}
        isVerified={userData.isVerified || false}
      />

      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <img
            src={userData?.backgroundImage || Blackhole.src}
            alt="Background"
            className="w-full h-26 rounded-3xl object-cover"
          />

          <div className="w-full flex justify-center">
            <Avatar className="-mt-16 relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] to-[#F98437] w-[128px] h-[128px]">
              <AvatarImage
                className="rounded-full border-3 border-black object-cover"
                src={userData?.avatarImage}
                alt="User Profile"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
        <span className="text-white opacity-50">@{userData?.name}</span>
      </div>

      <div className="flex justify-center flex-row mt-6.25 gap-10">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="text-white">{userData.friendsOf?.length ?? 0}</div>
          <div className="text-white opacity-50">Найз</div>
        </div>
        <div className="flex flex-col items-center mt-[1px]">
          <div className="text-white">{userData.events?.length ?? 0}</div>
          <div className="text-white opacity-50">Арга хэмжээ</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.joinedEvents?.length ?? 0}</div>
          <div className="text-white opacity-50">Хамрагдсан</div>
        </div>
      </div>

      <div className="flex w-full px-4 sm:px-10 gap-3 mt-10 justify-center items-center">
        <Button
          onClick={() => setFriendsPageOpen(true)}
          className="bg-[#333333] w-2/4 h-12.25"
        >
          Friends <ChevronDown className="ml-1 w-4 h-4" />
        </Button>
        {currentUserId && currentUserId !== userData.id && (
          <AddFriendButton
            friendId={userData.id}
            userId={currentUserId}
            refreshFriends={() => setFriendsPageOpen(false)}
            isFriend={userData.friendsOf?.some(
              (f: any) => f.id === currentUserId
            )}
            requestPending={userData.friendRequestsSent?.some(
              (r: any) => r.id === currentUserId
            )}
          />
        )}
      </div>

      <EventCardsMobile userId={userData.id} />

      {/* FRIENDS SHEET */}
      <Sheet
        open={friendsPageOpen}
        onOpenChange={(open) => setFriendsPageOpen(open)}
      >
        <SheetContent
          side="bottom"
          className="w-full max-h-[90vh] rounded-t-2xl bg-[#19181A] flex flex-col border-none shadow-none outline-none p-6"
        >
          <DialogTitle className="sr-only">Friends List</DialogTitle>{" "}
          {/* ADD THIS */}
          <SheetHeader className="border-none shadow-none bg-transparent">
            <div className="w-12 h-1.5 rounded-full bg-zinc-500 mx-auto mb-4" />
            <div className="flex justify-between items-center w-full">
              <SheetClose asChild>
                <button
                  onClick={() => setFriendsPageOpen(false)}
                  className="w-20 flex items-center justify-start"
                >
                  <ChevronDown className="text-white hover:bg-muted rounded w-6 h-6" />
                </button>
              </SheetClose>
              <div className="flex items-center text-white font-bold text-lg">
                Friends List
              </div>
            </div>
          </SheetHeader>
          <div className="mt-4 overflow-y-auto max-h-[75vh]">
            <Friends profileUserId={userData.id} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ViewUserProfileMobile;
