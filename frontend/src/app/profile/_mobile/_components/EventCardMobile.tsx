"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Navigation } from "lucide-react";
import { getUserData } from "@/lib/api";
import { Event } from "@/types/Event";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { getStatusStylesAndText } from "@/utils/statusStyles";
import { enrichEventsWithStatus } from "@/utils/eventStatus";
import Mapping from "/public/Mapping.png";
import { StatusStyles } from "@/app/profile/_web/types/statusStyles";

const EventCardsMobile = () => {
  const [eventData, setEventData] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();
  const fetchUserEvents = async (id: string) => {
    try {
      const data = await getUserData(id);
      setEventData(data.joinedEvents || []);
      console.log("Fetched events:", data.joinedEvents);
    } catch (error) {
      console.error("Error fetching user events:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <div className="text-white text-center mt-4">Loading events...</div>;
  }

  if (eventsWithStatus.length === 0) {
    return (
      <div className="text-white text-center mt-4">No events joined yet.</div>
    );
  }
  console.log("Events with status:", eventsWithStatus);

  return (
    <>
      {eventsWithStatus.map((event) => {
        const { background, border, text } = getStatusStylesAndText(
          event.status as keyof StatusStyles
        );

        return (
          <div
            onClick={() => {
              router.push(`/eventInfo/${event.id}`);
            }}
            key={event.id}
            className="w-full h-[100px] bg-[#19191b] rounded-md mt-4 flex justify-between items-center px-2 py-2"
          >
            <div className="flex items-center">
              <Image
                src={event.backgroundImage ? event.backgroundImage : Mapping}
                alt={event.title || "Event image"}
                className="w-[64px] h-[64px] object-cover rounded"
                width={64}
                height={64}
                unoptimized={!!event.backgroundImage} 
              />

              <div className="flex flex-col justify-center ml-3 space-y-1">
                <div className="text-white text-sm font-medium leading-tight truncate max-w-[140px]">
                  {event.title}
                </div>
                <div className="flex gap-2 text-xs text-white opacity-50">
                  <span>{event.owner?.name ?? "Owner"}</span>
                  <span className="flex items-center">
                    <Navigation className="w-3.5 h-3.5 mr-1" /> Ulaanbaatar
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end h-full justify-between py-1">
              <div className="flex items-center mt-2">
                <div className="text-white text-xs ml-2 whitespace-nowrap">
                  {event.participants?.length ?? 0}/
                  {event.participantLimit ?? "∞"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="h-[100px] bg-[#19191b]" />
    </>
  );
};

export default EventCardsMobile;
