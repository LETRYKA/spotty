"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface Avatar {
  avatarImage?: string | null;
  profileUrl: string;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  const visibleAvatars = avatarUrls.slice(0, 3);
  const extraCount = (numPeople ?? 0) - visibleAvatars.length;

  return (
    <div className={cn("flex items-center", className)}>
      {visibleAvatars.map((user, index) => (
        <a
          key={index}
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`z-[${10 - index}] ${index > 0 ? "-ml-2" : ""}`}
        >
          <Avatar className="h-8 w-8 border border-white/40 dark:border-gray-800">
            <AvatarImage
              src={user.avatarImage || ""}
              alt="User Avatar"
              onError={(e) => (e.currentTarget.src = "")}
            />
            <AvatarFallback>
              <User className="w-4 h-4 opacity-60" />
            </AvatarFallback>
          </Avatar>
        </a>
      ))}
      {extraCount > 0 && (
        <div className="z-0 h-8 w-8 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center justify-center border border-white/40 dark:border-gray-800 -ml-3">
          +{extraCount}
        </div>
      )}
    </div>
  );
};
