"use client";

import { ChevronLeft, Bell, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/img/icons8-verified-16.png";
import { useRouter } from "next/navigation";
import { invisibleValues } from "framer-motion";
interface HeaderMobileProfileProps {
  name: string;
  isVerified: boolean;
}

const HeaderMobileProfile = ({ name, isVerified }: HeaderMobileProfileProps) => {
  const router = useRouter();
  return (
    <div className="flex w-full justify-between">
      <ChevronLeft onClick={() => router.replace("/location")} className="text-white mr-9.25 " />
      <div className="flex text-white text-[18px] font-bold items-center justify-center mr-[42%]">
        {name}
        {isVerified && (
          <Image src={VerifiedIcon} alt="verified" className="w-4 h-4 ml-1" />
        )}
      </div>
    </div>
  );
};

export default HeaderMobileProfile;
