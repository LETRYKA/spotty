"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/app/profile/_web/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "@/utils/Cloudinary";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditAvatar = () => {
  const { userData, setUserData } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.moodStatus) {
      setMood(userData.moodStatus);
    }
  }, [userData]);

  const handleBlur = async () => {
    setIsEditing(false);
  
    const userId = userData?.id;
    if (!userId) {
      toast.error("Хэрэглэгчийн ID олдсонгүй.");
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moodStatus: mood }),
      });
  
      if (!response.ok) {
        throw new Error("Сэтгэл хөдлөлийг хадгалах үед алдаа гарлаа.");
      }
  
      const updated = await response.json();
      setUserData(updated);
      toast.success("Сэтгэл хөдлөл амжилттай шинэчлэгдлээ.");
    } catch (error) {
      console.error("Mood update error:", error);
      toast.error("Сэтгэл хөдлөлийг шинэчлэх үед алдаа гарлаа.");
    }
  };

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await uploadImageToCloudinary(file);

      const userId = userData?.id;
      if (!userId) {
        toast.error("Хэрэглэгчийн ID олдсонгүй.");
        return;
      }

      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarImage: url }),
      });

      if (!response.ok) {
        toast.error("Аватар хадгалах үед алдаа гарлаа.");
        return;
      }

      const updated = await response.json();
      setUserData(updated);
      toast.success("Аватар амжилттай шинэчлэгдлээ.");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Зураг байршуулах үед алдаа гарлаа:", error);
      toast.error("Зураг upload амжилтгүй боллоо.");
    } finally {
      setLoading(false);
    }
  };

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
          <motion.input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="font-semibold text-center rounded-2xl -ml-4 -mt-2 px-2 py-1 w-30  text-white text-xs bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        ) : (
          <motion.p
            className="font-semibold text-center rounded-2xl -ml-4 -mt-2 px-2 py-1 w-30 text-white text-xs bg-black cursor-pointer"
            animate={{
              opacity: [1, 0.9, 1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.4,
              ease: "easeInOut",
            }}
            onClick={() => setIsEditing(true)}
          >
            {mood || "Set mood"}
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
            <AvatarFallback>SP</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Avatar className="w-full h-full">
          <AvatarImage
            className="rounded-full border-3 border-black object-cover"
            src={userData?.avatarImage || ""}
            alt="User Profile"
          />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleImgUpload}
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
          <DropdownMenuItem>Стори хийх</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default EditAvatar;