"use client";

import { useState } from "react";
import MapWidgets from "./MapWidgets";
import LocationPage from "./Map";

const LocationWeb = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(() => {
    const savedState =
      typeof window !== "undefined"
        ? localStorage.getItem("sidebarState")
        : null;
    return savedState ? JSON.parse(savedState) : true;
  });
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  return (
    <>
      <div className="w-full h-screen items-center justify-center relative">
        <div className="absolute h-full z-40 p-7">
          <MapWidgets
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            selectedEventId={selectedEventId}
            setSelectedEventId={setSelectedEventId}
          />
        </div>
        <LocationPage
          setSelectedEventId={setSelectedEventId}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      </div>
    </>
  );
};

export default LocationWeb;
