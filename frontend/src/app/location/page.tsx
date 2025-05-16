"use client";

import LiveLocation from "@/components/LocationTracker";
import LocationWeb from "./_web/Location";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import MapMobile from "./_mobile/Map";

const Location = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
  }

  if (!isSignedIn || !user || !user.id) {
    toast.error(`Хэрэглэгч олдсонгүй`);
  }

  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      <div>
        {user && isMobile ? (
          <>
            <MapMobile />
            <LiveLocation userId={user.id} />
          </>
        ) : user ? (
          <>
            <LocationWeb />
            <LiveLocation userId={user.id} />
          </>
        ) : null}
      </div>
      ;
    </>
  );
};

export default Location;
