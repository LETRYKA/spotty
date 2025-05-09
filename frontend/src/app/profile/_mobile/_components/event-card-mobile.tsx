"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import { getUserData } from "@/lib/api";
import { Event } from "../../_web/types/Event";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const EventCardsMobile = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const fetchUserEvents = async (id: string) => {
      try {
        const data = await getUserData(id);
        console.log("data", data);
        if (data?.events) {
          const updatedEvents = data.events.map((event: Event) => {
            const formattedStartAt = new Date(event.startAt);
            const year = formattedStartAt.getUTCFullYear();
            const month = (formattedStartAt.getUTCMonth() + 1).toString().padStart(2, "0");
            const day = formattedStartAt.getUTCDate().toString().padStart(2, "0");
            let hour = formattedStartAt.getUTCHours();
            const minute = formattedStartAt.getUTCMinutes().toString().padStart(2, "0");
            const isAM = hour < 12;
            hour = hour % 12 || 12;
            const formattedHour = hour.toString().padStart(2, "0");
            const ampm = isAM ? "AM" : "PM";
            event.formattedStartAt = `${year}-${month}-${day} ${formattedHour}:${minute} ${ampm}`;
            return event;
          });
          setEventData(updatedEvents);
        }
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    if (userId) {
      fetchUserEvents(userId);
    }
  }, [userId]);
  
  const getStatusStylesAndText = (status: string) => {
    switch (status) {
      case "ENDED":
        return {
          background: "bg-[#F45B69]/[0.23]",
          border: "border-[#F45B69]",
          text: "Дууссан",
        };
      case "UPCOMING":
        return {
          background: "bg-[#F5B44A]/[0.23]",
          border: "border-[#F5B44A]",
          text: "Удахгүй болох",
        };
      case "ONGOING":
        return {
          background: "bg-[#06D6A0]/[0.23]",
          border: "border-[#06D6A0]",
          text: "Болж байгаа",
        };
      case "CANCELLED":
        return {
          background: "bg-[#000000]/[0.23]",
          border: "border-[#FFFFFF]",
          text: "Цуцлагдсан",
        };
      default:
        return {
          background: "bg-gray-500/[0.23]",
          border: "border-gray-500",
          text: "Тодорхойгүй",
        };
    }
  };

  return (
    <>
      {eventData.map((event, index) => {
        const { background, border, text } = getStatusStylesAndText(event.status || "Unknown");
        return (
          <div
            key={event.id || index}
            className="w-full h-24.75 bg-[#19191b] rounded-[5px] mt-5 flex justify-between items-center gap-2.5 px-2"
          >
            <div className="flex">
              <Image
                src={event.backgroundImage}
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
              <Button className={`w-[84px] h-5 text-[8px] border ${border} ${background}`}>
                {text}
              </Button>
              <div className="flex items-center relative">
                <div className="flex absolute">
                  <div className="bg-[#939393] w-5 h-5 rounded-full relative"></div>
                  <div className="bg-[#b7b7b7] w-5 h-5 rounded-full relative right-2"></div>
                  <div className="bg-[#d9d9d9] w-5 h-5 rounded-full relative right-4"></div>
                </div>
                <div className="text-white pl-13">
                  {0}/{event.participantLimit ?? "∞"}
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
