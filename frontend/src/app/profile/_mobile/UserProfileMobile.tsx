"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import HeaderMobileProfile from "./Header";
import { Button } from "@/components/ui/button";
import { ChevronDown, Navigation, Plus, ArrowLeft } from "lucide-react";
import diddyImg from "@/../public/diddyImg.png";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import EditProfile from "./EditProfile";

const UserProfileMobile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-7">
      <HeaderMobileProfile />
      <div
        className="w-full flex flex-col rounded-2xl h-26 mt-8 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://i.pinimg.com/1200x/b9/e6/da/b9e6da7fe10a7f908b68e552d44e15ee.jpg)`,
        }}
      ></div>
      <Avatar className="-mt-14 relative">
        <AvatarImage
          className="rounded-full object-cover w-27 h-auto aspect-square bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
          src="https://i.pinimg.com/236x/fc/3d/2a/fc3d2ab28b96352bfe48a4a8ebed81f4.jpg"
          alt="User Profile"
        />
        <Link href={`/addstory`}>
          <div className="w-9 h-auto aspect-square bg-[var(--background)] rounded-full absolute -bottom-1 right-0 border-3 border-[#141414] flex justify-center items-center">
            <Plus strokeWidth={3} width={15} />
          </div>
        </Link>
      </Avatar>
      <div className="mt-4 flex justify-center items-center flex-col">
        <p className="text-[var(--background)] text-2xl font-semibold">
          @Enjiiiiibn
        </p>
        <span className="text-[var(--background)]/50 text-sm font-light mt-1">
          Mood status here mf
        </span>
      </div>
      <div className="w-full flex justify-center mt-6">
        <div className="flex flex-col items-center w-2/6">
          <p className="text-[var(--background)] font-bold text-lg">324</p>
          <p className="text-[var(--background)]/30 text-xs">Friends</p>
        </div>
        <div className="flex flex-col items-center w-2/6">
          <p className="text-[var(--background)] font-bold text-lg">69</p>
          <p className="text-[var(--background)]/30 text-xs">Events</p>
        </div>
        <div className="flex flex-col items-center w-2/6">
          <p className="text-[var(--background)] font-bold text-lg">60</p>
          <p className="text-[var(--background)]/30 text-xs">Participated</p>
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
      <div className="w-full mt-10"></div>
      <div className="w-full bg-[#19181A] border-1 border-[#2A2A2A] flex justify-between items-center p-3 rounded-2xl h-[99px]">
        <div className="flex h-full">
          <Image
            src={diddyImg}
            alt="diddy"
            className="h-full w-auto aspect-square"
          />
          <div className="flex flex-col justify-center ml-4">
            <div className="text-[var(--background)] text-base font-semibold">
              Diddy Party
            </div>
            <div className="flex gap-3 items-center mt-1">
              <span className="flex text-xs text-white opacity-50 items-center">
                <Navigation className="w-3 h-auto aspect-square  mr-1" />{" "}
                Ulaanbaatar, MN
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <Button className=" bg-[#06D6A0]/20 text-[0.6rem] font-semibold border-1 border-[#06D6A0] rounded-full px-4 h-7">
            Болж байгаа
          </Button>
          <div className="flex items-center relative">
            <div className="flex absolute justify-end items-center bottom-1 right-1">
              <div className="bg-[#939393] w-5 h-5 rounded-full"></div>
              <div className="bg-[#b7b7b7] w-5 h-5 rounded-full -ml-2"></div>
              <div className="bg-[#d9d9d9] w-5 h-5 rounded-full -ml-2"></div>
              <div className="text-white ml-2">4/10</div>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
    </div>
  );
};

export default UserProfileMobile;
