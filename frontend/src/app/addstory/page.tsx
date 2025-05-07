"use client";

import { useEffect, useRef, useState } from "react";
import { X, LoaderCircle, Ellipsis } from "lucide-react";
import { Button } from "@/components/ui/button";

const AddStory = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [lastTakenPhoto, setLastTakenPhoto] = useState<string | null>(null);

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
  };

  const handleFlipCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const discardPhoto = () => {
    setLastTakenPhoto(null);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-center gap-3 relative overflow-hidden">
      {lastTakenPhoto ? (
        <div className="absolute w-full h-screen bg-[var(--foreground)] z-40 flex flex-col justify-start p-3">
          <div
            className="w-full h-13/14 bg-slate-700 rounded-3xl relative px-6 bg-cover bg-center"
            style={{
              backgroundImage: `url(${lastTakenPhoto})`,
            }}
          >
            <div className="absolute top-7 w-full left-0 flex justify-between items-center px-6">
              <div
                className="bg-[var(--foreground)]/30 backdrop-blur-lg rounded-full p-2"
                onClick={discardPhoto}
              >
                <X className="w-7 h-auto aspect-square stroke-[var(--background)]" />
              </div>
              <div className="bg-[var(--foreground)]/30 backdrop-blur-lg rounded-full p-3">
                <Ellipsis className="w-5 h-auto aspect-square stroke-[var(--background)]" />
              </div>
            </div>
          </div>
          <div className="w-full h-auto flex gap-2 mt-4 px-3">
            <Button
              className="w-2/4 py-6 bg-[var(--background)]/8 text-xs font-semibold rounded-full"
              onClick={discardPhoto}
            >
              Discard changes
            </Button>
            <Button className="w-2/4 py-6 bg-[var(--background)]/14 text-xs font-semibold rounded-full relative">
              <div
                className="absolute left-4 h-7 w-auto aspect-square border-2 border-[var(--background)] rounded-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://www.boredpanda.com/blog/wp-content/uploads/2022/01/61e019b9dea90_lyiSABO__700.jpg)`,
                }}
              ></div>
              <p className="ml-4">Your story</p>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-[90vh] flex flex-col justify-start items-start p-4 relative z-0">
            <div className="absolute top-10 w-full flex justify-between px-5 z-10">
              <X className="w-8 h-auto aspect-square stroke-[var(--background)]" />
            </div>
            <div
              className="absolute bottom-16 w-full flex justify-center items-center z-10"
              onClick={takePhoto}
            >
              <div className="w-18 h-auto aspect-square bg-transparent border-4 border-[var(--background)] rounded-full p-1">
                <div className="w-full h-auto aspect-square bg-[var(--background)] rounded-full" />
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
                backgroundImage: lastTakenPhoto
                  ? `url(${lastTakenPhoto})`
                  : "none",
              }}
            />
            <p className="text-[var(--background)] text-sm font-extrabold">
              STORY
            </p>
            <div
              onClick={handleFlipCamera}
              className="flex justify-center items-center p-3 bg-[var(--background)]/30 backdrop-blur-sm rounded-full"
            >
              <LoaderCircle className="w-6 h-auto aspect-square text-[var(--background)]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddStory;
