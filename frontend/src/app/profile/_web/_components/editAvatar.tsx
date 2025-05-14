"use client";

import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/app/profile/_web/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  useSyncMoodFromUserData,
  handleMoodBlur,
  handleImageUpload,
} from "@/app/profile/_web/utils/editAvatarSupport";

const EditAvatar = () => {
  const { userData, setUserData } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  useSyncMoodFromUserData(userData, setMood);

  const hasStories = (userData?.stories ?? []).length > 0;

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="flex gap-1 justify-center absolute items-center ml-28"
        style={{ willChange: "transform" }}
        animate={{
          y: ["0%", "-10%", "0%"],
          rotate: [0, 2, -2, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.8,
          ease: "easeInOut",
          times: [0, 0.3, 0.7, 1],
          delay: 0.3,
        }}
      >
        <motion.div
          className="rounded-full w-2 h-2 bg-black -mb-4"
          animate={{ y: [0, -2, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="rounded-full w-3 h-3 bg-black -mb-1 -ml-1"
          animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: "easeInOut",
            repeatType: "mirror",
            delay: 0.2,
          }}
        />
        {isEditing ? (
          <div className="flex flex-col items-center -ml-4 -mt-2">
            <motion.input
              type="text"
              value={mood}
              placeholder="Өнөөдөр би..."
              onChange={(e) => {
                const value = e.target.value;
                if ([...value].length <= 20) {
                  setMood(value);
                }
              }}
              onBlur={() => {
                const trimmed = mood.trim();
                if (trimmed) {
                  handleMoodBlur({
                    userData,
                    mood: trimmed,
                    setIsEditing,
                    setUserData,
                  });
                } else {
                  setIsEditing(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              autoFocus
              className="font-semibold text-center rounded-2xl px-3 py-1 max-w-xs text-white text-xs bg-black focus:outline-none focus:ring-2 focus:ring-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <p
              className={`text-[10px] mt-1 ${
                20 - [...mood].length <= 5 ? "text-red-400" : "text-white"
              }`}
            >
              {20 - [...mood].length} тэмдэгт бичих боломжтой
            </p>
          </div>
        ) : (
          <motion.p
            className="font-semibold text-center rounded-2xl -ml-4 -mt-2 px-2 py-1 w-30 text-white text-xs bg-black cursor-pointer"
            animate={{
              opacity: [1, 0.9, 1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
            onClick={() => setIsEditing(true)}
          >
            {mood || "Өнөөдөр би..."}
          </motion.p>
        )}
      </motion.div>

      {hasStories ? (
        <div className="p-[0.2rem] rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-full h-full">
          <Avatar className="w-full h-full">
            <AvatarImage
              className="rounded-full border-3 border-black object-cover"
              src={userData?.avatarImage || ""}
              alt="User Profile"
            />
            <AvatarFallback>Spotty</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Avatar className="w-full h-full">
          <AvatarImage
            className="rounded-full border-3 border-black object-cover"
            src={userData?.avatarImage || ""}
            alt="User Profile"
          />
          <AvatarFallback>Spotty</AvatarFallback>
        </Avatar>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          handleImageUpload({
            event: e,
            setLoading,
            fileInputRef,
            userData,
            setUserData,
          })
        }
        ref={fileInputRef}
        className="hidden"
        id="upload-input"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-1 right-3 w-6 h-6 rounded-full p-1 border-none shadow-none hover:underline focus-visible:ring-transparent"
            disabled={loading}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="dark">
          <label htmlFor="upload-input">
            <DropdownMenuItem>Аватар солих</DropdownMenuItem>
          </label>
          <a href="/story">
          <DropdownMenuItem>Стори хийх</DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditAvatar;
