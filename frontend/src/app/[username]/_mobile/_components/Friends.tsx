"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUserData } from "@/lib/api";

interface Friendship {
  id: string;
  friendId: string;
  userId: string;
  status: string;
}

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
  locations?: {
    lat: number;
    lng: number;
  }[];
}

interface FriendsProps {
  friendships?: Friendship[];
  profileUserId?: string;
}

const Friends = ({ friendships = [], profileUserId }: FriendsProps) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  const fetchFriends = async (friendships: Friendship[]) => {
    if (!friendships.length) return [];
    try {
      const uniqueIds = new Set(
        friendships.map((f) =>
          f.userId === profileUserId ? f.friendId : f.userId
        )
      );

      const results = await Promise.allSettled(
        Array.from(uniqueIds).map((id) => getUserData(id).catch(() => null))
      );

      return results
        .map((r) => (r.status === "fulfilled" ? r.value : null))
        .filter(Boolean);
    } catch (error) {
      console.error("Error fetching friends:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadFriends = async () => {
      setLoading(true);
      const acceptedFriendships = friendships.filter(
        (f) => f.status === "accepted"
      );
      const friendsList = await fetchFriends(acceptedFriendships);
      setFriends(friendsList);
      setLoading(false);
    };

    loadFriends();
  }, [friendships, profileUserId]);

  const handleClick = () => {
    router.push("/requests");
  };

  if (loading) {
    return <p className="text-white text-sm">Loading friends...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {!friendships && friends.length > 0 && (
        <div
          className="w-full flex justify-between items-center cursor-pointer"
          onClick={handleClick}
        >
          <div className="flex items-center gap-3">
            <Avatar className="relative h-[60px] w-[60px]">
              <AvatarImage
                className="rounded-full object-cover w-full h-full"
                src={friends[0]?.avatarImage || "/default-avatar.png"}
                alt={friends[0]?.name || "User"}
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
      )}

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
                    src={friend.avatarImage || "/default-avatar.webp"}
                    alt={friend.name}
                  />
                  <AvatarFallback>
                    {friend.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
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
