"use client";

import { toast } from "react-toastify";
import { User } from "../types/User";
const API_URL = process.env.NEXT_PUBLIC_API_URL;


 export const handleSaveImg = async (user:User | null, updateStoreUserData: (data: Partial<User>)=> void) => {
  const userId = user?.id;

  if (!userId || !user) return;
  try {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        moodStatus: user.moodStatus,
      }),
    });

    if (!response.ok) {
      console.error("Failed to update user:", await response.text());
      return;
    }

    const updatedData = await response.json();
    updateStoreUserData(updatedData);
    toast.success("Profile updated successfully");
    console.log("User data updated:", updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error updating user:", error);
  }
};