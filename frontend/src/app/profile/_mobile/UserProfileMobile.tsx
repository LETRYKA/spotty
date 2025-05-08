"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import HeaderMobileProfile from "./Header";
import { Button } from "@/components/ui/button";
import { ChevronDown, Navigation } from "lucide-react";
import diddyImg from "@/../public/diddyImg.png";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import EditProfile from "./EditProfile";

interface Event {
  id: string;
  title: string;
  backgroundImage?: string;
  participants?: any[];
  participantLimit?: number;
}

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phoneNumber?: string;
  isVerified: boolean;
  otpCode?: string;
  otpExpiresAt?: Date;
  avatarImage?: string;
  backgroundImage?: string;
  moodStatus?: string;
  batteryLevel?: number;
  friendships: [];
  friendsOf: [];
  locations: Location[];
  events: Event[];
  joinedEvents: Event[];
  stories: [];
  createdAt: Date;
}

const UserProfileMobile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async (): Promise<User | null> => {
      try {
        const res = await fetch(
          `https://spotty-5r8n.onrender.com/api/users/${user?.id}`
        );
        const data = await res.json();
        console.log("user", data);
        setUserData(data);
        return data;
      } catch (err) {
        console.error("failed", err);
        return null;
      }
    };

    if (user) {
      fetchUser();
    }
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile
        name={userData?.name || "Unknown"}
        isVerified={userData?.isVerified || false}
      />

      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <img
            src={userData?.backgroundImage || diddyImg.src}
            alt=""
            className="w-full h-26 rounded-3xl object-cover"
          />
          <Avatar className="rounded-full">
            <AvatarImage
              className="rounded-full object-cover w-27.25 h-27.25 absolute left-1/2 -translate-x-1/2 top-13 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
              src={userData?.avatarImage || diddyImg.src}
              alt="User Profile"
            />
          </Avatar>
        </div>
      </div>
      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
        <span className="text-white opacity-50">{userData?.moodStatus}</span>
      </div>
      <div className="flex justify-between w-70.25 mt-6.25">
        <div className="flex flex-col items-center">
          <div className="text-white">{userData?.friendships?.length ?? 0}</div>
          <div className="text-white opacity-50">Friends</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData?.events?.length ?? 0}</div>
          <div className="text-white opacity-50">Events</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">
            {userData?.joinedEvents?.length ?? 0}
          </div>
          <div className="text-white opacity-50">Participated</div>
        </div>
      </div>
      <div className="flex w-full mt-10 gap-3">
        <Link href={`/friends`} className="w-2/4">
          <Button className="bg-[#333333] w-full py-6 rounded-lg font-semibold">
            Friends <ChevronDown />
          </Button>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-[#333333] w-2/4 py-6 rounded-lg font-semibold">
              Edit Profile
            </Button>
          </SheetTrigger>
          <EditProfile />
        </Sheet>
      </div>
      {/* EVENT HISTORY */}
      <div className="w-full mt-10">
        {userData?.events?.map((event, index) => (
          <div
            key={event.id || index}
            className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-5 flex justify-between items-center gap-2.5 px-2"
          >
            <div className="flex">
              <Image
                src={event.backgroundImage || diddyImg}
                alt={event.title}
                className="w-19 h-19"
                width={1000}
                height={1000}
              />
              <div className="flex flex-col justify-center ml-3">
                <div className="text-white text-[18px]">{event.title}</div>
                <div className="flex gap-3">
                  <span className="text-[12px] text-white opacity-50">
                    LETRYKA
                  </span>
                  <span className="flex text-[12px] text-white opacity-50 items-center">
                    <Navigation className="w-4 h-4 mr-1" /> Ulaanbaatar
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-16 justify-between">
              <Button className="w-[84px] h-5 bg-[#164339] text-[8px] border-1 border-[#007e62]">
                Болж байгаа
              </Button>
              <div className="flex items-center">
                <div className="flex absolute">
                  <div className="bg-[#939393] w-5 h-5 rounded-full relative"></div>
                  <div className="bg-[#b7b7b7] w-5 h-5 rounded-full relative right-2"></div>
                  <div className="bg-[#d9d9d9] w-5 h-5 rounded-full relative right-4"></div>
                </div>
                <div className="text-white pl-13">
                  {event.participants?.length ?? 0}/
                  {event.participantLimit ?? "∞"}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfileMobile;
