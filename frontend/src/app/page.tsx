"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

const ProfilePage = () => {
  const { getToken } = useAuth();

  const updateProfile = async () => {
    const token = await getToken();
    await axios.patch(
      "https://your-backend.com/api/user/profile",
      { phoneNumber: "1234567890", moodStatus: "Happy" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return <button onClick={updateProfile}>Update Profile</button>;
};

export default ProfilePage;
