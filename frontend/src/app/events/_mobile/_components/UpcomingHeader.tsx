"use client";

import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserData } from "@/lib/api";

interface User {
  avatarImage: string;
}

interface UpcomingHeaderProps {
  status: string;
  onStatusChange: (value: string) => void;
}

const UpcomingHeader = ({ status, onStatusChange }: UpcomingHeaderProps) => {
  const [userData, setLocalUserData] = useState<User | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const data = await getUserData(id);
        setLocalUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return (
    <div className="w-full flex justify-between px-8 py-5">
      <div className="flex gap-2 justify-center items-center text-white">
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[200px] bg-black text-white border-none text-[30px] font-semibold">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-black border-none">
            <SelectGroup className="text-white">
              <SelectItem value="UPCOMING">Upcoming</SelectItem>
              <SelectItem value="ONGOING">Ongoing</SelectItem>
              <SelectItem value="ENDED">Ended</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <div
          className="w-9 h-auto aspect-square bg-[var(--background)] rounded-full flex justify-center items-center cursor-pointer"
          onClick={() => router.push("/createEvent")}
        >
          <Plus className="w-5 text-[var(--foreground)]" strokeWidth={3} />
        </div>
        <Avatar
          className="w-9 h-auto aspect-square cursor-pointer"
          onClick={() => router.replace("/profile")}
        >
          <AvatarImage src={userData?.avatarImage} alt="avatar" />
          <AvatarFallback>ANN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default UpcomingHeader;
