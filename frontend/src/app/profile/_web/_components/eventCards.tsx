import React, { useEffect, useState, useMemo } from "react";
import Mapping from "/public/Mapping.png";
import { Navigation } from "lucide-react";
import { getUserData } from "@/lib/api";
import { Event } from "@/types/Event";
import { useUser } from "@clerk/nextjs";
import { formatDate } from "@/utils/DateFormatter";
import { enrichEventsWithStatus } from "@/utils/eventStatus";
import { getStatusStylesAndText } from "@/utils/statusStyles";
import { StatusStyles } from "@/app/profile/_web/types/statusStyles";

const EventCards = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  const fetchUserEvents = async (id: string) => {
    try {
      const data = await getUserData(id);
      setEventData(data.events);
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
    <div className="w-full h-auto flex flex-wrap gap-10 mt-8 px-10">
      {eventsWithStatus.map((event) => {
        const { background, border, text } = getStatusStylesAndText(
          event.status as keyof StatusStyles
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
                    Улаанбаатар, Монгол
                  </h5>
                  <p className="text-white text-3xl font-bold mt-2 leading-8">
                    {event.title}
                  </p>
                </div>
                <div className="w-24 h-auto aspect-square bg-[linear-gradient(45deg,_#FAC634,_#FACF64)] rounded-full flex justify-center items-center mt-3">
                  <span className="text-3xl">
                    {event?.categories[0]?.emoji}
                  </span>
                </div>
              </div>
              <div className="w-full absolute bottom-22">
                <div
                  className={`py-1 px-3 w-fit rounded-2xl ${background} border ${border} text-white font-medium text-[0.7rem] flex justify-center items-center`}
                >
                  {text}
                </div>
              </div>
              <div className="w-full h-auto flex flex-row justify-between bg-white mt-4 absolute top-43 rounded-2xl px-3 py-3 gap-3">
                <div className="flex flex-col items-start">
                  <p className="font-extrabold text-sm">@{event.owner.name}</p>
                  <p className="font-regular text-[0.6rem] text-black/50">
                    <span className="text-xs font-bold">Эхлэх: </span>{" "}
                    {event ? formatDate(event.startAt) : "Loading..."}
                  </p>
                  <p className="font-regular text-[0.6rem] text-black/50">
                    <span className="text-[0.7rem] font-bold">Дуусах: </span>
                    {event ? formatDate(event.endAt) : "Loading..."}
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
