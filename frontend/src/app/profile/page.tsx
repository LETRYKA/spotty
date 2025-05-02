"use client";

import UserProfile from "./_web/UserProfile";
import UserProfileMobile from "./_mobile/UserProfileMobile";
import useMediaQuery from "@mui/material/useMediaQuery";

const Profile = () => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <div className="w-full h-screen bg-[#141414] flex flex-col justify-center relative">
      {isMobile ? <UserProfileMobile /> : <UserProfile />}
    </div>
  );
};

export default Profile;
