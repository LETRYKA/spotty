"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { getUserByName } from "@/lib/api";
import { useEffect, useState } from "react";
import FriendsDialog from "./_components/FriendsDialog";
import EventCards from "@/app/profile/_web/_components/eventCards";

const ProfileWeb = () => {
  const { username } = useParams();
  interface UserData {
    backgroundImage: string;
    avatarImage: string;
    name: string;
    friendsOf: string[];
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(userData);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const user = await getUserByName(
        typeof username === "string" ? username : ""
      );
      setUserData(user);
      setIsLoading(false);
    };

    fetchUser();
  }, [username]);

  return (
    <>
      {userData && isLoading ? (
        <div>Loading</div>
      ) : (
        <div className="w-full h-auto flex flex-col items-center justify-center p-6">
          <div
            className="w-full h-80 bg-slate-400 rounded-3xl bg-cover bg-center"
            style={{
              backgroundImage: `url(${userData && userData.backgroundImage})`,
            }}
          ></div>
          <Avatar className="w-36 h-auto aspect-square -mt-16">
            <div className="w-full h-auto aspect-square rounded-full bg-gradient-to-br from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437]">
              <AvatarImage
                src={userData ? userData.avatarImage : ""}
                className="w-full h-full object-cover p-1 rounded-full"
              />
            </div>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col justify-center items-center mt-5">
            <p className="text-[var(--background)] text-4xl font-bold">
              {userData ? userData.name.toLowerCase() : "-"}
            </p>
            <p className="text-[var(--background)]/50 text-base mt-2">
              @{userData ? userData.name : ""} |{" "}
              <strong className="text-[var(--background)]">
                <FriendsDialog
                  friends={
                    userData && userData.friendsOf
                      ? userData.friendsOf.map((friend, index) => ({
                          id: `friend-${index}`,
                          friendId: friend,
                          userId: typeof username === "string" ? username : "",
                        }))
                      : null
                  }
                />
              </strong>{" "}
              friends
            </p>
            <div className="flex justify-center items-center gap-3 mt-6">
              <Button className="px-7 py-6 rounded-xl bg-blue-600 font-bold hover:bg-blue-700">
                Add friend
              </Button>
              <Button className="px-7 py-6 rounded-xl bg-[var(--background)]/10 font-bold">
                Explore more
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileWeb;
