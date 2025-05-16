"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserData } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Friendship {
  id: string;
  friendId: string;
  userId: string;
  status: string;
}

interface FriendCardProps {
  friend: any;
  onAvatarClick: (username: string) => void;
}

function FriendCard({ friend, onAvatarClick }: FriendCardProps) {
  return (
    <div className="w-full h-14 flex justify-between items-center mb-3">
      <div className="flex h-full items-center gap-4">
        <div
          className="h-full w-auto aspect-square bg-slate-400 rounded-full bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${friend.avatarImage})` }}
          onClick={() => onAvatarClick(friend.name)}
        />
        <div className="flex flex-col">
          <p className="text-[var(--background)] font-bold text-base">
            {friend.name || "-"}
          </p>
          <p className="text-[var(--background)]/50 text-sm -mt-1">
            {friend.moodStatus || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FriendsListProps {
  friends: any[];
  onAvatarClick: (username: string) => void;
  title?: string;
}

function FriendsList({ friends, onAvatarClick, title }: FriendsListProps) {
  if (friends.length === 0) return null;

  return (
    <div className="w-full mt-4">
      {title && <h3 className="text-[var(--background)]/70 text-sm mb-2">{title}</h3>}
      {friends.map((friend: any, idx: number) => (
        <FriendCard
          key={friend.id || idx}
          friend={friend}
          onAvatarClick={onAvatarClick}
        />
      ))}
    </div>
  );
}

export function FriendsDialog({
  friends,
  pendingFriends,
  profileUserId,
}: {
  friends: Friendship[];
  pendingFriends: Friendship[];
  profileUserId: string;
}) {
  const { user } = useUser();
  const router = useRouter();
  const [friendData, setFriendData] = useState<any[]>([]);
  const [pendingFriendData, setPendingFriendData] = useState<any[]>([]);

  const fetchFriends = async (friendships: Friendship[], isPending = false) => {
    if (!friendships.length) return [];
    try {
      const uniqueIds = new Set(
        friendships.map(f =>
          isPending ? f.userId : (f.userId === profileUserId ? f.friendId : f.userId)
        )
      );
      
      const results = await Promise.allSettled(
        Array.from(uniqueIds).map(id => getUserData(id).catch(() => null))
      );
      
      return results
        .map(r => r.status === 'fulfilled' ? r.value : null)
        .filter(Boolean);
    } catch (error) {
      console.error(`Error fetching ${isPending ? 'pending ' : ''}friends:`, error);
      return [];
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const [friendsList, pendingList] = await Promise.all([
        fetchFriends(friends),
        fetchFriends(pendingFriends, true)
      ]);
      setFriendData(friendsList);
      setPendingFriendData(pendingList);
    };
    loadData();
  }, [friends, pendingFriends, profileUserId]);

  const handleAvatarClick = (username: string) => {
    router.push(username === user?.username ? '/profile' : `/${username}`);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{friendData.length}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-[var(--foreground)]/10 backdrop-blur-2xl border-[var(--background)]/10 border-1 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[var(--background)]">Бүх найзууд</DialogTitle>
        </DialogHeader>

        {pendingFriendData.length > 0 && (
          <FriendsList
            friends={pendingFriendData}
            onAvatarClick={handleAvatarClick}
            title="Pending Requests"
          />
        )}

        {friendData.length > 0 && (
          <FriendsList
            friends={friendData}
            onAvatarClick={handleAvatarClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;