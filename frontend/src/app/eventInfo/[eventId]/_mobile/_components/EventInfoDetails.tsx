  "use client";

  import { CircleX, X } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Lock } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { CircleCheck } from "lucide-react";
  import DirectionEvent from "./DirectionEvent";
  import GuestInfo from "./GuestInfo";
  import { fetchEvent } from "@/lib/api";
  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";
  import { Description } from "@radix-ui/react-dialog";
  import { useUser } from "@clerk/nextjs";
  import { getUserData } from "@/lib/api";
  import { useRouter } from "next/navigation";
  import { Earth } from 'lucide-react';


  interface Owner {
    avatarImage?: string;
    name? : string
  }

  interface EventData {
    description: string,
    owner: Owner,
    startAt: string,
    title: string,
    isPrivate: boolean,
    participantLimit: string,
    participants: Participant[];
  }
  interface Participant {
    userId: string;
    name: string;
    avatarImage: string;
    moodStatus: string;
  }
  interface User {
    avatarImage: string;
  }

  const EventInfoDetails = () => {
    const [eventData, setEventData] = useState<EventData | null>(null);
    const [userData, setLocalUserData] = useState<User | null>(null);
    const [isUserParticipant, setIsUserParticipant] = useState(false);
    // const [private, setPrivate] = useState<EventData | null>(null)
    const params = useParams();
    const eventId = params?.eventId as string;
    const { user } = useUser();
    const userId = user?.id;
    const router = useRouter()
      useEffect(() => {
        if (!eventId) return;
        const getEvent = async () => {
          try {
            const data = await fetchEvent(eventId);
            if (data) {
            setEventData({
              description: data.description,
              owner: data.owner,
              startAt: data.startAt,
              title: data.title,
              isPrivate: data.isPrivate,
              participantLimit: data.participantLimit,
              participants: data.participants
            });      
            }   
          } catch (error) {
            console.error("Failed to load event data", error);
          }
        };
        getEvent();
      }, [eventId]);
          useEffect(() => {
              const fetchUser = async (id: string) => {
                try {
                  const data = await getUserData(id);
                  console.log(data,"datauser");
                  
                  setLocalUserData(data);
                } catch (error) {
                  console.error("Error fetching user data:", error);
                }
              };
              if (userId) {
                fetchUser(userId);
              }
            }, [userId]);
        useEffect(() => {
          if (eventData && userId) {
            console.log("Participants array:", eventData.participants);

            eventData.participants?.forEach((participant: any, index: number) => {
              console.log(participant.id);
            });
            const found = eventData.participants?.some(
              (participant: any) => participant.id === userId
            );
            console.log("Current userId:", userId);
            console.log("Is current user a participant?", found);
            setIsUserParticipant(found);
          }
        }, [eventData, userId]);
    return (
      <div className="w-full h-auto flex flex-col justify-center p-9">
        <div className="flex w-full justify-between items-center z-40">
          <div className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
            <X className="w-4 text-[var(--background)]" strokeWidth={3} onClick={() => router.back()}/>
          </div>
          <Avatar className="w-9 h-auto aspect-square">
            <AvatarImage src={userData?.avatarImage} alt="@shadcn" onClick={() => router.replace("/profile")}/>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full justify-center items-center mt-70">
          <div className="w-9 h-auto aspect-square bg-[var(--background)]/30 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
            {eventData?.isPrivate ? (
              <Lock className="w-4 text-[var(--background)]" strokeWidth={3} />
            ) : (
              <Earth className="w-4 text-[var(--background)]" strokeWidth={3} />
            )}
          </div>
          <h1 className="text-white font-extrabold text-5xl text-center">
            {eventData?.title}
          </h1>
          <p className="text-[white]/70 text-sm text-center px-28 mt-6">
            {eventData?.startAt}
          </p>
        </div>
        <div className="w-full mt-10">
          <div className="w-full bg-[#0A0A0B] border-1 border-[#1D1D1D] rounded-full flex justify-between items-center p-2 ">
            <Button
              disabled={!isUserParticipant}
              className={`flex flex-col items-center text-sm font-extrabold rounded-full gap-0 w-[150px] py-6 
                ${isUserParticipant 
                  ? "text-[#00C655] bg-[var(--background)] hover:bg-[var(--background)]"
                  : "text-[#5a5a5a] bg-[#1A1A1A] cursor-not-allowed"}`}
            >
              <CircleCheck />
              Going
            </Button>
            <Button
              disabled={!isUserParticipant}
              className={`flex flex-col items-center text-sm font-extrabold rounded-full rounded-2 gap-0 w-[150px] py-6 
                ${!isUserParticipant 
                  ? "text-[#5a5a5a] bg-[#1A1A1A] cursor-not-allowed"
                  : "text-[var(--background)]/50 bg-[#0A0A0B] hover:bg-[#0A0A0B]"}`}
            >
              <CircleX />
              Not going
            </Button>
          </div>
        </div>
        <div className="w-full bg-[#0A0A0B] border-1 border-[#1b1b1b] rounded-2xl mt-10 p-7">
          <div className="w-full flex flex-col justify-center items-center gap-2">
          <Avatar>
            <AvatarImage src={eventData?.owner?.avatarImage} alt="@shadcn" onClick={() => router.push(`/${eventData?.owner?.name}`)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            <p className="text-xs text-[var(--background)]/50">
              Hosted by{" "}
              <strong className="text-[var(--background)]">{eventData?.owner?.name}</strong>
            </p>
          </div>
          <p className="text-xs text-[var(--background)]/50 mt-4">About</p>
          <p className="text-sm text-[var(--background)] mt-2">
            {eventData?.description}
          </p>
        </div>
        <DirectionEvent/>
        <div className="w-full flex justify-between mt-5">
          <div className="text-white">
            Guest list {eventData?.participants ? Object.keys(eventData.participants).length : 0}/{eventData?.participantLimit ?? 0}
          </div>
          {/* <h1 className="text-[#F45B69]">Full</h1> */}
        </div>
        <GuestInfo/>
      </div>
    );
  };
  export default EventInfoDetails;
