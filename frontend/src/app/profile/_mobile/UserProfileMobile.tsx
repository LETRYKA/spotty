"use client"

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getUserData } from "@/lib/api";
import { User } from "../_web/types/User";
import HeaderMobileProfile from "./_components/Header";
import EventCardsMobile from "./_components/EventCardMobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import EditProfile from "./_components/EditProfile";
import { Sheet, SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import Friends from "./_components/Friends";
import DefaultAvatar from "@/img/default_avatar.png"
const UserProfileMobile = () => {
  const [userData, setLocalUserData] = useState<User | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [friendsPageOpen, setFriendsPageOpen] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const data = await getUserData(id);
        setLocalUserData(data);
        console.log("User data fetched:", data);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

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
            src={userData?.backgroundImage || ""}
            alt="Background"
            className="w-full h-26 rounded-3xl object-cover"
          />

          <div className="w-full flex justify-center">
            <Avatar className="-mt-16 relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] to-[#F98437] w-[128px] h-[128px]">
              <AvatarImage
                className="rounded-full border-3 border-black object-cover"
                src={userData?.avatarImage || DefaultAvatar.src}
                alt="User Profile"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
        <span className="text-white opacity-50">{userData?.moodStatus}</span>
      </div>

      <div className="flex justify-between w-70.25 mt-6.25">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="text-white">
            {userData.friendsOf?.length ?? 0}
          </div>
          <div className="text-white opacity-50">Найз</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">
            {userData.events?.length ?? 0}
          </div>
          <div className="text-white opacity-50">Арга хэмжээ</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">
            {userData.joinedEvents?.length ?? 0}
          </div>
          <div className="text-white opacity-50">Хамрагдсан</div>
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
        <EditProfile open={editProfileOpen} onClose={() => setEditProfileOpen(false)} />
      )}

      <Sheet open={friendsPageOpen} onOpenChange={(open) => setFriendsPageOpen(open)}>
        <SheetContent
          side="right"
          className="w-full h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
        >
          <SheetHeader className="border-none shadow-none bg-transparent">
            <div className="flex justify-between items-center w-full">
              <SheetClose asChild>
                <button onClick={() => setFriendsPageOpen(false)} className="w-20 flex items-center justify-start">
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
