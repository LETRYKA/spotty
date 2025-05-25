import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { getEvents, getFriends } from "@/lib/api";
import { useUser } from "@clerk/nextjs";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Event {
    id: string;
    title: string;
    lat: number;
    lng: number;
    isPrivate: boolean;
    backgroundImage: string | null;
}

interface MapComponentProps {
    onCityNameChange: (cityName: string) => void;
}

interface Location {
    lat: number;
    lng: number;
}
interface Friend {
    id: string;
    name: string;
    avatarImage: string | null;
    moodStatus: string | null;
    locations: Location[];
}

const MapComponent = ({ onCityNameChange }: MapComponentProps) => {
    const router = useRouter();
    const { user } = useUser();
    const userId = user?.id;
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const friendMarkersRef = useRef<mapboxgl.Marker[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        if (!mapContainer.current) return;
        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL!,
            center: [106.9177016, 47.9184676],
            zoom: 13,
        });

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { longitude, latitude } = position.coords;
                setUserLocation([longitude, latitude]);
                mapRef.current?.setCenter([longitude, latitude]);

                // city ner avah huselt
                try {
                    const response = await fetch(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}&types=place,locality,neighborhood,district&country=mn`
                    );
                    const data = await response.json();
                    console.log('Geocoding response:', data);

                    const city = data.features.find(
                        (feature: any) =>
                            feature.text === "Ulaanbaatar" ||
                            (feature.place_type.includes('place') && feature.context?.some((ctx: any) => ctx.text === "Ulaanbaatar"))
                    );

                    if (city) {
                        onCityNameChange("Ulaanbaatar, Mongolia");
                    } else if (data.features.length > 0) {
                        const firstResult = data.features[0];
                        onCityNameChange(`${firstResult.text}, Mongolia`);
                    }
                } catch (error) {
                    console.error("error", error);
                }
            },
            (error) => console.error("error:", error)
        );

        return () => mapRef.current?.remove();
    }, [onCityNameChange]);

    // event get
    useEffect(() => {
        const fetchEvents = async () => {
            const eventsData = await getEvents();
            setEvents(eventsData);
        };
        fetchEvents();
    }, []);

    // friends get (fetch every 5 seconds)
    useEffect(() => {
        if (!userId) return;
        let interval: NodeJS.Timeout;
        const fetchFriends = async () => {
            const friendsData = await getFriends(userId);
            setFriends(friendsData);
            console.log('Fetched friends:', friendsData);
        };
        fetchFriends();
        interval = setInterval(fetchFriends, 5000);
        return () => clearInterval(interval);
    }, [userId]);

    // user marker get
    useEffect(() => {
        if (!mapRef.current || !userLocation) return;
        const userMarker = document.createElement("div");
        userMarker.className = "user-marker";
        new mapboxgl.Marker(userMarker)
            .setLngLat(userLocation)
            .addTo(mapRef.current);
    }, [userLocation]);

    // event marker get
    useEffect(() => {
        if (!mapRef.current) return;
        events.forEach((event) => {
            if (!isValidCoordinates(event)) return;

            const el = document.createElement("div");
            el.className = "event-marker cursor-pointer";
            el.addEventListener("click", () => {
                router.push(`/eventInfo/${event.id}`);
            });

            el.innerHTML = `
        <div class="event-container flex flex-col justify-center items-center">
          <div class="w-16 h-auto aspect-square bg-gradient-to-r from-purple-500 via-purple-500 to-pink-500 shadow-lg p-1 rounded-full relative">
            <img src="${event.backgroundImage ||
                "https://miro.medium.com/v2/resize:fit:1400/0*Nn3K0jqCPuxdyK3B"
                }" 
                 class="event-image object-cover w-full h-auto aspect-square rounded-full shadow-md" />
            ${event.isPrivate
                    ? '<div class="absolute w-7 h-auto aspect-square -right-2 bottom-0 bg-[var(--background)] rounded-full flex items-center justify-center">🔒</div>'
                    : ""
                }
          </div>
          <div class="event-label text-white text-xs font-medium mt-2 text-center">${event.title
                }</div>
        </div>
      `;

            new mapboxgl.Marker(el, { anchor: "bottom" })
                .setLngLat([event.lng, event.lat])
                .addTo(mapRef.current!);
        });
    }, [events, router]);

    // friends marker get
    useEffect(() => {
        if (!mapRef.current) return;
        // Clear previous friend markers
        friendMarkersRef.current.forEach(marker => marker.remove());
        friendMarkersRef.current = [];
        if (!friends.length) return;
        friends.forEach((friend) => {
            friend.locations.forEach((location) => {
                if (isValidCoordinates(location)) {
                    const el = document.createElement("div");
// Container for marker and bubble
el.style.display = "flex";
el.style.flexDirection = "column";
el.style.alignItems = "center";
el.style.pointerEvents = "auto";

// Bubble for moodStatus
if (friend.moodStatus) {
    const bubble = document.createElement("div");
    bubble.className = "friend-mood-bubble";
    bubble.innerText = friend.moodStatus;
    bubble.style.background = "#fff";
    bubble.style.color = "#333";
    bubble.style.padding = "2px 8px";
    bubble.style.borderRadius = "16px";
    bubble.style.boxShadow = "0 2px 8px rgba(0,0,0,0.10)";
    bubble.style.fontSize = "10px";
    bubble.style.marginBottom = "4px";
    bubble.style.whiteSpace = "nowrap";
    bubble.style.position = "relative";
    // Add a small pointer
    const pointer = document.createElement("div");
    pointer.style.position = "absolute";
    pointer.style.left = "50%";
    pointer.style.bottom = "-6px";
    pointer.style.transform = "translateX(-50%)";
    pointer.style.width = "0";
    pointer.style.height = "0";
    pointer.style.borderLeft = "6px solid transparent";
    pointer.style.borderRight = "6px solid transparent";
    pointer.style.borderTop = "6px solid #fff";
    bubble.appendChild(pointer);
    el.appendChild(bubble);
}

// Marker avatar
const avatar = document.createElement("div");
avatar.className = "friend-marker-avatar";
avatar.style.width = "48px";
avatar.style.height = "48px";
avatar.style.borderRadius = "24px";
avatar.style.overflow = "hidden";
avatar.style.border = "2px solid #fff";
avatar.style.boxShadow = "0 0 8px rgba(0,0,0,0.18)";
avatar.style.background = "#eee";
if (friend.avatarImage) {
    avatar.style.backgroundImage = `url(${friend.avatarImage})`;
    avatar.style.backgroundSize = "cover";
    avatar.style.backgroundPosition = "center";
}
el.appendChild(avatar);
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([location.lng, location.lat])
                        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<div><strong>${friend.name}</strong>${friend.moodStatus ? `<br/><span>Mood: ${friend.moodStatus}</span>` : ''}</div>`))
                        .addTo(mapRef.current!);
                    friendMarkersRef.current.push(marker);
                }
            });
        });
    }, [friends, mapRef]);

    return (
        <>
            <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
            <style>{`
        .event-marker { 
          background-size: cover; 
          background-position: center; 
          border-radius: 50%;
          will-change: transform;
        }
        .event-marker:hover {
          transform: scale(1.1);
          z-index: 1;
        }
        .user-marker { 
          width: 16px; 
          height: 16px; 
          background-color: #4285f4; 
          border-radius: 50%; 
          position: relative; 
          border: 1px solid white;
          will-change: transform;
        }
        .user-marker::before { 
          content: ''; 
          position: absolute; 
          top: -5px; 
          left: -5px; 
          right: -5px; 
          bottom: -5px; 
          background-color: rgba(66, 133, 244, 0.3); 
          border-radius: 50%; 
          animation: pulse 3s infinite; 
        }
        @keyframes pulse { 
          0% { transform: scale(1); opacity: 1; } 
          100% { transform: scale(3); opacity: 0; } 
        }
      `}</style>
        </>
    );
};

const isValidCoordinates = (location: { lat: number; lng: number }) => {
    const { lat, lng } = location;
    return (
        typeof lat === "number" &&
        typeof lng === "number" &&
        lat >= -90 &&
        lat <= 90 &&
        lng >= -180 &&
        lng <= 180
    );
};

export default MapComponent; 