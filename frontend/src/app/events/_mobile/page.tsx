"use client"
import { RainbowButton } from "@/components/magicui/rainbow-button";
import EventsCarousel from "./_components/EventsCarousel";
import UpcomingHeader from "./_components/UpcomingHeader";
import { useRouter } from "next/navigation";
import { House } from 'lucide-react';
import { MapPlus } from 'lucide-react';

const MobileAllEvents = () => {
  const router = useRouter()
  return (
    <div className="w-full h-screen flex flex-col gap-5">
      <UpcomingHeader />
      {/* <div className="h-[700px]"> */}
        <EventsCarousel />
      {/* </div> */}
      <div className="w-full flex justify-center items-center">
        <RainbowButton
            onClick={() => router.back()}
            className="h-18 w-18 aspect-square rounded-full text-3xl font-bold pointer-events-auto "
          >
            <MapPlus className="w-[25px] h-[25px]" />
        </RainbowButton>
      </div>
    </div>
  );
}; 
export default MobileAllEvents;
