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
import { getUserData, addFriend } from "@/lib/api";
import { toast } from "react-toastify";

export function FriendsDialog({
  friends,
}: {
  friends: { id: string; friendId: string; userId: string }[] | null;
}) {
  const { user } = useUser();
  const [friendData, setFriendData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);

  const fetchFriendsIfAvailable = async () => {
    if (friends && Array.isArray(friends) && friends.length > 0) {
      try {
        const friendIds = friends.map((friend) => friend.userId);
        const data = await Promise.all(friendIds.map((id) => getUserData(id)));
        setFriendData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching friend data:", error);
        setFriendData([]);
      }
    }
  };

  const fetchUserData = async () => {
    if (user?.id) {
      const data = await getUserData(user.id);
      setUserData(data);
    }
  };

  useEffect(() => {
    fetchFriendsIfAvailable();
  }, [friends]);

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const isFollowing = (targetUserId: string) => {
    return userData?.friendsOf?.some(
      (relation: any) => relation.userId === targetUserId
    );
  };

  const handleAddFriend = async (friendId: string) => {
    try {
      if (user?.id) {
        await addFriend(user.id, friendId);
        await fetchUserData();
        toast.success("Friend request sent!");
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  console.log(userData);
  console.log(friendData, "friendData");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-pointer">{friends?.length ?? 0}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px] bg-[var(--foreground)]/10 backdrop-blur-2xl border-[var(--background)]/10 border-1 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-[var(--background)]">
            Бүх найзууд
          </DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col justify-start items-center mt-6 gap-5">
          {friendData.length === 0 ? (
            <p>Sadly, user don't have a friend</p>
          ) : (
            friendData.map((friend: any, idx: number) => {
              const isMe = friend.id === user?.id;
              const iFollowThem = isFollowing(friend.id);

              return (
                <div
                  key={friend.id || idx}
                  className="w-full h-14 flex justify-between items-center"
                >
                  <div className="flex h-full items-center gap-4">
                    <div
                      className="h-full w-auto aspect-square bg-slate-400 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${friend.avatarImage})` }}
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

                  {!isMe && (
                    <Button
                      onClick={() => !iFollowThem && handleAddFriend(friend.id)}
                      className={`font-bold ${
                        iFollowThem
                          ? "bg-[var(--background)]/10 hover:bg-[var(--background)]/15"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {iFollowThem ? "✓ Дагаж байна" : "➕ Дагах"}
                    </Button>
                  )}
                </div>
              );
            })
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FriendsDialog;
