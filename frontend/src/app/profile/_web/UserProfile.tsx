"use client";

import { useEffect, useState } from "react";
import EditCover from "./_components/editCover";
import EditProfile from "./_components/editProfile";
import EventCards from "./_components/eventCards";
import { Skeleton } from "@/components/ui/skeleton";

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-auto flex flex-col bg-[#141414] p-9 space-y-6">
      {isLoading ? (
        <Skeleton className="w-full flex justify-center items-center h-64 rounded-xl" />
      ) : (
        <EditCover />
      )}

      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-x-4">
          <Skeleton className="w-24 h-24 flex justify-center items-center rounded-full" />
          <div className="flex flex-col justify-center items-center mt-5 space-y-2">
            <Skeleton className="w-48 h-4" />
            <Skeleton className="w-32 h-4" />
          </div>
        </div>
      ) : (
        <EditProfile />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : (
        <EventCards />
      )}
    </div>
  );
};

export default UserProfile;