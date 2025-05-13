"use client";

import { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from 'next/navigation';
import { getFriends } from '@/lib/api';
import { getPendingRequest } from '@/lib/api';
import { useUser } from "@clerk/nextjs";
import DefaultAvatar from "@/img/default_avatar.png";
import { set } from 'lodash';
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

const Friends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    const fetchFriends = async () => {
      const data = await getFriends(userId);
      const data1 = await getPendingRequest(userId);
      setPendingRequests(data1);
      setFriends(data);
      setLoading(false);
      console.log("data1",data1);
          console.log("data",data);
      
    };
    fetchFriends();
  }, [userId]);

  const handleClick = () => {
    router.push('/requests');
  };

  if (loading) {
    return <p className="text-white text-sm">Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {pendingRequests?.length > 0 && (
        <div
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            <Avatar className="relative h-[60px] w-[60px]">
              <AvatarImage
                className="rounded-full object-cover w-full h-full"
                src={pendingRequests[0]?.avatarImage || DefaultAvatar.src}
                alt={pendingRequests[0]?.name || 'User'}
              />
            </Avatar>
            {pendingRequests.length > 1 && (
              <div>
                <p className="text-xs text-white/70">
                  {pendingRequests[0]?.name} + {pendingRequests.length - 1} others
                </p>
              </div>
            )}

          </div>
          <ChevronRight className="text-white" />
        </div>)}


      <h1 className="text-white text-xl font-bold">Найзууд</h1>

      {friends.length === 0 ? (
        <p className="text-white/60 text-sm">Найз байхгүй.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Avatar>
                  <AvatarImage
                    className="rounded-full object-cover w-[50px] h-[50px]"
                    src={friend.avatarImage || DefaultAvatar.src}
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