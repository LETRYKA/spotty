"use client";

import { useEffect, useState } from "react";

type FriendLocation = {
  userId: string;
  lat: number;
  lng: number;
};

export default function LiveLocation({ userId }: { userId: string }) {
  const [friendLocations, setFriendLocations] = useState<FriendLocation[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("websocket working");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "friend-location-update" && data.userId !== userId) {
        setFriendLocations((prev) => {
          const updated = prev.filter((f) => f.userId !== data.userId);
          return [
            ...updated,
            { userId: data.userId, lat: data.lat, lng: data.lng },
          ];
        });
      }
    };

    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          socket.send(
            JSON.stringify({
              type: "location-update",
              userId,
              lat,
              lng,
            })
          );
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }

    return () => {
      socket.close();
    };
  }, [userId]);

  return (
    <div>
      Location working {userId}
      <ul>
        {friendLocations.map((f) => (
          <li key={f.userId}>
            {f.userId}: ({f.lat.toFixed(5)}, {f.lng.toFixed(5)})
          </li>
        ))}
      </ul>
    </div>
  );
}
