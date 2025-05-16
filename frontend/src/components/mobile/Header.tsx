"use client";

import { ChevronLeft, Bell, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import VerifiedIcon from "@/img/icons8-verified-16.png";
import { getUserData } from "@/lib/api";
import { User } from "@/app/profile/_web/types/User";

const Header = () => {
  const router = useRouter();
  const { user } = useUser();
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const data = await getUserData(user.id);
        setUserData(data);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-transparent">
      <button
        aria-label="Go back"
        onClick={() => router.back()}
        className="text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex items-center text-white font-bold text-lg">
        {userData?.name || user?.firstName || "User"}
        <Image
          src={VerifiedIcon}
          alt="Verified"
          width={16}
          height={16}
          className="ml-1"
        />
      </div>

      <div className="flex items-center gap-2"/>
    </div>
  );
};

export default Header;
