"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Banner from "/public/EventInfoPic.png";
import { fetchEvent } from "@/lib/api";

interface EventData {
  backgroundImage: string
}

const EventInfoBackgroundImg = () => {
    const [eventData, setEventData] = useState<EventData | null>(null);
    const params = useParams();
    const eventId = params?.eventId as string

    useEffect(() => {
      if (!eventId) return;
      const getEvent = async () => {
        try {
          const data = await fetchEvent(eventId);
          if (data && data.backgroundImage) {
            setEventData({ backgroundImage: data.backgroundImage });
          }
        } catch (error) {
          console.error("Failed to load event data", error);
        }
      };
      getEvent();
    }, [eventId]);
    // useEffect(() => {
    //   console.log(eventData, "🧪 Updated eventData");
    // }, [eventData]);
  return (
    <div className="absolute w-full bg-black h-[75vh] -z-10 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src={eventData?.backgroundImage}
          alt="Banner Image"
        />
        <div className="w-full h-[40rem] absolute top-20 left-0 blur-gradient-mask pointer-events-none" />
        <div className="absolute bottom-0 w-full">
          <div className="w-full h-[30rem] bg-gradient-to-t from-[#00090D] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default EventInfoBackgroundImg;
