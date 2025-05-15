"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface Avatar {
  avatarImage: string;
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
    <div className={cn("w-full flex", className)}>
      {visibleAvatars.map((user, index) => (
        <a
          key={index}
          href={user.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`z-[${10 - index}]`}
        >
          <div
            className="h-8 w-auto aspect-square rounded-full border-1 border-white/40 dark:border-gray-800 object-cover bg-slate-400 bg-cover bg-center"
            style={{
              backgroundImage: `url(${user.avatarImage})`,
              marginLeft: index > 0 ? "-10px" : "0",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "";
            }}
          />
        </a>
      ))}
      {extraCount > 0 && (
        <div className="z-0 h-8 w-auto aspect-square rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center justify-center border-1 border-white/40 dark:border-gray-800 -ml-3">
          +{extraCount}
        </div>
      )}
    </div>
  );
};
