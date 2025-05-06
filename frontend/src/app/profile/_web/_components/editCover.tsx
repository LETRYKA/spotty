import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/api";
import EditFriends from "./editFriends";
import { useUser } from "@clerk/nextjs";
import { User } from "../types/User";
import axios from 'axios';


const EditCover = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { user } = useUser();
  const userId = user?.id;

  const fetchUser = async (id: string) => {
    try {
      const data = await getUserData(id);
      setUserData(data);
      console.log("Successully fetch", data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);


  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-[319px] bg-[#8D8D8D] flex flex-col rounded-3xl relative">
        <Button className="absolute bottom-4 right-4">Edit Cover image</Button>
      </div>
      <div className="relative">
        <Avatar className="-mt-16  relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[128px] h-[128px]">
          <AvatarImage
            className="rounded-full border-3 border-black object-cover"
            src={userData?.avatarImage}
            alt="User Profile"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <img
          src="verified-badge-profile-icon-png-one.png"
          className="w-7 h-auto aspect-square absolute bottom-2 right-2"
        />
      </div>
      <p className="text-white font-extrabold text-4xl mt-4">{userData?.name}</p>
      <div className="text-white/50 mt-3 flex gap-4">
        <p className="text-base">
          @{userData?.name}
          <span className="text-white font-semibold">
            <EditFriends/>
          </span>{" "}
          friends
        </p>
      </div>
    </div>
  );
};
export default EditCover;
