"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UnfAlert from "./unfAlert";
import { getFriendData } from "@/lib/api";
import { useEffect, useState } from "react";
import { User } from "../types/User";
import { useUser } from "@clerk/nextjs";
import { Separator } from "@/components/ui/separator";

const EditFriends = ({ friendIds }: { friendIds: string[] }) => {
  const [friendsData, setFriendsData] = useState<User[]>([]);

  const { user } = useUser();
  const userId = user?.id;

  const fetchFriends = async (id: string) => {
    try {
      const data = await getFriendData(id);
      setFriendsData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {
    if (userId) {
      fetchFriends(userId);
    }
  }, [userId]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-base font-semibold bg-transparent hover:bg-transparent border-none shadow-none hover:underline focus-visible:ring-transparent"
        >
          {friendIds.length > 0 ? `${friendIds.length}` : "Чи ганцаараа"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-white">Friend request</DialogTitle>
        </DialogHeader>
        <Separator/>
        <DialogHeader>
          <DialogTitle className="text-white">All friends</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4 items-start justify-center">
          {friendsData.length === 0 ? (
            <p className="text-white">No friends yet</p>
          ) : (
            friendsData.map((friendsData) => {
              const key =
                friendsData.id || `friend-${friendsData.name}-${Math.random()}`;
              return (
                <div
                  key={key}
                  className="flex flex-row gap-4 items-center justify-center w-full"
                >
                  <Avatar className="rounded-full w-[58px] h-[58px]">
                    {friendsData.avatarImage ? (
                      <AvatarImage
                        className="rounded-full object-cover"
                        src={friendsData.avatarImage}
                      />
                    ) : (
                      <AvatarFallback>Spotty</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col justify-center items-start">
                    <p className="text-white text-sm">{friendsData.name}</p>
                    <p className="text-white/50 text-[10px]">
                      @{friendsData.name}
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="ml-auto bg-[#D9D9D9]/30 text-white hover:bg-[#141414] hover:text-white/50 border-none shadow-none text-sm font-semibold">
                        Invite
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="dark p-10">
                      <DialogHeader>
                        <DialogTitle className="text-3xl text-white flex justify-center items-center">Тун удахгүй😅</DialogTitle>
                      </DialogHeader>
                      <img src={`/amjihgui.jpeg`} className=""/>
                      <p className="text-3xl text-white flex justify-center items-center">Амжкуээшдэээ 😭</p>
                    </DialogContent>
                  </Dialog>
                  <DialogClose asChild>
                    {userId && friendsData.id && (
                      <UnfAlert userId={userId} friendId={friendsData.id} />
                    )}
                  </DialogClose>
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditFriends;
