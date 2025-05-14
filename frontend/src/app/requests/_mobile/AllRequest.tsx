"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import DefaultAvatar from "@/img/default_avatar.png";
import { getPendingRequest, acceptFriend } from "@/lib/api";
import { cancelFriendRequest } from "@/lib/api";
type FriendRequest = {
  id: string;
  name: string;
  avatarImage: string;
};

const AllRequest = () => {
  const { user } = useUser();
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?.id) return;
      setLoading(true);
      const data = await getPendingRequest(user.id);

      if (data && Array.isArray(data)) {
        setRequests(
          data.map((req: any) => ({
            id: req.id,
            name: req.name || "Unknown",
            avatarImage: req.avatarImage || DefaultAvatar.src,
          }))
        );
      }

      setLoading(false);
    };

    fetchRequests();
  }, [user?.id]);

  const handleConfirm = async (requesterId: string) => {
    if (!user) return;
    const result = await acceptFriend(requesterId, user.id);

    if (result !== null) {
      setRequests((prev) => prev.filter((r) => r.id !== requesterId));
    } else {
      alert("Failed to accept request.");
    }
  };


const handleDelete = async (requesterId: string) => {
  if (!user?.id) return;

  try {
    await cancelFriendRequest(requesterId, user.id);
    setRequests((prev) => prev.filter((r) => r.id !== requesterId));
  } catch (error) {
    console.error("Error deleting request:", error);
    alert("Failed to delete request.");
  }

  
};

  return (
    <div className="gap-6 flex flex-col mt-10">
      <h1 className="text-2xl font-bold text-white">All requests</h1>

      {loading ? (
        <p className="text-white text-sm">Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-white text-sm">No pending requests.</p>
      ) : (
        requests.map((req) => (
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
                <h1 className="text-white text-sm">{req.name}</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                className="bg-[#4B4AFE] text-white text-xs w-[85px] h-[34px]"
                onClick={() => handleConfirm(req.id)}
              >
                Confirm
              </Button>
              <Button
                className="bg-[#D9D9D9]/30 text-white text-xs w-[85px] h-[34px]"
                onClick={() => handleDelete(req.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllRequest;
