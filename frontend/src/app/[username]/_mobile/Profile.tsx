"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getUserByName } from "@/lib/api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import HeaderMobileProfile from "./_components/Header";
import EventCardsMobile from "./_components/EventCardMobile";
import Friends from "./_components/Friends";
import Blackhole from "@/img/wallpapersden.com_black-hole-hd-digital_3840x1620.jpg";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import AddFriendButton from "./_components/AddFriendButton";

const ViewUserProfileMobile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<any | null>(null);
  const [friendsPageOpen, setFriendsPageOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchUser = async () => {
      try {
        const data = await getUserByName(
          typeof username === "string" ? username : ""
        );
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("userId");
      setCurrentUserId(storedUserId);
    }
  }, []);

  if (!userData) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile
        name={userData.name || "Unknown"}
        isVerified={userData.isVerified || false}
      />

      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <img
            src={userData?.backgroundImage || Blackhole.src}
            alt="Background"
            className="w-full h-26 rounded-3xl object-cover"
          />

          <div className="w-full flex justify-center">
            <div className="relative">
              <Avatar className="-mt-16 relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] to-[#F98437] w-[128px] h-[128px]">
                <AvatarImage
                  className="rounded-full border-3 border-black object-cover"
                  src={userData?.avatarImage || "/default-avatar.webp"}
                  alt="User Profile"
                />
                <AvatarFallback>
                  {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              {userData?.moodStatus && (
                <motion.div
                  className="flex gap-1 justify-center absolute items-center ml-30 -mt-[120px]"
                  animate={{
                    y: ["0%", "-10%", "0%"],
                    rotate: [0, 2, -2, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 2.8,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.7, 1],
                    delay: 0.3,
                  }}
                >
                  <motion.div
                    className="rounded-full w-2 h-2 bg-black -mb-4"
                    animate={{ y: [0, -2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                      repeatType: "mirror",
                    }}
                  />
                  <motion.div
                    className="rounded-full w-3 h-3 bg-black -mb-1 -ml-1"
                    animate={{ scale: [1, 1.2, 1], y: [0, -3, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "easeInOut",
                      repeatType: "mirror",
                      delay: 0.2,
                    }}
                  />
                  <motion.p
                    className="font-semibold text-center rounded-2xl -ml-4 -mt-2 px-2 py-1 w-30 text-white text-xs bg-black"
                    animate={{
                      opacity: [1, 0.9, 1],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: "easeInOut",
                    }}
                  >
                    {userData.moodStatus}
                  </motion.p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-17 flex justify-center items-center flex-col">
        <div className="text-white text-2xl">{userData?.name}</div>
        <span className="text-white opacity-50">@{userData?.name}</span>
      </div>

      <div className="flex justify-between w-70.25 mt-6.25">
        <div className="flex flex-col items-center cursor-pointer">
          <div className="text-white">
            {
              new Set(
                [...userData.friendships, ...userData.friendsOf]
                  .filter((f) => f.status === "accepted")
                  .map((f) =>
                    f.userId === userData.id ? f.friendId : f.userId
                  )
              ).size
            }
          </div>
          <div className="text-white opacity-50">Friends</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.events?.length ?? 0}</div>
          <div className="text-white opacity-50">Events</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-white">{userData.joinedEvents?.length ?? 0}</div>
          <div className="text-white opacity-50">Participated</div>
        </div>
      </div>

      <div className="flex w-full px-4 sm:px-10 gap-3 mt-10 justify-center items-center">
        <Button
          onClick={() => setFriendsPageOpen(true)}
          className="bg-[#333333] w-2/4 h-12.25"
        >
          Friends <ChevronDown className="ml-1 w-4 h-4" />
        </Button>
        {typeof currentUserId === "string" &&
          userData?.id &&
          currentUserId !== userData.id && (
            <AddFriendButton
              friendId={userData.id}
              userId={currentUserId}
              refreshFriends={() => setFriendsPageOpen(false)}
              isFriend={
                Array.isArray(userData.friendsOf) &&
                userData.friendsOf.some((f: any) => f.id === currentUserId)
              }
              requestPending={
                Array.isArray(userData.friendRequestsSent) &&
                userData.friendRequestsSent.some(
                  (r: any) => r.id === currentUserId
                )
              }
            />
          )}
      </div>

      <EventCardsMobile userId={userData.id} />

      {/* FRIENDS SHEET */}
      <Sheet
        open={friendsPageOpen}
        onOpenChange={(open) => setFriendsPageOpen(open)}
      >
        <SheetContent
          side="right"
          className="w-full h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
        >
          <SheetHeader className="border-none shadow-none bg-transparent">
            <div className="flex justify-between items-center w-full">
              <SheetClose asChild>
                <button
                  onClick={() => setFriendsPageOpen(false)}
                  className="w-20 flex items-center justify-start"
                >
                  <ChevronDown className="text-white hover:bg-muted rounded w-6 h-6" />
                </button>
              </SheetClose>
              <div className="flex items-center text-white font-bold text-lg">
                Friends List
              </div>
            </div>
            <DialogTitle className="sr-only">Friends List</DialogTitle>
          </SheetHeader>

          <div className="mt-4">
            <Friends
              friendships={[...userData.friendships, ...userData.friendsOf]}
              profileUserId={userData.id}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ViewUserProfileMobile;
