"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Ellipsis, X } from "lucide-react";
import { useRouter } from "next/navigation";

const storyImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
];

const StoryProfile = () => {
  const router = useRouter();
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const preloadImage = (src: string, callback: () => void) => {
    const img = new Image();
    img.src = src;
    img.onload = callback;
  };

  useEffect(() => {
    setImageLoaded(false);
    preloadImage(storyImages[currentStory], () => setImageLoaded(true));

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
    }, 30);

    const timeout = setTimeout(() => {
      handleNext();
    }, 100000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [currentStory]);

  const handleNext = () => {
    setProgress(0);
    setCurrentStory((prev) => (prev + 1 < storyImages.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setProgress(0);
    setCurrentStory((prev) =>
      prev - 1 >= 0 ? prev - 1 : storyImages.length - 1
    );
  };

  return (
    <div className="w-full h-screen bg-black relative">
      <div
        className={`w-full h-full z-0 bg-center bg-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: `url(${storyImages[currentStory]})` }}
      >
        <div
          className="absolute left-0 top-0 h-full w-1/2 z-30 cursor-pointer"
          onClick={handlePrev}
        />
        <div
          className="absolute right-0 top-0 h-full w-1/2 z-30 cursor-pointer"
          onClick={handleNext}
        />
      </div>
      <div className="absolute top-4 w-full px-7 flex flex-col gap-4 z-40">
        <div className="w-full flex gap-1">
          {storyImages.map((_, index) => (
            <div
              key={index}
              className="bg-white/30 h-[4px] w-full rounded overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width:
                    index < currentStory
                      ? "100%"
                      : index === currentStory
                      ? `${progress}%`
                      : "0%",
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="w-full justify-between flex items-center">
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage
                className="rounded-full object-cover w-[40px] h-[40px]"
                src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                alt="User Profile"
              />
            </Avatar>
            <div className="flex flex-col text-white">
              <h1 className="text-[13px] font-semibold">LETRYKA</h1>
              <p className="text-[10px] text-white/70">12h ago</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Ellipsis className="stroke-white cursor-pointer" />
            <X
              onClick={() => router.back()}
              className="stroke-white cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryProfile;
