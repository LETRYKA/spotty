"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import PasscodeDialog from "./Passcode";
import { EventDetailContent } from "./EventDetailContent";
import { fetchEvent, verifyPasscode, joinEvent, leaveEvent } from "@/lib/api";
import { Event } from "@/types/Event";

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
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    setHasAccess(false);
    setShowPasscodeDialog(false);
    setJoined(false);
  }, [eventId]);

  useEffect(() => {
    const loadEvent = async () => {
      const fetchedEvent = await fetchEvent(eventId);
      setEvent(fetchedEvent);

      if (fetchedEvent?.isPrivate) {
        setShowPasscodeDialog(true);
      } else {
        setHasAccess(true);
      }
    };

    loadEvent();
  }, [eventId]);

  useEffect(() => {
    if (!event || !user || !hasAccess) return;
    const isJoined = event.participants.some(
      (participant) => participant.name === user.fullName
    );
    setJoined(isJoined);
  }, [event, user, hasAccess]);

  const handlePasscodeSubmit = async (passcode: string) => {
    if (!event) return;

    const isValid = await verifyPasscode(event.id, passcode);
    if (isValid) {
      setHasAccess(true);
      setShowPasscodeDialog(false);
    } else {
      toast.error("Invalid passcode");
    }
  };

  const handleJoin = async () => {
    if (!user || !event) return;
    const updatedEvent = await joinEvent(event.id, user.id);
    if (updatedEvent) {
      setEvent(updatedEvent);
      setJoined(true);
      toast.success("Joined event successfully!");
    }
  };

  const handleLeave = async () => {
    if (!user || !event) return;
    const updatedEvent = await leaveEvent(event.id, user.id);
    if (updatedEvent) {
      setEvent(updatedEvent);
      setJoined(false);
      toast.success("See you next time ;(");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  if (event.isPrivate && !hasAccess) {
    return (
      <PasscodeDialog
        open={showPasscodeDialog}
        onSubmit={handlePasscodeSubmit}
        onCancel={() => {
          setShowPasscodeDialog(false);
          onBack();
        }}
        eventTitle={event.title}
        mode="access"
      />
    );
  }

  return (
    <EventDetailContent
      event={event}
      joined={joined}
      onBack={onBack}
      onJoin={handleJoin}
      onLeave={handleLeave}
    />
  );
};

export default EventDetail;
