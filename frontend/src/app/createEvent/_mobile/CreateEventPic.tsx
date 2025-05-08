"use client";
import { useState, useRef } from "react";
import { Image as ImageIcon } from "lucide-react";

const CreateEventPic = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  return (
    <div className="absolute w-full bg-black h-[75vh] -z-10 overflow-hidden">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src={imagePreview || "/CreateEventPic.png"}
          alt="Banner"
        />
        <div className="w-full h-[40rem] absolute top-20 left-0 blur-gradient-mask pointer-events-none z-0" />
        <div className="absolute bottom-0 w-full z-0">
          <div className="w-full h-[30rem] bg-gradient-to-t from-[#00090D] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPic;
