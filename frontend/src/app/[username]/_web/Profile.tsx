"use client";

import { useParams } from "next/navigation";
import {
  getUserByName,
  addFriend,
  removeFriend,
  cancelFriendRequest,
} from "@/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import UserNotFound from "./_components/UserNotFound";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileActions from "./_components/ProfileActions";
import FriendsDialog from "./_components/FriendsDialog";

interface UserData {
  id: string;
  backgroundImage: string;
  avatarImage: string;
  name: string;
  friendships: Array<{
    id: string;
    friendId: string;
    userId: string;
    status: string;
  }>;
}

export default function ProfileWeb() {
  const { username } = useParams();
  const { user } = useUser();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  const handleAddFriend = async () => {
    try {
      if (!user?.id || !userData?.id) return;
      await addFriend(userData.id, user.id);
      toast.success("Friend request sent!");
      const updatedUser = await getUserByName(
        typeof username === "string" ? username : ""
      );
      setUserData(updatedUser);
      console.log("After adding friend - Updated user data:", updatedUser);
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error("Failed to send friend request");
    }
  };

  const handleRemoveFriend = async () => {
    try {
      if (!user?.id || !userData?.id) return;
      await removeFriend(userData.id, user.id);
      toast.success("Friend removed successfully!");
      const updatedUser = await getUserByName(
        typeof username === "string" ? username : ""
      );
      setUserData(updatedUser);
    } catch (error) {
      console.error("Error removing friend:", error);
      toast.error("Failed to remove friend");
    }
  };

  const handleCancelRequest = async () => {
    try {
      if (!user?.id || !userData?.id) return;
      await cancelFriendRequest(userData.id, user.id);
      toast.success("Friend request cancelled!");
      const updatedUser = await getUserByName(
        typeof username === "string" ? username : ""
      );
      setUserData(updatedUser);
    } catch (error) {
      console.error("Error canceling friend request:", error);
      toast.error("Failed to cancel friend request");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await getUserByName(
          typeof username === "string" ? username : ""
        );
        if (!user) {
          setIsNotFound(true);
          return;
        }
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (isNotFound) return <UserNotFound />;
  if (isLoading || !userData) return <div>Loading</div>;

  const acceptedFriendships = userData.friendships.filter(
    (friendship) =>
      friendship.status === "accepted" &&
      (friendship.userId === userData.id || friendship.friendId === userData.id)
  );

  const pendingFriendships = userData.friendships.filter(
    (friendship) =>
      friendship.status === "pending" && friendship.friendId === userData.id
  );

  const isFollowing = userData.friendships.some(
    (friendship) =>
      (friendship.friendId === user?.id || friendship.userId === user?.id) &&
      friendship.status === "accepted"
  );

  const isPending = userData.friendships.some(
    (friendship) =>
      (friendship.friendId === user?.id || friendship.userId === user?.id) &&
      (friendship.friendId === userData.id ||
        friendship.userId === userData.id) &&
      friendship.status === "pending"
  );

  console.log("All friendships:", userData.friendships);
  console.log("Current user:", user?.id);
  console.log("Profile user:", userData.id);
  console.log("Is pending:", isPending);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center p-6">
      <ProfileHeader
        backgroundImage={userData.backgroundImage}
        avatarImage={userData.avatarImage}
        name={userData.name}
      />
      <div className="w-full flex flex-col justify-center items-center mt-5">
        <p className="text-[var(--background)] text-4xl font-bold">
          {userData.name.toLowerCase()}
        </p>
        <p className="text-[var(--background)]/50 text-base mt-2">
          @{userData.name} |{" "}
          <strong className="text-[var(--background)]">
            <FriendsDialog
              friends={acceptedFriendships}
              pendingFriends={pendingFriendships}
              profileUserId={userData.id}
            />
          </strong>{" "}
          friends
        </p>
        <ProfileActions
          onAddFriend={handleAddFriend}
          onRemoveFriend={handleRemoveFriend}
          onCancelRequest={handleCancelRequest}
          isFollowing={isFollowing}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
