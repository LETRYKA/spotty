'use client'

import { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useUser } from "@clerk/nextjs";

interface Friend {
  id: string;
  name: string;
  email: string;
  avatarImage?: string;
  phoneNumber?: string;
  isVerified: boolean;
  batteryLevel?: number;
  moodStatus?: string;
  backgroundImage?: string;
  locations: {
    lat: number;
    lng: number;
  }[];
}

const FriendRequests = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/friends/${userId}`);
        setFriends(res.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [userId, API_URL]);

  const handleClick = () => {
    router.push('/requests');
  };

  if (loading) {
    return <p className="text-white text-sm">Loading friends...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div
        className="w-full flex justify-between items-center cursor-pointer"
        onClick={handleClick}
      >
        <div className="flex items-center gap-3">
          <Avatar className="relative h-[60px] w-[60px]">
            <AvatarImage
              className="rounded-full object-cover w-full h-full"
              src={friends[0]?.avatarImage || '/default-avatar.png'}
              alt={friends[0]?.name || 'User'}
            />
          </Avatar>
          <div>
            <p className="text-xs text-white/70">
              {friends[0]?.name} + {friends.length - 1} others
            </p>
          </div>
        </div>
        <ChevronRight className="text-white" />
      </div>

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
                    src={friend.avatarImage || '/default-avatar.png'}
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
              <div className="flex gap-3 items-center">
                <Button
                  className="bg-white/20 border-none text-white text-xs w-[85px] h-[34px] transition hover:bg-white/30"
                  variant="outline"
                >
                  Invite
                </Button>
                <X className="text-gray-400 cursor-pointer hover:text-red-400 transition" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
