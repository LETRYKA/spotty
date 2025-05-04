"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const SidebarSearch = () => {
  return (
    <>
      <div className="w-full h-14 bg-[#D9D9D9]/10 rounded-full flex items-center p-1.5 hover:bg-[#28272A]/80 transition-all">
        <div className="h-full w-auto aspect-square rounded-full bg-[#0E0E10] flex justify-center items-center">
          <Search stroke="white" width={17} />
        </div>
        <Input
          type="search"
          placeholder="Хайх"
          className="outline-none border-none focus-visible:ring-transparent text-white text-base font-semibold"
        />
      </div>

      <div className="w-full flex items-center justify-start gap-3">
        <p className="bg-[#28272A] rounded-full py-1 px-3 text-[var(--background)]/50 text-xs font-light flex items-center gap-2 hover:bg-[#3c3a3f] transition-all cursor-pointer">
          diddy <X width={14} />
        </p>
      </div>
    </>
  );
};

export default SidebarSearch;
