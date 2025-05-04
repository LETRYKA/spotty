"use client";

import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SidebarHeader from "./_components/SidebarHeader";
import EventList from "./_components/EventList";
import EventDetail from "./_components/EventDetail";

interface MapWidgetsProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
  selectedEventId: string | null;
  setSelectedEventId: (eventId: string | null) => void;
}

const MapWidgets = ({
  isSideBarOpen,
  setIsSideBarOpen,
  selectedEventId,
  setSelectedEventId,
}: MapWidgetsProps) => {
  const handleSideBarControl = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isSideBarOpen));
  }, [isSideBarOpen]);

  useEffect(() => {
    if (selectedEventId && !isSideBarOpen) {
      setIsSideBarOpen(true);
    }
  }, [selectedEventId, isSideBarOpen, setIsSideBarOpen]);

  return (
    <div
      className={`h-full ${
        isSideBarOpen ? `w-[440px]` : `w-20`
      } flex flex-col gap-4 transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <SidebarHeader
        isSideBarOpen={isSideBarOpen}
        onToggle={handleSideBarControl}
      />

      <div className="w-full h-9/10 bg-black/60 rounded-3xl flex flex-col justify-start items-center gap-4 backdrop-blur-lg">
        {!isSideBarOpen && (
          <div
            onClick={handleSideBarControl}
            className="h-full flex justify-center items-center"
          >
            <ChevronRight
              width={26}
              className="stroke-[var(--background)] cursor-pointer"
            />
          </div>
        )}

        {isSideBarOpen && selectedEventId ? (
          <EventDetail
            eventId={selectedEventId}
            onBack={() => setSelectedEventId(null)}
          />
        ) : isSideBarOpen ? (
          <EventList onSelectEvent={(eventId) => setSelectedEventId(eventId)} />
        ) : null}
      </div>
    </div>
  );
};

export default MapWidgets;
