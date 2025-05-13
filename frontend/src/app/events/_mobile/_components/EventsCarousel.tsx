"use client";
import { useEffect, useState } from "react";
import { CardCarousel } from "@/components/ui/card-carousel";

interface Event {
  id: string;
  title: string;
  owner: { name: string };
  startAt: string;
  isPrivate: boolean;
  backgroundImage: string;
}

const EventsCarousel = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
        if (!res.ok) throw new Error(`Error fetching events: ${res.statusText}`);
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full h-full pt-20 px-8">
      {events.length > 0 ? (
        <CardCarousel events={events} />
      ) : (
        <p className="text-center text-gray-400">No events available.</p>
      )}
    </div>
  );
};

export default EventsCarousel;
