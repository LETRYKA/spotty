"use client";
import { useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { acceptFriend } from "@/lib/api"; // <-- your helper function

type FriendRequest = {
  id: string;
  name: string;
  avatarImage: string;
};

const AllRequest = () => {
  const { user } = useUser();

  const [requests, setRequests] = useState<FriendRequest[]>([
    {
      id: "",
      name: "",
      avatarImage: "https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg",
    },
  ]);

  const handleConfirm = async (requesterId: string) => {
    if (!user) return;

    const result = await acceptFriend(requesterId, user.id);
    if (result !== null) {
      setRequests((prev) => prev.filter((r) => r.id !== requesterId));
    } else {
      alert("Failed to accept request.");
    }
  };

  const handleDelete = (requesterId: string) => {
    // Optional API call if you're supporting rejection
    setRequests((prev) => prev.filter((r) => r.id !== requesterId));
  };

  return (
    <div className="gap-[24px] flex flex-col mt-[40px]">
      <h1 className="text-[24px] font-bold text-white">All requests</h1>
      {requests.map((req) => (
        <div key={req.id} className="w-full flex justify-between items-center">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage
                className="rounded-full object-cover w-[50px] h-[50px]"
                src={req.avatarImage}
                alt={req.name}
              />
            </Avatar>
            <div className="flex flex-col justify-center">
              <h1 className="text-white text-[13px]">{req.name}</h1>
            </div>
          </div>
          <div className="flex gap-3 justify-center items-center">
            <Button
              className="bg-[#4B4AFE] text-white text-[11px] w-[85px] h-[34px]"
              onClick={() => handleConfirm(req.id)}
            >
              Confirm
            </Button>
            <Button
              className="bg-[#D9D9D9]/30 text-white text-[11px] w-[85px] h-[34px]"
              onClick={() => handleDelete(req.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRequest;
