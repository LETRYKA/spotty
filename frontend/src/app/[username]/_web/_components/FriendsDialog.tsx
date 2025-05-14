"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserData, addFriend, removeFriend, cancelFriendRequest } from "@/lib/api";
import { toast } from "react-toastify";
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
  onAction: () => void;
  actionText: string;
  actionClass: string;
}

function FriendCard({ friend, onAvatarClick, onAction, actionText, actionClass }: FriendCardProps) {
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
      <Button onClick={onAction} className={actionClass}>
        {actionText}
      </Button>
    </div>
  );
}

interface FriendsListProps {
  friends: any[];
  onAvatarClick: (username: string) => void;
  onAction: (friendId: string) => void;
  actionText: string;
  actionClass: string;
  title?: string;
}

function FriendsList({ friends, onAvatarClick, onAction, actionText, actionClass, title }: FriendsListProps) {
  if (friends.length === 0) return null;

  return (
    <div className="w-full mt-4">
      {title && <h3 className="text-[var(--background)]/70 text-sm mb-2">{title}</h3>}
      {friends.map((friend: any, idx: number) => (
        <FriendCard
          key={friend.id || idx}
          friend={friend}
          onAvatarClick={onAvatarClick}
          onAction={() => onAction(friend.id)}
          actionText={actionText}
          actionClass={actionClass}
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
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    if (!user?.id) return;
    try {
      const data = await getUserData(user.id);
      if (data) setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    }
  };

  const fetchFriends = async (friendships: Friendship[], isPending = false) => {
    if (!friendships.length) return [];
    try {
      const ids = friendships.map(f =>
        isPending ? f.userId : (f.userId === profileUserId ? f.friendId : f.userId)
      );
      const results = await Promise.allSettled(
        ids.map(id => getUserData(id).catch(() => null))
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
    fetchUserData();
    fetchFriends(friends).then(setFriendData);
    fetchFriends(pendingFriends, true).then(setPendingFriendData);
  }, [user?.id, friends, pendingFriends, profileUserId]);

  const handleFriendAction = async (friendId: string, action: 'add' | 'remove' | 'cancel') => {
    if (!user?.id) return;
    try {
      const actions = {
        add: () => addFriend(friendId, user.id),
        remove: () => removeFriend(friendId, user.id),
        cancel: () => cancelFriendRequest(friendId, user.id)
      };
      await actions[action]();
      await fetchUserData();
      if (action === 'remove') setFriendData(prev => prev.filter(f => f.id !== friendId));
      if (action === 'cancel') setPendingFriendData(prev => prev.filter(f => f.id !== friendId));
      toast.success(action === 'add' ? "Friend request sent!" :
        action === 'remove' ? "Friend removed!" :
          "Request cancelled!");
    } catch (error) {
      console.error(`Error ${action}ing friend:`, error);
      toast.error(`Failed to ${action} friend`);
    }
  };

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

        <FriendsList
          friends={pendingFriendData}
          onAvatarClick={handleAvatarClick}
          onAction={(id) => handleFriendAction(id, 'cancel')}
          actionText="Cancel Request"
          actionClass="bg-red-600 hover:bg-red-700"
          title="Pending Requests"
        />

        <FriendsList
          friends={friendData}
          onAvatarClick={handleAvatarClick}
          onAction={(id) => handleFriendAction(id, 'remove')}
          actionText="✕ Remove"
          actionClass="bg-red-600 hover:bg-red-700"
        />
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;