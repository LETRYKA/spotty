"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, ChevronDown, ChevronLast, ChevronLeft } from "lucide-react";
import { getUserData } from "@/lib/api";
import { User } from "../_web/types/User";
import HeaderMobileProfile from "./_components/Header";
import EventCardsMobile from "./_components/EventCardMobile";
import { Button } from "@/components/ui/button";
import EditProfile from "./_components/EditProfile";
import Blackhole from "@/img/wallpapersden.com_black-hole-hd-digital_3840x1620.jpg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import Friends from "./_components/Friends";
import EditAvatar from "./_components/EditAvatar";

const UserProfileMobile = () => {
  const [userData, setLocalUserData] = useState<User | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [friendsPageOpen, setFriendsPageOpen] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const data = await getUserData(userId);
        setLocalUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return (
      <div className="w-full h-full flex flex-col items-center p-6 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-gray-700 mb-4"></div>
        <div className="w-2/3 h-6 bg-gray-700 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-700 rounded mb-6"></div>
        <div className="w-full h-40 bg-gray-800 rounded-3xl mb-4"></div>
        <div className="w-full flex gap-4">
          <div className="flex-1 h-12 bg-gray-700 rounded"></div>
          <div className="flex-1 h-12 bg-gray-700 rounded"></div>
        </div>
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
            <div className="-mt-16 relative w-[128px] h-[128px]">
              <EditAvatar />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
      </div>

      <div className="flex justify-center flex-row mt-6.25 gap-10 ">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="text-white">{userData.friendsOf?.length ?? 0}</div>
          <div className="text-white opacity-50 text-[80%]">Найз</div>
        </div>
        <div className="flex flex-col items-center ml-4">
          <div className="text-white">{userData.events?.length ?? 0}</div>
          <div className="text-white flex flex-row opacity-50 text-[80%]">Арга хэмжээ</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.joinedEvents?.length ?? 0}</div>
          <div className="text-white opacity-50 text-[80%]">Хамрагдсан</div>
        </div>
      </div>

      <div className="flex w-full px-4 sm:px-10 gap-3 mt-10 justify-center items-center">
        <Button
          onClick={() => setFriendsPageOpen(true)}
          className="bg-[#333333] w-2/4 h-12.25"
        >
          Найзууд <ChevronRight className="ml-1 w-4 h-4" />
        </Button>
        <Button
          onClick={() => setEditProfileOpen(true)}
          className="bg-[#333333] w-2/4 h-12.25"
        >
          Профайл засах
        </Button>
      </div>

      <EventCardsMobile />

      {editProfileOpen && (
        <EditProfile
          open={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
        />
      )}

      <Sheet
        open={friendsPageOpen}
        onOpenChange={(open) => setFriendsPageOpen(open)}
      >
        <SheetContent
          side="right"
          className="w-full h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
        >
          <SheetHeader className="border-none shadow-none bg-transparent">
            <div className="flex justify-between items-center w-full">
              <SheetClose asChild>
                <button
                  onClick={() => setFriendsPageOpen(false)}
                  className="w-20 flex items-center justify-start"
                >
                  <ChevronLeft className="text-white hover:bg-muted rounded w-6 h-6" />
                </button>
              </SheetClose>
              <div className="flex items-center text-white font-bold text-lg">
                Friends List
              </div>
            </div>
            <DialogTitle className="sr-only"></DialogTitle>
          </SheetHeader>

          <div className="mt-4">
            <Friends />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default UserProfileMobile;
