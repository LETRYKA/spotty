"use client";
import UserProfile from "./_components/UserProfile";

const Profile = () => {
  return (
    <>
      <div className="w-full h-screen bg-[#141414] flex flex-col justify-center relative">
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
