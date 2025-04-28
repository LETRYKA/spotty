"use client";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";

const ProfilePage = () => {
  const { getToken } = useAuth();

  const updateProfile = async () => {
    const token = await getToken();
  };
  redirect(`/home`);
  return <button onClick={updateProfile}>Update Profile</button>;
};

export default ProfilePage;
