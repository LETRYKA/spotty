"use client";

import { ChevronLeft, Bell, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/img/icons8-verified-16.png";
import { useRouter } from "next/navigation";

interface HeaderMobileProfileProps {
  name: string;
  isVerified: boolean;
}

const HeaderMobileProfile = ({
  name,
  isVerified,
}: HeaderMobileProfileProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full justify-between">
      <ChevronLeft
        onClick={() => router.replace("/location")}
        className="text-white mr-9.25 cursor-pointer"
      />
      <div className="flex text-white text-[16px] font-bold items-center justify-center">
        {name}
        {isVerified && (
          <Image src={VerifiedIcon} alt="verified" className="w-4 h-4 ml-1" />
        )}
      </div>
      <div className="flex gap-2.75 items-center justify-center invisible">
        <Bell className="text-white w-[30px] h-[30px] bg-[#434343] rounded-full p-2" />
        <EllipsisVertical className="text-white w-4.5 h-4.5" />
      </div>
    </div>
  );
};

export default HeaderMobileProfile;
