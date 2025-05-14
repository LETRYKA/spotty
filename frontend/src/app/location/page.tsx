"use client";

import LiveLocation from "@/components/LocationTracker";
import LocationWeb from "./_web/Location";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Location = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
  }

  if (!isSignedIn || !user || !user.id) {
    toast.error(`Хэрэглэгч олдсонгүй`);
  }

  return (
    <>
      <LocationWeb />
      {user && <LiveLocation userId={user.id} />}
    </>
  );
};

export default Location;
