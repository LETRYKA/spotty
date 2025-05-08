"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { getUserData } from "@/lib/api";
import { useUserStore } from "@/app/profile/_web/store/userStore";

import { User } from "../_web/types/User";
import HeaderMobileProfile from "./Header";
import EventCardsMobile from "./_components/event-card-mobile";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const UserProfileMobile = () => {
  const { userData, setFullUserData } = useUserStore();
  const [localUserData, setLocalUserData] = useState<User | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const data = await getUserData(id);
        setLocalUserData(data);
        setFullUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUser(userId);
    }
  }, [userId, setFullUserData]);

  if (!userData) {
    return <div className="w-full h-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile
        name={userData.name || "Unknown"}
        isVerified={false}
      />

      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <img
            src={userData?.backgroundImage || undefined}
            alt=""
            className="w-full h-26 rounded-3xl object-cover"
          />
          <Avatar className="rounded-full">
            <AvatarImage
              className="rounded-full object-cover w-27.25 h-27.25 absolute left-1/2 -translate-x-1/2 top-13 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
              src={userData?.avatarImage}
              alt="User Profile"
            />
          </Avatar>
        </div>
      </div>
      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
        <span className="text-white opacity-50">{userData?.moodStatus}</span>
      </div>

      {/* Stats */}
      <div className="flex justify-between w-70.25 mt-6.25">
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.friendships?.length ?? 0}</div>
          <div className="text-white opacity-50">Friends</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.events?.length ?? 0}</div>
          <div className="text-white opacity-50">Events</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.joinedEvents?.length ?? 0}</div>
          <div className="text-white opacity-50">Participated</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full px-4 sm:px-10 gap-3 mt-10 justify-center items-center">
        <Button className="bg-[#333333] w-2/4 h-12.25">
          Friends <ChevronDown className="ml-1 w-4 h-4" />
        </Button>
        <Button className="bg-[#333333] w-2/4 h-12.25">Edit Profile</Button>
      </div>

      {/* Events List */}
      <EventCardsMobile />
    </div>
  );
};

export default UserProfileMobile;
