"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchEvent } from "@/lib/api";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Ellipsis, UserRound, UserRoundPlus } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getUserAll } from "@/lib/api";
import { log } from "node:console";
interface Participant {
  name: string;
  avatarImage: string;
  moodStatus: string;
}

const GuestInfo = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const params = useParams();
  const eventId = params?.eventId as string;
  const router = useRouter()

  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!eventId) return;

    const getEvent = async () => {
      try {
        const data = await fetchEvent(eventId);
        console.log(data, "data");
        
        if (data?.participants) {
          setParticipants(data.participants);
        }
      } catch (error) {
        console.error("Failed to load event data", error);
      }
    };

    getEvent();
  }, [eventId]);

    useEffect(() => {
      const fetchUserData = async () => {
        if (!userId) return;
        try {
          const data = await getUserAll(userId);
          console.log(data, "data ahahha")
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
    <div>
      {participants.map((participant, index) => (
        <Drawer key={index}>
          <div className="w-full bg-[#28272A] border border-[#28272A] rounded-2xl mt-3 p-4 cursor-pointer hover:bg-[#333235]">
            <div className="flex w-full justify-between items-center">
              <div className="flex gap-4 items-center">
                <Avatar className="h-[40px] w-[40px]">
                  <AvatarImage src={participant.avatarImage} alt={participant.name} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h1 className="text-white text-lg font-semibold">{participant.name}</h1>
                  <p className="text-white/56 text-[12px]">{participant.moodStatus}</p>
                </div>
              </div>
              <DrawerTrigger asChild>
                <Ellipsis className="text-white/50 cursor-pointer" />
              </DrawerTrigger>
            </div>
          </div>

          <DrawerContent className="bg-[#252526]">
            <div className="mx-auto w-full max-w-sm">
              <DrawerTitle />
              <DrawerFooter>
                <Button
                  className="bg-[#404040] flex justify-start gap-2"
                  onClick={() => router.push(`/${participant?.name}`)} 
                >
                  <UserRound />
                  View profile
                </Button>
                <Button className="bg-white text-black flex justify-start gap-2">
                  <UserRoundPlus />
                  Add friend
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
};

export default GuestInfo;
