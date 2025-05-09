"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleCheck, Share } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import DropDown from "./Menu";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import axios from "axios";

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
  participants: {
    id: string;
    avatarImage: string;
    name: string;
    moodStatus: string;
  }[];
  galleryImages: string[];
}

const fetchEvent = async (eventId: string): Promise<Event | null> => {
  try {
    const res = await axios.get(
      `https://spotty-5r8n.onrender.com/api/events/${eventId}`
    );
    return res.data.event;
  } catch (err) {
    console.error("Failed to fetch event:", err);
    return null;
  }
};

const EventDetail = ({
  eventId,
  onBack,
}: {
  eventId: string;
  onBack: () => void;
}) => {
  const { user } = useUser();
  const [event, setEvent] = useState<Event | null>(null);
  const [joined, setJoined] = useState(false);

  const joinEvent = async (
    eventId: string,
    userId: string
  ): Promise<Event | null> => {
    try {
      const res = await axios.post(
        `https://spotty-5r8n.onrender.com/api/events/${eventId}/join`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Joined event successfully!");
      setEvent(res.data.event);
      return res.data.event;
    } catch (err) {
      console.error("Failed to join event:", err);
      return null;
    }
  };

  const leaveEvent = async (
    eventId: string,
    userId: string
  ): Promise<Event | null> => {
    try {
      const res = await axios.post(
        `https://spotty-5r8n.onrender.com/api/events/${eventId}/leave`,
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("See you nex time ;(");
      setEvent(res.data.event);
      return res.data.event;
    } catch (err) {
      console.error("Failed to leave event:", err);
      return null;
    }
  };

  useEffect(() => {
    fetchEvent(eventId).then(setEvent);
  }, [eventId]);

  useEffect(() => {
    if (!event || !user) return;
    const isJoined = event.participants.some(
      (participant) => participant.id === user.id
    );

    setJoined(isJoined);
  }, [event, user]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-3 overflow-y-scroll pb-20">
      <div className="w-full flex justify-between px-8 pt-8">
        <Button
          onClick={onBack}
          className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full w-fit px-4 aspect-square"
        >
          <ChevronLeft />
        </Button>
        <Button className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full w-fit px-4 aspect-square">
          <Share />
        </Button>
      </div>
      <h2 className="text-2xl text-[var(--background)] font-bold mt-3 px-8">
        {event.title}
      </h2>
      <p className="text-sm text-[var(--background)]/50 w-44 px-8">
        {new Date(event.startAt).toLocaleString("en-US", {
          day: "numeric",
          month: "short",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
      <div className="w-full flex justify-center gap-3 mt-3 px-8">
        {joined ? (
          <Button className="bg-[#0278FC] hover:bg-[#0277fcdc] w-2/4 text-white rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all">
            <CircleCheck strokeWidth={3} />
            Going
          </Button>
        ) : (
          <Button
            onClick={() =>
              user && joinEvent(eventId, user.id).then(() => setJoined(true))
            }
            className="bg-[var(--background)]/10 hover:bg-[var(--background)]/15 w-2/4 text-white/50 rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
          >
            <CircleCheck strokeWidth={3} />
            Join
          </Button>
        )}
        <Button
          onClick={() =>
            user && leaveEvent(eventId, user.id).then(() => setJoined(false))
          }
          className="bg-[var(--background)]/10 hover:bg-[var(--background)]/15 w-2/4 text-white/50 rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
        >
          <CircleCheck strokeWidth={3} />
          Not going
        </Button>
      </div>
      <div className="w-full flex justify-start bg mt-1 pl-6">
        <div className="w-full">
          <Carousel>
            <CarouselContent className="flex gap-5">
              {event.galleryImages.map((gallery, index) => (
                <CarouselItem key={index} className="basis-3/5 py-4">
                  <div
                    className="flex aspect-6/7 items-center justify-center p-7 bg-cover bg-center rounded-3xl cursor-pointer hover:scale-105 transition-all"
                    style={{
                      backgroundImage: `url(${gallery})`,
                    }}
                  ></div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col justify-start px-8">
        <h2 className="text-lg text-[var(--background)] font-bold">About</h2>
        <div className="w-full bg-[#0E1217] border-1 border-[#2F2F2F] rounded-2xl p-5 mt-2">
          <p className="text-[var(--background)] text-sm leading-6">
            {event.description}
          </p>
        </div>
        <div className="w-full flex justify-between mt-8">
          <h2 className="text-lg text-[var(--background)] font-bold">
            Guest list {event.participants.length || 0}/
            {event.participantLimit || 0}
          </h2>
          <p className="text-base text-[#F45B69]">
            {event.participantLimit &&
            event.participantLimit >= event.participantLimit
              ? ""
              : "Full"}
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-5">
          {event.participants.map((user, index) => (
            <div
              key={index}
              className="w-full p-3 bg-[#D9D9D9]/10 hover:bg-[#D9D9D9]/15 flex justify-between items-center rounded-2xl transition-all"
            >
              <div className="flex h-12 gap-3">
                <div
                  className="h-full w-auto aspect-square rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${user?.avatarImage})`,
                  }}
                ></div>
                <div className="h-full flex flex-col justify-center items-start">
                  <p className="text-[var(--background)] text-base font-bold mt-1">
                    {user?.name}
                  </p>
                  <p className="text-[var(--background)]/50 text-sm -mt-1">
                    {user?.moodStatus}
                  </p>
                </div>
              </div>
              <DropDown />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
