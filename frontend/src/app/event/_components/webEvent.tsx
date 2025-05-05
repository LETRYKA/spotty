"use client";
import { useState, useRef } from "react";
import { DatePickerDemo } from "./date-picker";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import PinInput from "./pin-input";

const WebEvent = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showPinStep, setShowPinStep] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleContinue = () => {
    if (isPrivate) {
      setShowPinStep(true);
    } else {
      alert("Event created successfully!");
    }
  };

  const handlePinSubmit = () => {
    if (pinCode.length === 4) {
      alert(`Private event created successfully!`);
    } else {
      alert("Please enter a valid 4-digit PIN.");
    }
  };

  return (
    <div className="">
      <div className="relative bg-[#1C1B20] w-[25%] min-w-md rounded-2xl flex flex-col items-start px-6 py-6 space-y-4">
        {!showPinStep ? (
          <>
            <div>
              <p className="text-2xl font-semibold text-white">Create event</p>
              <p className="text-base text-white opacity-50">
                Enter private passcode of the event
              </p>
            </div>

            <label className="text-sm text-white opacity-50">Title</label>
            <div className="w-full flex flex-row space-x-4">
              <input
                type="text"
                className="w-1/2 bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
              />
              <input
                type="text"
                className="w-1/2 bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
              />
            </div>

            <label className="text-sm text-white opacity-50">Description</label>
            <textarea className="w-full h-32 bg-[#28272A] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#68686d] placeholder:text-white placeholder:opacity-50 resize-none" />

            <div className="w-full flex flex-row space-x-4">
              <DatePickerDemo />
              <input
                type="text"
                placeholder="Slot"
                className="w-1/2 bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
              />
            </div>
            {imagePreview ? (
              <div
                className="w-full h-32 bg-cover bg-center rounded-lg border border-gray-700 cursor-pointer"
                style={{ backgroundImage: `url(${imagePreview})` }}
                onClick={triggerFileInput}
              />
            ) : (
              <div
                className="w-full bg-[#28272A] rounded-lg flex flex-col justify-center items-center cursor-pointer p-2"
                onClick={triggerFileInput}
              >
                <div className="border border-dashed border-gray-700 rounded-lg w-full h-full flex flex-col justify-center items-center py-4">
                  <Image src="/Group 55 (1).png" alt="" width={60} height={60} />
                  <p className="text-white text-[12px]">Drop your image here</p>
                  <p className="text-white opacity-[0.3] text-[10px]">
                    Supports: JPEG, JPEG2000, PNG
                  </p>
                </div>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="w-full flex flex-row justify-between items-center rounded-2xl bg-[#28272A] px-4 py-5">
              <div>
                <p className="text-white">Private</p>
                <p className="text-white opacity-[0.5] text-[12px]">
                  It will be secured with 4 digit passcode
                </p>
              </div>
              <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            </div>
            <div className="w-full flex flex-row justify-between items-center rounded-2xl bg-[#28272A] px-4 py-5">
              <div>
                <p className="text-white">Hide from the map</p>
                <p className="text-white opacity-[0.5] text-[12px]">
                  Only your friends can see the event.
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex flex-row space-x-4 w-full mt-auto">
              <button className="w-1/2 h-12 rounded-full text-sm text-white bg-[#28272A] hover:bg-[#3b3a3d] transition-colors duration-200">
                Maybe later
              </button>
              <button
                onClick={handleContinue}
                className="w-1/2 h-12 rounded-full text-sm text-white bg-[#4B4AFE] hover:bg-[#6c6bff] transition-colors duration-200"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-2xl font-semibold text-white mb-2">Enter Passcode</p>
            <p className="text-white opacity-50 text-sm mb-4">
              This event is private. Enter the 4-digit passcode to secure it.
            </p>
            <PinInput onChange={(pin) => setPinCode(pin)} />
            <button
              className="w-full h-12 mt-6 rounded-full text-sm text-white bg-[#4B4AFE] hover:bg-[#6c6bff] transition-colors duration-200"
              onClick={handlePinSubmit}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default WebEvent;
