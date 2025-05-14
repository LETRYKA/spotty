"use client";

import { House, RefreshCcw, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SidebarHeader = ({
  isSideBarOpen,
  onToggle,
}: {
  isSideBarOpen: boolean;
  onToggle: () => void;
}) => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className="w-full h-auto bg-black/60 rounded-full p-5 flex justify-between items-center backdrop-blur-md">
      <div className="h-full flex items-center gap-3">
        <Button
          onClick={onToggle}
          className="rounded-full h-auto w-auto aspect-square bg-[#28272A] hover:bg-[#3c3a3f] transition-all"
        >
          <RefreshCcw />
        </Button>
        {isSideBarOpen && (
          <div className="h-full flex items-center">
            <Button
              onClick={() => router.replace("/profile")}
              className="rounded-full h-auto w-auto aspect-square bg-[#94B8FF] hover:bg-[#3c3a3f] transition-all z-10"
            >
              <UserRound />
            </Button>
            <p className="bg-[#28272A] h-full pl-13 pr-5 rounded-full text-base text-[var(--background)] flex items-center -ml-10 z-0">
              {user?.username || "User"}
            </p>
          </div>
        )}
      </div>
      {isSideBarOpen && (
        <Link href="/home">
          <Button className="rounded-full h-full w-auto aspect-square bg-[var(--background)] hover:bg-[var(--background)]/80 text-black transition-all">
            <House />
          </Button>
        </Link>
      )
      }
    </div >
  );
};

export default SidebarHeader;
