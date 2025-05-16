"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface Friend {
  id: string;
  name: string;
  email: string;
  avatarImage?: string;
  moodStatus?: string;
}

interface FriendsProps {
  profileUserId: string;
}

const Friends = ({ profileUserId }: FriendsProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!profileUserId) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/friends/${profileUserId}`);
        setFriends(res.data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [profileUserId]);

  const handleClick = () => {
    router.push("/requests");
  };

  if (loading) {
    return <p className="text-white text-sm">Loading friends...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-white text-xl font-bold">All Friends</h1>

      {friends.length === 0 ? (
        <p className="text-white/60 text-sm">No friends found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    className="rounded-full object-cover w-[50px] h-[50px]"
                    src={friend.avatarImage || "/default-avatar.png"}
                    alt={friend.name}
                  />
                </Avatar>
                <div className="flex flex-col">
                  <h1 className="text-white text-sm">{friend.name}</h1>
                  {friend.moodStatus && (
                    <p className="text-white/40 text-xs">{friend.moodStatus}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
