"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import { getUserData } from "@/lib/api";
import { Event } from "@/types/Event";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getStatusStylesAndText } from "@/utils/statusStyles";
import { enrichEventsWithStatus } from "@/utils/eventStatus";
import Mapping from "/public/Mapping.png";
import { StatusStyles } from "@/app/profile/_web/types/statusStyles";
const EventCardsMobile = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  const fetchUserEvents = async (id: string) => {
    try {
      const data = await getUserData(id);
      setEventData(data.events || []);
      console.log(data.events?.[4]?.startAt);
      console.log(data.events?.[4]?.endAt);
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserEvents(userId);
    }
  }, [userId]);

  const eventsWithStatus = useMemo(
    () => enrichEventsWithStatus(eventData),
    [eventData]
  );

  return (
    <>
      {eventsWithStatus.map((event) => {
        const { background, border, text } = getStatusStylesAndText(
          event.status as keyof StatusStyles
        );

        return (
          <div
            key={event.id}
            className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-5 flex justify-between items-center gap-2.5 px-2"
          >
            <div className="flex">
              <Image
                src={Mapping.src}
                alt={event.title}
                className="w-19 h-19"
                width={1000}
                height={1000}
              />
              <div className="flex flex-col justify-center ml-3">
                <div className="text-white text-[18px]">{event.title}</div>
                <div className="flex gap-3">
                  <span className="text-[12px] text-white opacity-50">
                    Owner name
                  </span>
                  <span className="flex text-[12px] text-white opacity-50 items-center">
                    <Navigation className="w-4 h-4 mr-1" /> Ulaanbaatar, MN
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col h-16 justify-between">
              <Button
                className={`w-[84px] h-5 text-[8px] border ${border} ${background}`}
              >
                {text}
              </Button>
              <div className="flex items-center relative">
                <div className="flex absolute">
                  <div className="bg-[#939393] w-5 h-5 rounded-full relative"></div>
                  <div className="bg-[#b7b7b7] w-5 h-5 rounded-full relative right-2"></div>
                  <div className="bg-[#d9d9d9] w-5 h-5 rounded-full relative right-4"></div>
                </div>
                <div className="text-white pl-13">
                  {event.participants.length}/{event.participantLimit ?? "∞"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EventCardsMobile;
