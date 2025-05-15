"use client";

import {
  ChevronLeft,
  Bell,
  EllipsisVertical,
} from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/img/icons8-verified-16.png";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useUser } from "@clerk/nextjs";
import { getUserData } from "@/lib/api";
import { useUserStore } from "@/app/profile/_web/store/userStore";
import { User } from "../../_web/types/User";
import { handleSave } from "../../_web/utils/handleSave";
import BackgroundImage from "@/img/wallpapersden.com_black-hole-hd-digital_3840x1620.jpg";
import DefaultAvatar from "@/img/default_avatar.png";

export interface EditProfileProps {
  open: boolean;
  onClose: () => void;
}

const DEFAULT_USER: User = {
  id: "",
  name: "",
  email: "",
  avatarImage: "",
  backgroundImage: null,
  batteryLevel: null,
  createdAt: new Date().toISOString(),
  phoneNumber: "",
  moodStatus: "",
  events: [],
  joinedEvents: [],
  friendsOf: [],
  friendships: [],
  locations: [],
  stories: [],
  isVerified: false,
};

const EditProfile: React.FC<EditProfileProps> = ({ open, onClose }) => {
  const [localUserData, setLocalUserData] = useState<User>(DEFAULT_USER);
  const { user } = useUser();
  const { setFullUserData, setUserData: updateStoreUserData } = useUserStore();

  useEffect(() => {
    if (user?.id) {
      getUserData(user.id)
        .then((data) => {
          setLocalUserData(data);
          setFullUserData(data);
        })
        .catch((err) => console.error("Failed to fetch user data:", err));
    }
  }, [user?.id]);

  const handleChange = (field: keyof User, value: string) => {
    setLocalUserData((prev) => ({ ...prev, [field]: value }));
  };

  const onSaveClick = async () => {
    await handleSave(localUserData, updateStoreUserData);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-full h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
      >
        <DialogTitle />
        <SheetHeader className="border-none shadow-none bg-transparent">
          <div className="flex justify-between items-center w-full">
            <SheetClose asChild>
              <button
                onClick={onClose}
                className="w-20 flex items-center justify-start"
              >
                <ChevronLeft className="text-white hover:bg-muted rounded w-6 h-6" />
              </button>
            </SheetClose>
            <div className="flex items-center text-white font-bold text-lg">
              {localUserData.name || "User"}
              <Image
                src={VerifiedIcon}
                alt="verified"
                className="ml-1 w-4 h-4"
              />
            </div>
            <div className="w-20 flex gap-3 justify-center items-center invisible">
              <Bell className="text-white w-7 h-7 bg-[#434343] rounded-full p-1.5" />
              <EllipsisVertical className="text-white w-5 h-5" />
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 min-h-0 overflow-y-auto">
          <div
            className="mt-8 h-26 rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage:
                localUserData.backgroundImage || `url(${BackgroundImage.src})`,
            }}
          />

          <div className="flex justify-center -mt-14">
            <Avatar className="relative flex justify-center items-center">
              <div className="rounded-full bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]">
                <AvatarImage
                  className="rounded-full w-28 h-28 object-cover"
                  src={localUserData.avatarImage || DefaultAvatar.src}
                  alt="User Profile"
                />
              </div>
            </Avatar>
          </div>

          <div className="mt-4 text-center">
            <p className="text-2xl font-semibold text-[var(--background)]">
              @{localUserData.name || "username"}
            </p>
            <span className="text-sm font-light text-[var(--background)]/50 mt-1 block">
              {localUserData.moodStatus || "Update your mood status"}
            </span>
          </div>

          <div className="py-10 text-white font-sans">
            <div className="max-w-md mx-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2c2c2c] rounded-xl p-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    Username
                  </label>
                  <input
                    className="bg-transparent text-sm w-full text-white focus:outline-none"
                    value={localUserData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="bg-[#2c2c2c] rounded-xl p-4">
                  <label className="block text-sm text-gray-400 mb-1">
                    Phone
                  </label>
                  <input
                    className="bg-transparent text-sm w-full text-white focus:outline-none"
                    value={localUserData.phoneNumber ?? ""}
                    onChange={(e) =>
                      handleChange("phoneNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="bg-[#2c2c2c] rounded-xl p-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Email
                </label>
                <input
                  className="bg-transparent text-sm w-full focus:outline-none text-gray-300"
                  value={localUserData.email}
                  disabled
                />
              </div>

              <button
                onClick={onSaveClick}
                className="bg-[#2c2c2c] w-full text-white text-sm px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
