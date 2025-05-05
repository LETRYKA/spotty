"use client";
import EditCover from "./_components/editCover";
import EditProfile from "./_components/editProfile";
import EventCards from "./_components/eventCards";

const UserProfile = () => {
  return (
    <div className="w-full h-auto flex flex-col bg-[#141414] p-9">
      <EditCover/>
      <EditProfile/>
      <EventCards/>
    </div>
  );
};
export default UserProfile;
