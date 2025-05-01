"use client";

import { ChevronLeft, Bell, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/img/icons8-verified-16.png";

const UserProfile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <div className="flex w-full justify-between">
        <ChevronLeft className="text-white mr-9.25" />
        <div className="flex text-white text-[18px] font-bold items-center justify-center">
          Enji
          <Image src={VerifiedIcon} alt="verified" className="w-4 h-4 ml-1" />
        </div>
        <div className="flex gap-2.75 items-center justify-center">
          <Bell className="text-white w-[30px] h-[30px] bg-[#434343] rounded-full p-2" />
          <EllipsisVertical className="text-white w-4.5 h-4.5" />
        </div>
      </div>
      <div className="w-full lg:h-[319px] bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8"></div>
    </div>
  );
};

export default UserProfile;
