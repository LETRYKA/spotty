"use client";

import React, { useEffect } from "react";

const Map: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.mapbox.com/mapbox-gl-js/v3.11.0/mapbox-gl.js";
    script.async = true;
    script.onload = () => {
      // Initialize map after the script has loaded
      if (typeof window !== "undefined") {
        const mapboxgl = require("mapbox-gl"); // Only import when running on the client side

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        const map = new mapboxgl.Map({
          container: "map", // The container ID
          style: process.env.NEXT_PUBLIC_MAPBOX_STYLE_URL, // Custom style URL
          projection: "globe", // Display the map as a globe
          zoom: 1,
          center: [30, 15],
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.on("style.load", () => {
          map.setFog({}); // Set the default atmosphere style
        });

        // Rotation logic
        const secondsPerRevolution = 240;
        const maxSpinZoom = 5;
        const slowSpinZoom = 3;

        let userInteracting = false;
        const spinEnabled = true;

        function spinGlobe() {
          const zoom = map.getZoom();
          if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;
            if (zoom > slowSpinZoom) {
              const zoomDif =
                (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
              distancePerSecond *= zoomDif;
            }
            const center = map.getCenter();
            center.lng -= distancePerSecond;
            map.easeTo({ center, duration: 1000, easing: (n: any) => n });
          }
        }

        map.on("mousedown", () => {
          userInteracting = true;
        });
        map.on("dragstart", () => {
          userInteracting = true;
        });

        map.on("moveend", () => {
          spinGlobe();
        });

        spinGlobe(); // Start spinning the globe initially
      }
    };

    document.head.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      id="map"
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
};

export default Map;
