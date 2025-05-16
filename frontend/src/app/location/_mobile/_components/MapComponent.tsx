import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRouter } from "next/navigation";
import { getEvents } from "@/lib/api";

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

const MapComponent = ({ onCityNameChange }: MapComponentProps) => {
    const router = useRouter();
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
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