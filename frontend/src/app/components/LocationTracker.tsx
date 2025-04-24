"use client";

import { useEffect } from "react";

export default function LiveLocation({ userId }: { userId: string }) {
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      console.log("webscoket connected");

      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          console.log("post", latitude, longitude);

          socket.send(
            JSON.stringify({
              type: "location-update",
              userId,
              lat: latitude,
              lng: longitude,
            })
          );
        },
        (err) => {
          console.error("error:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WS:", data);
    };

    return () => {
      socket.close();
    };
  }, [userId]);

  return <div>🛰️ Live location sharing enabled for {userId}</div>;
}
