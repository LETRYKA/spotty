"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const EVENT_COORDINATES: [number, number] = [106.9177016, 47.9184676];
const DEFAULT_CENTER: [number, number] = [106.9177, 47.9185];

const smoothMove = (
  marker: mapboxgl.Marker,
  from: [number, number],
  to: [number, number],
  duration = 2000,
  onComplete: (newCoords: [number, number]) => void
) => {
  const start = performance.now();
  const animate = (time: number) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - (1 - progress) ** 3;
    const lng = from[0] + (to[0] - from[0]) * ease;
    const lat = from[1] + (to[1] - from[1]) * ease;
    marker.setLngLat([lng, lat]);
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete([lng, lat]);
    }
  };
  requestAnimationFrame(animate);
};

export default function LocationPage() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const eventMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const friendMarkersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const isAnimatingRef = useRef<Record<string, boolean>>({});
  const [userCoords, setUserCoords] = useState<[number, number] | null>(null);
  const [friends, setFriends] = useState([
    {
      id: "friend1",
      coords: [106.9205, 47.9185] as [number, number],
      image:
        "https://media.npr.org/assets/img/2024/03/03/ap24063160825614-9d604c3b01e95a989b89bed8184091ab0c967ef3.jpg?s=1100&c=50&f=jpeg",
    },
    {
      id: "friend2",
      coords: [106.9155, 47.9195] as [number, number],
      image:
        "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2025-04/250425-Kawhi-Leonard-ch-1142-ffa179.jpg",
    },
  ]);
  const [loading, setLoading] = useState(true);

  // GET User Location
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserCoords(DEFAULT_CENTER);
      return;
    }
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => setUserCoords([coords.longitude, coords.latitude]),
      () => setUserCoords(DEFAULT_CENTER),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Marker
  useEffect(() => {
    if (!userCoords || !mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/balkanaoppa/cm9vjzngv00i401s06zr61vb2",
      center: userCoords || DEFAULT_CENTER,
      zoom: 16,
      pitch: 45,
    });

    mapRef.current.dragRotate.disable();

    // Stabilize markers
    mapRef.current.on("moveend", () => {
      if (eventMarkerRef.current)
        eventMarkerRef.current.setLngLat(EVENT_COORDINATES);
      if (userMarkerRef.current && userCoords)
        userMarkerRef.current.setLngLat(userCoords);
      friends.forEach(({ id, coords }) => {
        if (friendMarkersRef.current[id]) {
          friendMarkersRef.current[id].setLngLat(coords);
        }
      });
    });

    mapRef.current.on("zoomend", () => {
      if (eventMarkerRef.current)
        eventMarkerRef.current.setLngLat(EVENT_COORDINATES);
      if (userMarkerRef.current && userCoords)
        userMarkerRef.current.setLngLat(userCoords);
      friends.forEach(({ id, coords }) => {
        if (friendMarkersRef.current[id]) {
          friendMarkersRef.current[id].setLngLat(coords);
        }
      });
    });

    mapRef.current.on("load", () => {
      // Event marker
      const eventEl = document.createElement("div");
      eventEl.className = "marker";
      eventEl.style.cssText = `
        width: 20px;
        height: 20px;
        background: #ef4444;
        border-radius: 50%;
        z-index: 10;
      `;
      eventMarkerRef.current = new mapboxgl.Marker(eventEl, {
        anchor: "center",
      })
        .setLngLat(EVENT_COORDINATES)
        .addTo(mapRef.current!);

      // FRIEND MARKER
      friends.forEach(({ id, coords, image }) => {
        const friendEl = document.createElement("div");
        friendEl.className = "marker";
        friendEl.style.cssText = `
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid black;
          background-image: url(${
            image || `https://via.placeholder.com/40?text=${id}`
          });
          background-size: cover;
          background-position: center;
          z-index: 5;
        `;
        friendMarkersRef.current[id] = new mapboxgl.Marker(friendEl, {
          anchor: "center",
        })
          .setLngLat(coords)
          .addTo(mapRef.current!);
      });

      // USER MARKER
      const userEl = document.createElement("div");
      userEl.className = "marker";
      userEl.style.cssText = `
        width: 16px;
        height: 16px;
        background: #3b82f6;
        border-radius: 50%;
        border: 1px solid white;
        z-index: 8;
        position: relative;
      `;

      const pulse = document.createElement("div");
      pulse.style.cssText = `
        position: absolute;
        width: 50px;
        height: 50px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: pulse 2s infinite;
        top: -17px;
        left: -17px;
      `;
      userEl.appendChild(pulse);

      userMarkerRef.current = new mapboxgl.Marker(userEl, { anchor: "center" })
        .setLngLat(userCoords)
        .addTo(mapRef.current!);

      if (mapRef.current) {
        mapRef.current.setCenter(userCoords || DEFAULT_CENTER);
      }
      setLoading(false);
    });
  }, [userCoords]);

  useEffect(() => {
    if (userCoords && userMarkerRef.current) {
      userMarkerRef.current.setLngLat(userCoords);
    }
  }, [userCoords]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
}
