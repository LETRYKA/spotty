"use client";

import { CircleX, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import DirectionEvent from "./DirectionEvent";
import GuestInfo from "./GuestInfo";


const EventInfoDetails = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-center p-9">
      <div className="flex w-full justify-between items-center z-40">
        <div className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <X className="w-4 text-[var(--background)]" strokeWidth={3} />
        </div>
        <Avatar className="w-9 h-auto aspect-square">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-70">
        <div className="w-9 h-auto aspect-square bg-[var(--background)]/30 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <Lock className="w-4 text-[var(--background)]" strokeWidth={3} />
        </div>
        <h1 className="text-white font-extrabold text-5xl text-center">
          Typical girls night
        </h1>
        <p className="text-[white]/70 text-sm text-center px-28 mt-6">
          19 May, 12pm Ulaanbaatar, kid100
        </p>
      </div>
      <div className="w-full px-10 mt-10">
        <div className="w-full bg-[#0A0A0B] border-1 border-[#1D1D1D] rounded-full flex justify-center items-center p-2">
          <Button className="flex flex-col items-center text-[#00C655] text-sm font-extrabold bg-[var(--background)] hover:bg-[var(--background)] rounded-full gap-0 w-2/4 py-6">
            <CircleCheck />
            Going
          </Button>
          <Button className="flex flex-col items-center text-[var(--background)]/50 text-sm font-extrabold bg-[#0A0A0B] hover:bg-[#0A0A0B] rounded-full gap-0 w-2/4 py-6">
            <CircleX />
            Not going
          </Button>
        </div>
      </div>
      <div className="w-full bg-[#0A0A0B] border-1 border-[#1b1b1b] rounded-2xl mt-10 p-7">
        <div className="w-full flex flex-col justify-center items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
          <p className="text-xs text-[var(--background)]/50">
            Hosted by{" "}
            <strong className="text-[var(--background)]">LETRYKA</strong>
          </p>
        </div>
        <p className="text-xs text-[var(--background)]/50 mt-4">About</p>
        <p className="text-sm text-[var(--background)] mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since.
        </p>
      </div>
      <DirectionEvent/>
      <div className="w-full flex justify-between mt-5">
        <p className="text-white">Guest list 8/8</p>
        <h1 className="text-[#F45B69]">Full</h1>
      </div>
      <GuestInfo/>
    </div>
  );
};
export default EventInfoDetails;
