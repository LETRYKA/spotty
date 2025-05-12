import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// getUserData function
export const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};

// getFriendData function
export const getFriendData = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/api/friends/${userId}`, {
      headers: {
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};

// Create Event API
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

// Get categories data
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchEvent = async (eventId: string) => {
  try {
    const res = await axios.get(`${API_URL}/api/events/${eventId}`);
    return res.data.event;
  } catch (err) {
    console.error("Failed to fetch event:", err);
    return null;
  }
};

export const verifyPasscode = async (eventId: string, passcode: string) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/events/${eventId}/verify-passcode`,
      { passcode }
    );
    return res.data.valid;
  } catch (err) {
    console.error("Failed to verify passcode:", err);
    return false;
  }
};

export const joinEvent = async (eventId: string, userId: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/events/${eventId}/join`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.event;
  } catch (err) {
    console.error("Failed to join event:", err);
    return null;
  }
};

export const leaveEvent = async (eventId: string, userId: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/api/events/${eventId}/leave`,
      { userId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.event;
  } catch (err) {
    console.error("Failed to leave event:", err);
    return null;
  }
};

export const getEvents = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/api/events`);
    return data;
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
};

export const getFriends = async (userId: string) => {
  try {
    const { data } = await axios.get(`${API_URL}/api/friends/${userId}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch friends:", error);
    return [];
  }
};