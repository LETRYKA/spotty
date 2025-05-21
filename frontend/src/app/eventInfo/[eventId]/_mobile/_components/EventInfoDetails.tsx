"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Lock, Earth, CircleCheck, CircleX, X } from "lucide-react";

import GuestInfo from "./GuestInfo";
import DirectionEvent from "./DirectionEvent";
import {
  fetchEvent,
  getUserData,
  joinEvent,
  leaveEvent,
  verifyPasscode,
} from "@/lib/api";

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
  const [userData, setUserData] = useState<User | null>(null);
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const params = useParams();
  const eventId = params?.eventId as string;
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  const refreshEvent = async () => {
    if (!eventId) return;
    const data = await fetchEvent(eventId);
    if (data) {
      setEventData(data);
    }
  };

  useEffect(() => {
    if (eventId) refreshEvent();
  }, [eventId]);

  useEffect(() => {
    if (userId) {
      getUserData(userId)
        .then(setUserData)
        .catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    if (eventData && userId) {
      const isParticipant = eventData.participants.some(
        (p) => p.userId === userId || p.id === userId
      );
      setIsUserParticipant(isParticipant);
    }
  }, [eventData, userId]);

  useEffect(() => {
    if (eventData?.isPrivate && !isUserParticipant) {
      setShowPasscodeModal(true);
    } else {
      setShowPasscodeModal(false);
    }
  }, [eventData, isUserParticipant]);

  const handlePrivateJoin = async () => {
    try {
      const isValid = await verifyPasscode(eventId, passcode);
      if (!isValid) throw new Error("Invalid passcode");

      await joinEvent(eventId, userId!);
      await refreshEvent();
      setIsUserParticipant(true);
      setShowPasscodeModal(false);
      setPasscode("");
      setMessage("Joined the private event!");
      setMessageType("success");
    } catch (err: any) {
      setMessage(err.message || "Failed to join private event.");
      setMessageType("error");
    }
  };

  const handlePublicJoin = async () => {
    try {
      await joinEvent(eventId, userId!);
      await refreshEvent();
      setIsUserParticipant(true);
      setMessage("You have successfully joined the event!");
      setMessageType("success");
    } catch (err) {
      setMessage("Failed to join the event.");
      setMessageType("error");
    }
  };

  const handleLeave = async () => {
    try {
      const wasPrivate = eventData?.isPrivate;
      await leaveEvent(eventId, userId!);
      await refreshEvent();
      setIsUserParticipant(false);
      setMessage("You left the event.");
      setMessageType("success");
      if (wasPrivate) {
        setShowPasscodeModal(true);
      }
    } catch (err) {
      setMessage("Failed to leave event.");
      setMessageType("error");
    }
  };

  const handleJoinClick = () => {
    if (eventData?.isPrivate) {
      setShowPasscodeModal(true);
    } else {
      handlePublicJoin();
    }
  };

  const handleCancelPasscode = () => {
    setShowPasscodeModal(false);
    router.push("/events");
  };

  return (
    <div className="relative">
      {message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md shadow-lg z-50 text-white transition-all duration-300 ${
            messageType === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message}
        </div>
      )}

      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-[#0A0A0B] p-6 rounded-lg shadow-lg w-80 text-white relative z-[100]">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={handleCancelPasscode}
            >
              <X />
            </button>
            <h2 className="text-lg font-bold mb-1 text-center">Private Event</h2>
            <p className="text-center text-sm mb-4 text-gray-400 truncate">
              {eventData?.title}
            </p>
            <h3 className="text-base font-semibold mb-2 text-center">
              Enter Passcode
            </h3>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full p-2 mt-2 bg-black border border-gray-700 rounded-md text-white"
              placeholder="Passcode"
            />
            <Button className="w-full mt-4" onClick={handlePrivateJoin}>
              Join Event
            </Button>
          </div>
        </div>
      )}

      <div
        className={`w-full h-auto flex flex-col justify-center p-9 transition-all duration-300 ${
          eventData?.isPrivate && !isUserParticipant ? "blur-md" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <div
            className="w-9 h-9 bg-[var(--background)]/15 rounded-full flex justify-center items-center cursor-pointer"
            onClick={() => router.back()}
          >
            <X className="text-[var(--background)] w-4" />
          </div>
          <Avatar className="w-9 h-9">
            <AvatarImage
              src={userData?.avatarImage}
              alt="user"
              onClick={() => router.push("/profile")}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>

        <div className="flex flex-col items-center mt-20">
          <div className="w-9 h-9 bg-[var(--background)]/30 rounded-full flex justify-center items-center">
            {eventData?.isPrivate ? (
              <Lock className="text-[var(--background)] w-4" />
            ) : (
              <Earth className="text-[var(--background)] w-4" />
            )}
          </div>
          <h1 className="text-white font-extrabold text-5xl text-center mt-4">
            {eventData?.title}
          </h1>
          <p className="text-white/70 text-sm text-center mt-3">
            {eventData?.startAt}
          </p>
        </div>

        <div className="mt-10">
          <div className="bg-[#0A0A0B] border border-[#1D1D1D] rounded-full flex justify-between p-2 gap-3">
            <Button
              onClick={handleJoinClick}
              disabled={isUserParticipant}
              className={`flex-1 text-sm font-bold py-6 rounded-full flex flex-col items-center gap-1 ${
                isUserParticipant
                  ? "text-[#00ff84] bg-[var(--background)]"
                  : "text-[#5a5a5a] bg-[#1A1A1A] hover:bg-[#2A2A2A]"
              }`}
            >
              <CircleCheck />
              Going
            </Button>
            <Button
              onClick={handleLeave}
              disabled={!isUserParticipant}
              className={`flex-1 text-sm font-bold py-6 rounded-full flex flex-col items-center gap-1 ${
                isUserParticipant
                  ? "text-[#5a5a5a] bg-[#1A1A1A] hover:bg-[#2A2A2A]"
                  : "text-[#00ff84] bg-[var(--background)]"
              }`}
            >
              <CircleX />
              Not Going
            </Button>
          </div>
        </div>

        <div className="bg-[#0A0A0B] border border-[#1b1b1b] rounded-2xl mt-10 p-7">
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage
                src={eventData?.owner?.avatarImage}
                onClick={() => router.push(`/${eventData?.owner?.name}`)}
              />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <p className="text-xs text-white/50">
              Hosted by{" "}
              <strong className="text-white">{eventData?.owner?.name}</strong>
            </p>
          </div>
          <p className="text-xs text-white/50 mt-4">About</p>
          <p className="text-sm text-white mt-2">{eventData?.description}</p>
        </div>

        <DirectionEvent />

        <div className="flex justify-between mt-5 text-white">
          Guest list {eventData?.participants?.length || 0}/
          {eventData?.participantLimit || 0}
        </div>
        <GuestInfo />
      </div>
    </div>
  );
};

export default EventInfoDetails;
