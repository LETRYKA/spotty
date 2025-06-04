"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPlus } from "lucide-react";

const MobileAllEvents = () => {
  const router = useRouter();
  const [status, setStatus] = useState("UPCOMING");

  return (
    <div className="relative w-full min-h-screen flex flex-col gap-4 pb-32 pt-10">
      <UpcomingHeader status={status} onStatusChange={setStatus} />
      <EventsCarousel status={status} />
      
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <RainbowButton
          onClick={() => router.back()}
          className="h-16 w-16 rounded-full flex items-center justify-center shadow-lg bg-white"
        >
          <MapPlus className="w-[24px] h-[24px]" />
        </RainbowButton>
      </div>
    </div>
  );
};

export default MobileAllEvents;
