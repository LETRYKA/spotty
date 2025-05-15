"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchEvent } from "@/lib/api";
import axios from "axios";

const LOCATIONIQ_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY || "";

interface EventData {
  lat: string;
  lng: string
}

const DirectionEvent = () => {
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [address, setAddress] = useState<string>("");
  const params = useParams();
  const eventId = params?.eventId as string;

  useEffect(() => {
    if (!eventId) return;
    const getEvent = async () => {
      try {
        const data = await fetchEvent(eventId);
        if (data) {
          setEventData({
            lat: data.lat,
            lng: data.lng
          }
        );        
        }   
      } catch (error) {
        console.error("Failed to load event data", error);
      }
    };
    getEvent();
  }, [eventId]);
  useEffect(() => {
    const fetchAddress = async () => {
      if (!eventData) return;
      try {
        const res = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${eventData.lat}&lon=${eventData.lng}&format=json`
        );
        const fetchedAddress = res.data.display_name;
        setAddress(fetchedAddress);
      } catch (err) {
        console.error("❌ Reverse geocoding failed", err);
      }
    };
    fetchAddress();
  }, [eventData]);
  return (
    <div className="bg-[#0A0A0B] w-full rounded-2xl border border-[#1D1D1D] flex flex-col mt-5 overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center w-full">
        <h1 className="text-white/50 text-sm font-bold py-3">Directions</h1>
        <p className="text-white text-sm w-[50%] pb-3">
          {address}
        </p>
      </div>
      <div className="w-full">
        <img
          className="object-cover w-full h-full"
          src={"/Event.png"}
          alt="Banner Image"
        />
      </div>
    </div>
  );
};

export default DirectionEvent;
