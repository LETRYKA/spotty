"use client";

import { House, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

const SidebarHeader = ({
  isSideBarOpen,
  onToggle,
}: {
  isSideBarOpen: boolean;
  onToggle: () => void;
}) => {
  const { user } = useUser();

  return (
    <div className="w-full h-auto bg-black/60 rounded-full p-5 flex justify-between items-center backdrop-blur-md">
      <div className="h-full flex items-center gap-3">
        <Button
          onClick={onToggle}
          className="rounded-full h-auto w-auto aspect-square bg-[#28272A] hover:bg-[#3c3a3f] transition-all"
        >
          <House />
        </Button>
        {isSideBarOpen && (
          <div className="h-full flex items-center">
            <Button className="rounded-full h-auto w-auto aspect-square bg-[#94B8FF] hover:bg-[#3c3a3f] transition-all z-10">
              <UserRound />
            </Button>
            <p className="bg-[#28272A] h-full pl-13 pr-5 rounded-full text-base text-[var(--background)] flex items-center -ml-10 z-0">
              {user?.username || "User"}
            </p>
          </div>
        )}
      </div>
      {isSideBarOpen && (
        <Button className="rounded-full h-full px-8 dark font-semibold">
          Share
        </Button>
      )}
    </div>
  );
};

export default SidebarHeader;
