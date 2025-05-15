"use client";

import { useState, useEffect } from "react";
import { Sparkle, Clock, Heart, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

interface Event {
  id: string;
  title: string;
  description: string;
  lat: number;
  lng: number;
  isPrivate: boolean;
  hiddenFromMap: boolean;
  password: string | null;
  ownerId: string;
  participantLimit: number | null;
  createdAt: string;
  startAt: string;
  endAt: string | null;
  status: string;
  backgroundImage: string;
  owner: {
    id: string;
    email: string;
    name: string;
    phoneNumber: string | null;
    isVerified: boolean;
    avatarImage: string | null;
    backgroundImage: string | null;
    moodStatus: string | null;
    batteryLevel: number | null;
    createdAt: string;
  };
  participants: any[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchEvents = async (): Promise<Event[]> => {
  try {
    const res = await fetch(`${API_URL}/api/events`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log("Fetched events:", data);
    return data;
  } catch (err) {
    console.error("Failed to fetch events:", err);
    return [];
  }
};

const EventList = ({
  onSelectEvent,
}: {
  onSelectEvent: (eventId: string) => void;
}) => {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="w-full p-6 flex flex-col gap-4 overflow-y-scroll">
        <div className="w-full h-14 bg-[#D9D9D9]/10 rounded-full flex items-center p-1.5 hover:bg-[#28272A]/80 transition-all">
          <div className="h-full w-auto aspect-square rounded-full bg-[#0E0E10] flex justify-center items-center">
            <Search stroke="white" width={17} />
          </div>
          <Input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none border-none focus-visible:ring-transparent text-white text-base font-semibold"
          />
        </div>

        <div className="w-full flex items-center justify-start gap-3">
          {search && (
            <p
              onClick={() => setSearch("")}
              className="bg-[#28272A] rounded-full py-1 px-3 text-[var(--background)]/50 text-xs font-light flex items-center gap-2 hover:bg-[#3c3a3f] transition-all cursor-pointer"
            >
              {search} <X width={14} />
            </p>
          )}
        </div>
        <div className="w-full flex items-center justify-between">
          <p className="text-xl text-[var(--background)] font-semibold">
            Events
          </p>
          <Button className="rounded-full h-auto w-auto aspect-square bg-[#28272A] hover:bg-[#3c3a3f] transition-all">
            <Sparkle />
          </Button>
        </div>
        <div className="w-full flex flex-col justify-start gap-3 overflow-y-scroll pb-12">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className="cursor-pointer w-full h-24 bg-[#0D0D0D]/70 rounded-2xl p-3 flex justify-between items-center hover:bg-[#26252c] transition-all"
            >
              <div className="h-full flex">
                <div
                  className="h-full w-auto aspect-square rounded-2xl bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${
                      event?.backgroundImage || "event.owner.avatarImage"
                    })`,
                  }}
                />
                <div className="h-full flex flex-col justify-center ml-4">
                  <p className="text-[var(--background)] font-semibold text-base">
                    {event.title}
                  </p>
                  <p className="text-[var(--background)]/50 text-xs flex items-center">
                    <Clock strokeWidth={2} width={12} className="mr-1" />
                    Starts at{" "}
                    {new Date(event.startAt).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <div className="h-full flex flex-col mr-1 items-end relative">
                <div className="absolute bottom-0 flex w-fit">
                  {/* <div className="w-6 h-auto aspect-square rounded-full bg-slate-300 -ml-2"></div>
                  <div className="w-6 h-auto aspect-square rounded-full bg-slate-500 -ml-2"></div>
                  <div className="w-6 h-auto aspect-square rounded-full bg-slate-700 -ml-2"></div> */}
                  {/* <p className="text-[var(--background)] ml-3 text-sm">
                    {event.participants.length}/{event.participantLimit || 10}
                  </p> */}
                  <AvatarCircles
                    numPeople={event.participants.length}
                    avatarUrls={event.participants.map((p) => ({
                      avatarImage: p.avatarImage || "/fallback-avatar.png",
                      profileUrl: `/${p.name}`,
                    }))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventList;
