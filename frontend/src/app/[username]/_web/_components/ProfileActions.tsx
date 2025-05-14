"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProfileActionsProps {
  onAddFriend: () => void;
  onRemoveFriend: () => void;
  onCancelRequest: () => void;
  isFollowing: boolean;
  isPending: boolean;
}

export default function ProfileActions({
  onAddFriend,
  onRemoveFriend,
  onCancelRequest,
  isFollowing,
  isPending
}: ProfileActionsProps) {
  const router = useRouter();

  const handleFriendAction = () => {
    if (isFollowing) onRemoveFriend();
    else if (isPending) onCancelRequest();
    else onAddFriend();
  };

  const getButtonClass = () => {
    if (isFollowing || isPending) return "bg-red-600 hover:bg-red-700";
    return "bg-blue-600 hover:bg-blue-700";
  };

  const getButtonText = () => {
    if (isFollowing) return "✕ Remove";
    if (isPending) return "Cancel Request";
    return "Найз болох";
  };

  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <Button
        onClick={handleFriendAction}
        className={`px-7 py-6 rounded-xl font-bold ${getButtonClass()}`}
      >
        {getButtonText()}
      </Button>
      <Button
        onClick={() => router.push("/explore")}
        className="px-7 py-6 rounded-xl bg-[var(--background)]/10 font-bold"
      >
        Explore more
      </Button>
    </div>
  );
} 