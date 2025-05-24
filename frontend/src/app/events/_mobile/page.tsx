"use client";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";
import { useState } from "react";
const MobileAllEvents = () => {
  const router = useRouter();
  const [status, setStatus] = useState("UPCOMING");
  console.log("status:", status);
  return (
    <div className="w-full h-full flex flex-col gap-5">
      <UpcomingHeader status={status} onStatusChange={setStatus} />

      {/* <div className="h-[700px]"> */}
      <EventsCarousel status={status} />
      {/* </div> */}
      <div className="w-full flex justify-center items-center">
        <RainbowButton
          onClick={() => router.back()}
          className="h-18 w-18 aspect-square rounded-full text-3xl font-bold pointer-events-auto "
        >
          <House />
        </RainbowButton>
      </div>
    </div>
  );
};
export default MobileAllEvents;
