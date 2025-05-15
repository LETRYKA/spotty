"use client";

import ProfileWeb from "./_web/Profile";
import ViewUserProfileMobile from "./_mobile/Profile";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Profile() {
  const isMobile = useMediaQuery("(max-width:768px)");

  return <div>{isMobile ? <ViewUserProfileMobile /> : <ProfileWeb />}</div>;
}
