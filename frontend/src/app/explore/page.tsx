"use client";

import { getUserAll } from "@/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Explore = () => {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const data = await getUserAll(userId);
        console.log(data, "data");
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <div className="w-full h-screen flex flex-col justify-start items-start px-8 md:px-10 lg:px-20 xl:px-40">
      <p className="text-2xl font-bold text-[var(--background)] mt-20">
        Explore friend
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-10 mt-10">
        {userData.toReversed().map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/${user.name}`)}
            className="w-full h-auto aspect-10/6 bg-[var(--background)]/20 hover:bg-[var(--background)]/25 backdrop-blur-sm rounded-3xl flex flex-col justify-start p-7 relative transition-all cursor-pointer"
          >
            <div className="w-full flex justify-between z-20">
              <div
                className={`h-18 w-auto aspect-square rounded-full bg-slate-400 bg-cover bg-center overflow-hidden bg-[url(${user?.avatarImage})]`}
              >
                <img
                  src={user?.avatarImage || "/nouser.jpg"}
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-3">
                <div className="h-fit py-2 px-4 bg-[var(--foreground)]/80 backdrop-blur-sm rounded-full text-[var(--background)] text-sm">
                  <p>👋 New</p>
                </div>
                <div className="h-fit py-2 px-4 bg-blue-600 hover:bg-blue-700 transition-all backdrop-blur-sm rounded-full text-[var(--background)] text-sm cursor-pointer font-semibold">
                  Дагах
                </div>
              </div>
            </div>
            <p className="text-[var(--background)] font-bold text-xl mt-4 hover:ml-0.5 transition-all">
              {user.name || "Sam Smith"}
            </p>
            <p className="text-[var(--background)]/50 text-sm">
              {user.moodStatus || "no status yet"}
            </p>
            <div className="w-full flex justify-start items-center gap-3 mt-4 -mb-2 overflow-hidden">
              <div className="py-2 px-4 bg-[var(--foreground)]/60 backdrop-blur-sm rounded-full text-[var(--background)] text-xs">
                <p>
                  {user?.friendsOf?.length === 0
                    ? "найзгүй"
                    : `${user?.friendsOf?.length} найз`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
