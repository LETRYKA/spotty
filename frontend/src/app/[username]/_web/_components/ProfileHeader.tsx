"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  backgroundImage: string;
  avatarImage: string;
  name: string;
}

export default function ProfileHeader({ backgroundImage, avatarImage, name }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div
        className="w-full h-80 bg-slate-400 rounded-3xl bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <Avatar 
        className="w-36 h-auto aspect-square -mt-16 cursor-pointer" 
        onClick={() => router.push(`/${name}`)}
      >
        <div className="w-full h-auto aspect-square rounded-full bg-gradient-to-br from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437]">
          <AvatarImage
            src={avatarImage}
            className="w-full h-full object-cover p-1 rounded-full"
          />
        </div>
        <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
    </>
  );
} 