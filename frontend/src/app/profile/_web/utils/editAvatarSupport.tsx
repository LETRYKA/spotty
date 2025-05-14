import { useEffect } from "react";
import { toast } from "react-toastify";
import { uploadImageToCloudinary } from "@/utils/Cloudinary";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useSyncMoodFromUserData = (
  userData: any,
  setMood: (value: string) => void
) => {
  useEffect(() => {
    if (userData?.moodStatus) {
      setMood(userData.moodStatus);
    }
  }, [userData, setMood]);
};

export const handleMoodBlur = async ({
  userData,
  mood,
  setIsEditing,
  setUserData,
}: {
  userData: any;
  mood: string;
  setIsEditing: (value: boolean) => void;
  setUserData: (data: any) => void;
}) => {
  setIsEditing(false);
  const trimmedMood = mood.trim();
  const currentMood = (userData?.moodStatus ?? "").trim();
  if (trimmedMood === currentMood) {
    return;
  }

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
    toast.success("Амжилттай шинэчиллээ");
  } catch (error) {
    console.error("Mood update error:", error);
    toast.error("Сэтгэл хөдлөлийг шинэчлэх үед алдаа гарлаа.");
  }
};

export const handleImageUpload = async ({
  event,
  setLoading,
  fileInputRef,
  userData,
  setUserData,
}: {
  event: React.ChangeEvent<HTMLInputElement>;
  setLoading: (value: boolean) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  userData: any;
  setUserData: (data: any) => void;
}) => {
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
