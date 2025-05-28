"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Lock,
  Earth,
  CircleCheck,
  CircleX,
  X,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

import GuestInfo from "./GuestInfo";
import DirectionEvent from "./DirectionEvent";
import EditEvent from "./editEvent";
import {
  fetchEvent,
  getUserData,
  joinEvent,
  leaveEvent,
  verifyPasscode,
  deleteEvent,
} from "@/lib/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Owner {
  avatarImage?: string;
  name?: string;
  id?: string;
}

interface Participant {
  userId: string;
  name: string;
  avatarImage: string;
  moodStatus: string;
  id?: string;
}

interface EventData {
  id: string;
  description: string;
  owner: Owner;
  ownerId: string;
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const params = useParams();
  const eventId = params?.eventId as string;
  const { user } = useUser();
  const userId = user?.id;
  const router = useRouter();

  const refreshEvent = async () => {
    if (!eventId) return;
    const data = await fetchEvent(eventId);
    if (data) setEventData(data);
  };

  useEffect(() => {
    if (eventId) refreshEvent();
  }, [eventId]);

  useEffect(() => {
    if (userId) getUserData(userId).then(setUserData).catch(console.error);
  }, [userId]);

  useEffect(() => {
    if (eventData && userId && Array.isArray(eventData.participants)) {
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
      setIsUserParticipant(true);
      setShowPasscodeModal(false);
      setPasscode("");
      toast.success("Joined the private event!");
      refreshEvent();
    } catch (err: any) {
      toast.error(err.message || "Failed to join private event.");
    }
  };

  const handlePublicJoin = async () => {
    try {
      await joinEvent(eventId, userId!);
      setIsUserParticipant(true);
      toast.success("You have successfully joined the event!");
      refreshEvent();
    } catch {
      toast.error("Failed to join the event.");
    }
  };

  const handleLeave = async () => {
    try {
      const wasPrivate = eventData?.isPrivate;
      await leaveEvent(eventId, userId!);
      setIsUserParticipant(false);
      toast.success("You left the event.");
      if (wasPrivate) setShowPasscodeModal(true);
      refreshEvent();
    } catch {
      toast.error("Failed to leave event.");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(eventId);
      toast.success("Event deleted successfully.");
      router.push("/events");
    } catch {
      toast.error("Failed to delete the event.");
    }
  };

  const handleJoinClick = () => {
    eventData?.isPrivate ? setShowPasscodeModal(true) : handlePublicJoin();
  };

  const handleCancelPasscode = () => {
    setShowPasscodeModal(false);
    router.push("/events");
  };

  return (
    <div className="relative">
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[var(--foreground)]/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-white/50">Эвент устгах</DialogTitle>
            <DialogDescription className="pt-2 text-white text-base">
              Та <strong>"{eventData?.title}"</strong> эвентийг устгахдаа итгэлтэй байна уу?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Буцах
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteEvent}
            >
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showPasscodeModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-[#0A0A0B] p-6 rounded-lg shadow-lg w-80 text-white relative">
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

        {userId && eventData?.ownerId === userId && (
          <div className="w-full flex justify-end gap-2 mt-5">
            <Button
              className="bg-red-500/20 hover:bg-red-700/30 text-red-500 hover:text-red-400 rounded-full px-4 aspect-square"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 />
            </Button>
            <Button
              onClick={() => setIsEditDialogOpen(true)}
              className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full px-4 aspect-square"
            >
              <Pencil />
            </Button>
          </div>
        )}

        {eventData && eventData.ownerId === userId && (
          <EditEvent
            event={eventData}
            isOpen={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            onEventUpdate={(updatedEvent) => {
              toast.success("Event updated successfully!");
              setEventData(updatedEvent);
              setIsEditDialogOpen(false);
            }}
          />
        )}

        <div className="mt-10">
          <div className="bg-[#0A0A0B] border border-[#1D1D1D] rounded-full flex justify-between p-2 gap-3">
            <Button
              onClick={handleJoinClick}
              disabled={isUserParticipant}
              className={`flex-1 text-sm font-bold py-6 rounded-full flex flex-col items-center gap-1 ${
                isUserParticipant
                  ? "text-[var(--background)] bg-[#0278FC] cursor-not-allowed"
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
                  ? "text-[#5a5a5a] bg-[#1A1A1A] hover:brightness-110"
                  : "opacity-50 cursor-not-allowed"
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
              Hosted by <strong className="text-white">{eventData?.owner?.name}</strong>
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
