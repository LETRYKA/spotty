"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useUser } from "@clerk/nextjs";
import { getEvents, getFriends } from "@/lib/api";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Location { lat: number; lng: number; }
interface Friend {
  id: string;
  name: string;
  avatarImage: string | null;
  moodStatus: string | null;
  locations: Location[];
}
interface Event {
  id: string;
  title: string;
  lat: number;
  lng: number;
  isPrivate: boolean;
  backgroundImage: string | null;
}

interface MapProps {
  setSelectedEventId: (eventId: string | null) => void;
  setIsSideBarOpen: (open: boolean) => void;
}

export default function MapWithFriendsAndEvents({ setSelectedEventId, setIsSideBarOpen }: MapProps) {
  const { user } = useUser();
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!,
      center: [106.9177016, 47.9184676],
      zoom: 13,
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords;
        setUserLocation([longitude, latitude]);
        mapRef.current?.setCenter([longitude, latitude]);
      },
      (error) => console.error("Error getting user location:", error)
    );

    return () => mapRef.current?.remove();
  }, []);

  // data fetch
  useEffect(() => {
    const fetchData = async () => {
      const [friendsData, eventsData] = await Promise.all([
        getFriends('user_2wTOJwIWXyv5OyMIQnLu9WQEPS0'),
        getEvents()
      ]);
      setFriends(friendsData);
      setEvents(eventsData);
    };
    fetchData();
  }, []);

  // redner user
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    const userMarker = document.createElement("div");
    userMarker.className = "user-marker";
    new mapboxgl.Marker(userMarker).setLngLat(userLocation).addTo(mapRef.current);
  }, [userLocation]);

  // render friend
  useEffect(() => {
    if (!mapRef.current) return;
    friends.forEach((friend) => {
      const location = friend.locations[0];
      if (!location || !isValidCoordinates(location)) return;

      const el = document.createElement("div");
      el.className = "friend-marker";
      el.innerHTML = `
        ${friend.moodStatus ? `<div class="speech-bubble">${friend.moodStatus}</div>` : ''}
        <img src="${friend.avatarImage || "https://via.placeholder.com/48"}" 
             class="avatar w-14 h-14 rounded-2xl border-3 border-white shadow-md" />
      `;

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat([location.lng, location.lat])
        .addTo(mapRef.current!);
    });
  }, [friends]);

  // event on the map
  useEffect(() => {
    if (!mapRef.current) return;
    events.forEach((event) => {
      if (!isValidCoordinates(event)) return;

      const el = document.createElement("div");
      el.className = "event-marker cursor-pointer";
      el.addEventListener("click", () => {
        setSelectedEventId(event.id);
        setIsSideBarOpen(true);
      });

      el.innerHTML = `
        <div class="event-container flex flex-col justify-center items-center">
          <div class="w-16 h-auto aspect-square bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 shadow-lg p-1 rounded-full relative">
            <img src="${event.backgroundImage || "https://via.placeholder.com/48"}" 
                 class="event-image object-cover w-full h-auto aspect-square rounded-full shadow-md" />
            ${event.isPrivate ? '<div class="absolute w-7 h-auto aspect-square -right-2 bottom-0 bg-[var(--background)] rounded-full flex items-center justify-center">🔒</div>' : ''}
          </div>
          <div class="event-label text-white text-xs font-medium mt-2 text-center">${event.title}</div>
        </div>
      `;

      new mapboxgl.Marker(el, { anchor: "bottom" })
        .setLngLat([event.lng, event.lat])
        .addTo(mapRef.current!);
    });
  }, [events, setSelectedEventId, setIsSideBarOpen]);

  return (
    <>
      <style>{`
        .friend-marker { display: flex; flex-direction: column; align-items: center; }
        .speech-bubble { margin-bottom: 7px; background: white; padding: 0px 8px; border-radius: 100px; font-size: 10px; white-space: nowrap; box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2); }
        .speech-bubble::after { content: ''; position: absolute; bottom: -5px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid white; }
        .event-marker { background-size: cover; background-position: center; border-radius: 50%; }
        .user-marker { width: 16px; height: 16px; background-color: #4285f4; border-radius: 50%; position: relative; border: 1px solid white; }
        .user-marker::before { content: ''; position: absolute; top: -5px; left: -5px; right: -5px; bottom: -5px; background-color: rgba(66, 133, 244, 0.3); border-radius: 50%; animation: pulse 3s infinite; }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(3); opacity: 0; } }
      `}</style>
      <div ref={mapContainer} className="w-full h-screen" />
    </>
  );
}

const isValidCoordinates = (location: { lat: number; lng: number }) => {
  const { lat, lng } = location;
  return typeof lat === "number" && typeof lng === "number" &&
    lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
};