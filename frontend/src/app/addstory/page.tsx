"use client";

import { useEffect, useRef, useState } from "react";
import { X, LoaderCircle } from "lucide-react";

const AddStory = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [lastTakenPhoto, setLastTakenPhoto] = useState<string | null>(null); // ✅ store photo

  const startCamera = async (mode: "user" | "environment") => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          aspectRatio: 16 / 9,
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
    }
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode]);

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/jpeg");
    setLastTakenPhoto(imageDataUrl);
    console.log("📸 Photo captured:", imageDataUrl);
  };

  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-3">
      {/* Camera Area */}
      <div className="w-full h-[90vh] flex flex-col justify-start items-start p-4 relative">
        {/* Close Button */}
        <div className="absolute top-10 w-full flex justify-between px-5 z-10">
          <X className="w-8 h-auto aspect-square stroke-[var(--background)]" />
        </div>
        <div
          className="absolute bottom-16 w-full flex justify-center items-center z-10"
          onClick={takePhoto}
        >
          <div className="w-18 h-auto aspect-square bg-[var(--background)] rounded-full p-1">
            <div className="w-full h-auto aspect-square bg-[var(--foreground)] rounded-full border-4 border-transparent" />
          </div>
        </div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover rounded-2xl bg-slate-400"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="w-full flex justify-between items-center px-8">
        <div
          className="w-12 h-auto aspect-square bg-slate-600 rounded-lg border-2 border-[var(--background)] bg-cover bg-center"
          style={{
            backgroundImage: lastTakenPhoto ? `url(${lastTakenPhoto})` : "none",
          }}
        />
        <p className="text-[var(--background)] text-sm font-extrabold">STORY</p>
        <div
          onClick={handleFlipCamera}
          className="flex justify-center items-center p-3 bg-[var(--background)]/30 backdrop-blur-sm rounded-full"
        >
          <LoaderCircle className="w-6 h-auto aspect-square text-[var(--background)]" />
        </div>
      </div>
    </div>
  );
};

export default AddStory;
