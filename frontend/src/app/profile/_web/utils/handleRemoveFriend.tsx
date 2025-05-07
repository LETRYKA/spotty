"use client";

import { toast } from "react-toastify";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const handleRemoveFriend = async (
  userId: string,
  friendId: string,
  onSuccess?: () => void
) => {
  if (!userId || !friendId) {
    toast.error("Invalid user or friend ID");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/friends/${friendId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to remove friend:", errorText);
      toast.error("Failed to remove friend");
      return;
    }

    toast.success("Friend removed successfully");
    if (onSuccess) onSuccess();
  } catch (error) {
    console.error("Error removing friend:", error);
    toast.error("An error occurred while removing friend");
  }
};
