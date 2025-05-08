import React from "react";
import Mapping from "/public/Mapping.png";
import { Navigation } from "lucide-react";
import { getUserData } from "@/lib/api";
import { useEffect, useState } from "react";
import { Event } from "../types/Event";
import { useUser } from "@clerk/nextjs";

const EventCards = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  const fetchUserEvents = async (id: string) => {
    try {
      const data = await getUserData(id);
      if (data?.events) {
        const updatedEvents = data.events.map((event: Event) => {
          const formattedStartAt = new Date(event.startAt);
          const year = formattedStartAt.getUTCFullYear();
          const month = (formattedStartAt.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0");
          const day = formattedStartAt.getUTCDate().toString().padStart(2, "0");
          let hour = formattedStartAt.getUTCHours();
          const minute = formattedStartAt
            .getUTCMinutes()
            .toString()
            .padStart(2, "0");
          const isAM = hour < 12;
          hour = hour % 12 || 12;
          const formattedHour = hour.toString().padStart(2, "0");
          const ampm = isAM ? "AM" : "PM";
          event.formattedStartAt = `${year}-${month}-${day}-${formattedHour}:${minute} ${ampm}`;
          return event;
        });

        setEventData(updatedEvents);
      }
    } catch (error) {
      console.error("Error fetching user events:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserEvents(userId);
    }
  }, [userId]);

  const getStatusStylesAndText = (status: string) => {
    if (status === "ENDED") {
      return {
        background: "bg-[#F45B69]/[0.23]",
        border: "border-[#F45B69]",
        text: "Дууссан",
      };
    }
    if (status === "UPCOMING") {
      return {
        background: "bg-[#F5B44A]/[0.23]",
        border: "border-[#F5B44A]",
        text: "Удахгүй болох",
      };
    }
    if (status === "ONGOING") {
      return {
        background: "bg-[#06D6A0]/[0.23]",
        border: "border-[#06D6A0]",
        text: "Болж байгаа",
      };
    }
    if (status === "CANCELLED") {
      return {
        background: "bg-[#000000]/[0.23]",
        border: "border-[#FFFFFF]",
        text: "Цуцлагдсан",
      };
    }
    return {};
  };

  return (
    <div className="w-full h-auto flex flex-wrap gap-10 mt-8 px-8">
      {eventData.map((event) => {
        const { background, border, text } = getStatusStylesAndText(
          event.status
        );

        return (
          <div
            key={event.id}
            className="bg-[#313034] flex flex-col rounded-3xl items-center relative transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={Mapping.src}
              alt="Event"
              className="w-[300px] h-auto aspect-square rounded-3xl object-cover"
            />
            <div className="absolute top-4 bottom-4 left-6 right-6">
              <div className="w-full flex justify-between items-start gap-4">
                <div className="w-full h-auto flex flex-col justify-start items-start">
                  <h5 className="text-white/50 text-sm font-medium flex gap-2 items-center">
                    <Navigation className="w-4 rounded-full" />
                    Ulaanbaatar, MN
                  </h5>
                  <p className="text-white text-3xl font-bold mt-2 leading-8">
                    {event.title}
                  </p>
                </div>
                <div className="w-24 h-auto aspect-square bg-[linear-gradient(45deg,_#FAC634,_#FACF64)] rounded-full flex justify-center items-center mt-3">
                  <span className="text-3xl">{event?.categories[0]?.emoji}</span>
                </div>
              </div>
              <div className="w-full absolute bottom-20">
                <div
                  className={`py-1 px-3 w-fit rounded-2xl ${background} border ${border} text-white font-medium text-[0.7rem] flex justify-center items-center`}
                >
                  {text}
                </div>
              </div>
              <div className="w-full h-auto flex flex-row justify-between bg-white mt-4 absolute top-47 rounded-2xl px-4 py-3 gap-3">
                <div className="flex flex-col items-start">
                  <p className="font-extrabold text-sm">@{event.owner.name}</p>
                  <p className="font-regular text-[0.6rem] text-black/50">
                    {event.formattedStartAt}
                  </p>
                </div>
                <div className="flex flex-row gap-1 justify-center items-center relative">
                  <div className="rounded-full w-5 h-5 bg-[#D9D9D9]"></div>
                  <div className="rounded-full w-5 h-5 bg-[#B7B7B7] -ml-3"></div>
                  <div className="rounded-full w-5 h-5 bg-[#939393] -ml-3"></div>
                  <p className="font-semibold text-xs ml-1">
                    {event.participants.length}/{event.participantLimit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventCards;
