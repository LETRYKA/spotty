"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import HeaderMobileProfile from "./Header";
import { Button } from "@/components/ui/button";
import { ChevronDown, Navigation } from "lucide-react";
import diddyImg from "@/../public/diddyImg.png";
import Image from "next/image";
const UserProfileMobile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile />
      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <Avatar className="rounded-full">
            <AvatarImage
              className="rounded-full object-cover w-27.25 h-27.25 absolute left-1/2 -translate-x-1/2 top-13 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
              src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
              alt="User Profile"
            />
          </Avatar>
        </div>
      </div>
      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">@Enjiiiiibn</div>
        <span className="text-white opacity-50">Mood status here mf</span>
      </div>
      <div className="flex justify-between w-70.25 mt-6.25">
        <div className="flex flex-col items-center">
          <div className="text-white">324</div>
          <div className="text-white opacity-50">Friends</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">69</div>
          <div className="text-white opacity-50">Events</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">60</div>
          <div className="text-white opacity-50">Participated</div>
        </div>
      </div>
      <div className="flex w-full px-4 sm:px-10 gap-3 mt-10 justify-center items-center">
        <Button className="bg-[#333333] w-2/4 h-12.25">
          Friends <ChevronDown />
        </Button>
        <Button className="bg-[#333333] w-2/4 h-12.25">Edit Profile</Button>
      </div>

      <div className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-10.5 flex justify-between items-center gap-2.5 px-2">
        <div className="flex">
          <Image
            src={diddyImg}
            alt="diddy"
            className="w-19 h-19 "
            width={1000}
            height={1000}
          />
          <div className="flex flex-col justify-center ml-3">
            <div className="text-white text-[18px]">Diddy after party</div>
            <div className="flex gap-3">
              <span className="text-[12px] text-white opacity-50">LETRYKA</span>
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
            <div className="text-white pl-13">4/10</div>
          </div>
        </div>
      </div>
      <div className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-5 flex justify-between items-center gap-2.5 px-2">
        <div className="flex">
          <Image
            src={diddyImg}
            alt="diddy"
            className="w-19 h-19 "
            width={1000}
            height={1000}
          />
          <div className="flex flex-col justify-center ml-3">
            <div className="text-white text-[18px]">Diddy after party</div>
            <div className="flex gap-3">
              <span className="text-[12px] text-white opacity-50">LETRYKA</span>
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
            <div className="text-white pl-13">4/10</div>
          </div>
        </div>
      </div>
      <div className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-5 flex justify-between items-center gap-2.5 px-2">
        <div className="flex">
          <Image
            src={diddyImg}
            alt="diddy"
            className="w-19 h-19 "
            width={1000}
            height={1000}
          />
          <div className="flex flex-col justify-center ml-3">
            <div className="text-white text-[18px]">Diddy after party</div>
            <div className="flex gap-3">
              <span className="text-[12px] text-white opacity-50">LETRYKA</span>
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
            <div className="text-white pl-13">4/10</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileMobile;
