"use client";

import { CircleX, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import { Earth } from "lucide-react";
import { DatePickCreateEvent } from "./DatePickCreateEvent";
import GallerySection from "./GallerySection";
import AboutCreateEvent from "./AboutCreateEvent";
import AddPicButton from "./AddPicButton";

const CreateEventSection = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center p-9">
      <div className="flex w-full h-full justify-between items-center z-40">
        <div className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <X className="w-4 text-[var(--background)]" strokeWidth={3} />
        </div>
        <Avatar className="w-9 h-auto aspect-square">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-70">
        {/* <div className="w-9 h-auto aspect-square bg-[var(--background)]/30 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <Lock className="w-4 text-[var(--background)]" strokeWidth={3} />
        </div> */}
        <AddPicButton/>
        <h1 className="text-white font-extrabold text-5xl text-center">
          Event title
        </h1>
        <p className="text-[white]/70 text-sm text-center px-28 mt-6">
          19 May, 12pm Ulaanbaatar, kid100
        </p>
      </div>
      <div className="w-full px-10 mt-10">
        <div className="w-full bg-[#0A0A0B] border-1 border-[#1D1D1D] rounded-full flex justify-center items-center p-2">
          <Button className="flex flex-col items-center text-black text-sm font-extrabold bg-[var(--background)] hover:bg-[var(--background)] rounded-full gap-0 w-2/4 py-6">
            <Lock />
            Private
          </Button>
          <Button className="flex flex-col items-center text-[var(--background)]/50 text-sm font-extrabold bg-[#0A0A0B] hover:bg-[#0A0A0B] rounded-full gap-0 w-2/4 py-6">
            <Earth />
            Public
          </Button>
        </div>
      </div>
      <AboutCreateEvent />
      <div className="flex flex-col justify-center items-center w-full bg-[#28272A] border-1 border-[#28272A] rounded-2xl mt-5 p-5 text-center">
        <h1 className="text-white/50">Direction</h1>
        <p className="text-white text-[12px] w-[180px]">
          Хүүхдийн 100 өргөн чөлөө Ulaanbatar, Mongolia, Ulan Bator
        </p>
      </div>
      <div className="flex w-full space-x-4 mt-5">
        <DatePickCreateEvent />
        <input
          type="text"
          placeholder="Slot"
          className="w-1/2 bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
        />
      </div>
      <GallerySection />
    </div>
  );
};
export default CreateEventSection;
