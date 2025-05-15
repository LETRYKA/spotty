"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Button } from "@/components/ui/button";
import { Navigation, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { renderToStaticMarkup } from 'react-dom/server';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

const LOCATIONIQ_KEY = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY || "";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: iconUrl.src,
  iconRetinaUrl: iconRetinaUrl.src,
  shadowUrl: shadowUrl.src,
});

const customMapPinIcon = L.divIcon({
  html: renderToStaticMarkup(<MapPin size={24} color="#2563EB" />),
  className: 'leaflet-lucide-icon',
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

function LocationPicker({
  onPick,
}: {
  onPick: (lat: number, lng: number, address: string) => void;
}) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const res = await axios.get(
          `https://us1.locationiq.com/v1/reverse?key=${LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`
        );
        const address = res.data.display_name;
        onPick(lat, lng, address);
      } catch (err) {
        console.error("❌ Reverse geocoding failed", err);
        toast.error("Failed to fetch address");
      }
    },
  });

  return null;
}

export default function LocationSelect({
  open,
  onSelect,
  onClose,
}: {
  open: boolean;
  onSelect: (lat: number, lng: number, address: string) => void;
  onClose: () => void;
}) {
  const [latlng, setLatlng] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [address, setAddress] = useState("");

  const handlePick = useCallback((lat: number, lng: number, addr: string) => {
    console.log("Location picked:", { lat, lng, addr });
    setLatlng({ lat, lng });
    setAddress(addr);
  }, []);

  const handleContinue = useCallback(() => {
    if (latlng) {
      console.log("Continue clicked, selecting:", latlng);
      onSelect(latlng.lat, latlng.lng, address);
      onClose();
    }
  }, [latlng, address, onSelect, onClose]);

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      console.log("LocationSelect onOpenChange:", isOpen);
      if (!isOpen) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[500px] bg-black/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">
            Choose Location
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <MapContainer
            center={[47.9184676, 106.9177016]}
            zoom={13}
            className="h-[400px] rounded-2xl"
          >
            <TileLayer
              url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              attribution="© OpenStreetMap contributors"
            />
            <LocationPicker onPick={handlePick} />
            {latlng && <Marker position={[latlng.lat, latlng.lng]} icon={customMapPinIcon} />}
          </MapContainer>
          {latlng && (
            <div className="w-full px-6 py-4 bg-[var(--foreground)]/80 backdrop-blur-2xl text-[var(--background)] rounded-2xl border border-[#2F2F2F] transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4 overflow-hidden">
                <div className="w-5 h-5 flex items-center justify-center">
                  <Navigation
                    width={18}
                    height={18}
                    className="text-[var(--background)]/50"
                  />
                </div>
                <p className="text-sm">{address}</p>
              </div>
            </div>
          )}
          <DialogClose asChild>
            <Button
              onClick={handleContinue}
              disabled={!latlng}
              className="w-full bg-blue-600 rounded-xl py-5 hover:bg-blue-700 disabled:bg-blue-600/50"
            >
              Continue
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
