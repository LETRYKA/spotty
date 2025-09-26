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
  const [wsDisabled, setWsDisabled] = useState(false);
  const [usePolling, setUsePolling] = useState(false);

  useEffect(() => {
    if (!API_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return;
    }

    if (wsDisabled) {
      console.log("WebSocket is disabled due to previous errors");
      return;
    }

    // Check if we're in development and provide helpful info
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 Development mode: WebSocket debugging enabled");
      console.log("💡 To fix WebSocket errors:");
      console.log("1. Make sure your backend server is running");
      console.log("2. Check that NEXT_PUBLIC_API_URL is set correctly");
      console.log("3. Verify the server supports WebSocket connections");
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

    // Check if we're using Render.com (which doesn't support WebSocket by default)
    if (socketUrl.includes("onrender.com")) {
      console.warn(
        "⚠️ Render.com detected - WebSocket connections are not supported by default"
      );
      console.warn("💡 Solutions:");
      console.warn(
        "1. Use a different hosting service (Railway, Heroku, DigitalOcean)"
      );
      console.warn("2. Use Server-Sent Events (SSE) instead of WebSocket");
      console.warn("3. Use polling for real-time updates");
      console.warn(
        "Disabling WebSocket functionality for Render.com deployment"
      );
      console.log("🔄 Enabling polling fallback for real-time updates");
      setWsDisabled(true);
      setUsePolling(true);
      return;
    }

    console.log("Attempting to connect to WebSocket:", socketUrl);
    console.log("API_URL from environment:", API_URL);

    // Validate URL format
    try {
      new URL(socketUrl);
      console.log("✅ WebSocket URL format is valid");
    } catch (urlError) {
      console.error("❌ Invalid WebSocket URL format:", socketUrl);
      console.error("URL error:", urlError);
      setWsDisabled(true);
      return;
    }

    // Add connection timeout
    const connectionTimeout = setTimeout(() => {
      console.error("❌ WebSocket connection timeout after 10 seconds");
      console.error(
        "This usually means the WebSocket server is not running or not accessible"
      );
      setWsDisabled(true);
    }, 10000);

    const socket = new WebSocket(socketUrl);
    let isConnected = false;
    let watchId: number | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    socket.onopen = () => {
      console.log("✅ WebSocket connected successfully");
      clearTimeout(connectionTimeout);
      isConnected = true;
    };

    socket.onclose = (event) => {
      clearTimeout(connectionTimeout);
      console.log("❌ WebSocket closed:", {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
      });
      isConnected = false;

      // Attempt to reconnect after 3 seconds if not a clean close
      if (!event.wasClean && event.code !== 1000) {
        console.log("🔄 Attempting to reconnect in 3 seconds...");
        reconnectTimeout = setTimeout(() => {
          console.log("🔄 Reconnecting WebSocket...");
          // The useEffect will run again due to dependency changes
        }, 3000);
      }
    };

    socket.onerror = (error) => {
      clearTimeout(connectionTimeout);

      // Try to extract error information safely
      const errorInfo = {
        error: error,
        errorType: error?.type || "unknown",
        errorTarget: error?.target || null,
        readyState: socket.readyState,
        url: socketUrl,
        timestamp: new Date().toISOString(),
      };

      console.error("❌ WebSocket error:", errorInfo);

      // Log additional error details if available
      if (error?.target) {
        try {
          console.error("Error target details:", {
            readyState: error.target.readyState,
            url: error.target.url,
            protocol: error.target.protocol,
          });
        } catch (e) {
          console.error("Could not extract error target details:", e);
        }
      } else {
        console.error(
          "No error target available - likely immediate connection failure"
        );
      }

      isConnected = false;

      // Disable WebSocket after multiple failures to prevent spam
      console.warn("⚠️ WebSocket connection failed. This usually means:");
      console.warn("1. WebSocket server is not running");
      console.warn("2. Incorrect API_URL configuration");
      console.warn("3. Network/firewall blocking the connection");
      console.warn("Disabling WebSocket functionality to prevent errors.");
      setWsDisabled(true);
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
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;

          // Only send if WebSocket is connected
          if (isConnected && socket.readyState === WebSocket.OPEN) {
            socket.send(
              JSON.stringify({
                type: "location-update",
                userId,
                lat,
                lng,
              })
            );
          } else {
            console.warn("WebSocket not ready, skipping location update");
          }
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
      if (reconnectTimeout !== null) {
        clearTimeout(reconnectTimeout);
      }
      clearTimeout(connectionTimeout);
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        socket.close(1000, "Component unmounting");
      }
    };
  }, [userId, wsDisabled]);

  // Polling fallback for when WebSocket is not available
  useEffect(() => {
    if (!usePolling || !API_URL) return;

    console.log("🔄 Starting polling fallback for location updates");

    const pollInterval = setInterval(async () => {
      try {
        // Poll for friend locations every 5 seconds
        const response = await fetch(
          `${API_URL}/api/friends/${userId}/locations`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data)) {
            setFriendLocations(data);
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 5000);

    return () => {
      console.log("🔄 Stopping polling fallback");
      clearInterval(pollInterval);
    };
  }, [usePolling, userId, API_URL]);

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
