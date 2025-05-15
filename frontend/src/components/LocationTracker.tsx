"use client";

import { useEffect, useState } from "react";

type FriendLocation = {
  userId: string;
  lat: number;
  lng: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LiveLocation({ userId }: { userId: string }) {
  const [friendLocations, setFriendLocations] = useState<FriendLocation[]>([]);

  useEffect(() => {
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return;
    }

    let socketUrl = API_URL.replace(/^http/, "ws");
    if (API_URL.startsWith("https://")) {
      socketUrl = API_URL.replace("https://", "wss://");
    } else if (API_URL.startsWith("http://")) {
      socketUrl = API_URL.replace("http://", "ws://");
    } else if (API_URL.startsWith("ws://") || API_URL.startsWith("wss://")) {
      socketUrl = API_URL;
    } else {
      socketUrl = `ws://${API_URL}`;
    }

    const socket = new WebSocket(socketUrl);

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
    <></>
    // <div>
    //   Location working {userId}
    //   <ul>
    //     {friendLocations.map((f) => (
    //       <li key={f.userId}>
    //         {f.userId}: ({f.lat.toFixed(5)}, {f.lng.toFixed(5)})
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
