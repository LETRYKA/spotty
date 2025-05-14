"use client"
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
//create Event
export const createEvent = async (data: any, ownerId: string) => {
  try {
    const body = {
      ...data,
      ownerId,
    };

    console.log("📦 Request body:", JSON.stringify(body, null, 2));

    const response = await fetch(`${API_URL}/api/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Event error:", error);
    throw error;
  }
};