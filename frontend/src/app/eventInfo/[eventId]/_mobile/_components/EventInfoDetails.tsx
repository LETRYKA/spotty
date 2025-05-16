"use client";

import { CircleX, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import DirectionEvent from "./DirectionEvent";
import GuestInfo from "./GuestInfo";
import { fetchEvent, getUserData, joinEvent, leaveEvent } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Earth } from "lucide-react";

interface Owner {
  avatarImage?: string;
  name?: string;
}

interface Participant {
  userId: string;
  name: string;
  avatarImage: string;
  moodStatus: string;
  id?: string;
}

interface EventData {
  description: string;
  owner: Owner;
  startAt: string;
  title: string;
  isPrivate: boolean;
  participantLimit: string;
  participants: Participant[];
}

interface User {
  avatarImage: string;
}

const EventInfoDetails = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [userData, setLocalUserData] = useState<User | null>(null);
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const params = useParams();
  const eventId = params?.eventId as string;
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  useEffect(() => {
    if (!eventId) return;
    const getEvent = async () => {
      try {
        const data = await fetchEvent(eventId);
        if (data) {
          setEventData({
            description: data.description,
            owner: data.owner,
            startAt: data.startAt,
            title: data.title,
            isPrivate: data.isPrivate,
            participantLimit: data.participantLimit,
            participants: data.participants,
          });
        }
      } catch (error) {
        console.error("Failed to load event data", error);
      }
    };
    getEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const data = await getUserData(id);
        setLocalUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (eventData && userId) {
      const found = eventData.participants?.some(
        (participant: Participant) => participant.id === userId || participant.userId === userId
      );
      setIsUserParticipant(found);
    }
  }, [eventData, userId]);

  // Auto-clear message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

const refreshEvent = async () => {
  if (!eventId) return;
  const data = await fetchEvent(eventId);
  if (data) {
    setEventData({
      description: data.description,
      owner: data.owner,
      startAt: data.startAt,
      title: data.title,
      isPrivate: data.isPrivate,
      participantLimit: data.participantLimit,
      participants: data.participants,
    });
  }
};

  const handleJoin = async () => {
    if (!eventId || !userId) return;
    try {
      await joinEvent(eventId, userId);
      await refreshEvent();
      setIsUserParticipant(true);
      setMessage("You have successfully joined the event!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to join the event. Please try again.");
    }
  };
  const handleLeave = async () => {
    if (!eventId || !userId) return;
    try {
      await leaveEvent(eventId, userId);
      await refreshEvent();
      setIsUserParticipant(false);
      setMessage("You have left the event.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to leave the event. Please try again.");
    }
  };
  return (
    <>
      {message && (
        <div
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50"
          role="alert"
        >
          {message}
        </div>
      )}
      <div className="w-full h-auto flex flex-col justify-center p-9">
        <div className="flex w-full justify-between items-center z-40">
          <div
            className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <X className="w-4 text-[var(--background)]" strokeWidth={3} />
          </div>
          <Avatar className="w-9 h-auto aspect-square">
            <AvatarImage
              src={userData?.avatarImage}
              alt="@shadcn"
              onClick={() => router.replace("/profile")}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-70">
          <div className="w-9 h-auto aspect-square bg-[var(--background)]/30 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
            {eventData?.isPrivate ? (
              <Lock className="w-4 text-[var(--background)]" strokeWidth={3} />
            ) : (
              <Earth className="w-4 text-[var(--background)]" strokeWidth={3} />
            )}
          </div>
          <h1 className="text-white font-extrabold text-5xl text-center">
            {eventData?.title}
          </h1>
          <p className="text-[white]/70 text-sm text-center px-28 mt-6">
            {eventData?.startAt}
          </p>
        </div>
        <div className="w-full mt-10">
          <div className="w-full bg-[#0A0A0B] border border-[#1D1D1D] rounded-full flex justify-between items-center p-2 gap-3">
            <Button
              onClick={handleJoin}
              disabled={isUserParticipant}
              className={`flex-1 transition-all duration-200 ease-in-out flex flex-col items-center text-sm font-extrabold rounded-full gap-1 py-6
                ${
                  isUserParticipant
                    ? "text-[#00ff84] bg-[var(--background)] cursor-default"
                    : "text-[#5a5a5a] bg-[#1A1A1A] hover:bg-[#2A2A2A]"
                }`}
            >
              <CircleCheck className="mb-1" />
              Going
            </Button>
            <Button
              onClick={handleLeave}
              disabled={!isUserParticipant}
              className={`flex-1 transition-all duration-200 ease-in-out flex flex-col items-center text-sm font-extrabold rounded-full gap-1 py-6
                ${
                  !isUserParticipant
                    ? "text-[#00ff84] bg-[var(--background)] cursor-default"
                    : "text-[#5a5a5a] bg-[#1A1A1A] hover:bg-[#2A2A2A]"
                }`}
            >
              <CircleX className="mb-1" />
              Not going
            </Button>
          </div>
        </div>
        <div className="w-full bg-[#0A0A0B] border-1 border-[#1b1b1b] rounded-2xl mt-10 p-7">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Avatar>
              <AvatarImage
                src={eventData?.owner?.avatarImage}
                alt="@shadcn"
                onClick={() => router.push(`/${eventData?.owner?.name}`)}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xs text-[var(--background)]/50">
              Hosted by{" "}
              <strong className="text-[var(--background)]">
                {eventData?.owner?.name}
              </strong>
            </p>
          </div>
          <p className="text-xs text-[var(--background)]/50 mt-4">About</p>
          <p className="text-sm text-[var(--background)] mt-2">
            {eventData?.description}
          </p>
        </div>
        <DirectionEvent />
        <div className="w-full flex justify-between mt-5">
          <div className="text-white">
            Guest list{" "}
            {eventData?.participants
              ? Object.keys(eventData.participants).length
              : 0}
            /{eventData?.participantLimit ?? 0}
          </div>
          {/* <h1 className="text-[#F45B69]">Full</h1> */}
        </div>
        <GuestInfo />
      </div>
    </>
  );
};

export default EventInfoDetails;
