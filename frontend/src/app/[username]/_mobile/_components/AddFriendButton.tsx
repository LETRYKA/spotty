import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddFriendButtonProps {
  friendId: string;
  userId: string;
  refreshFriends: () => void;
  isFriend: boolean;
  requestPending: boolean;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  friendId,
  userId,
  refreshFriends,
  isFriend,
  requestPending,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestSent, setRequestSent] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`friendRequest-${friendId}`);
      if (saved === "true") return true;
      if (saved === "false") return false;
    }
    return requestPending;
  });

  useEffect(() => {
    setRequestSent(requestPending);
    localStorage.setItem(
      `friendRequest-${friendId}`,
      requestPending ? "true" : "false"
    );
  }, [requestPending, friendId]);

  const sendFriendRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/friends/request/${friendId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await res.json();

      if (res.status === 201) {
        setRequestSent(true);
        localStorage.setItem(`friendRequest-${friendId}`, "true");
        refreshFriends();
        toast.success("Friend request sent!");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const cancelFriendRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/friends/${friendId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await res.json();

      if (res.ok) {
        setRequestSent(false);
        localStorage.setItem(`friendRequest-${friendId}`, "false");
        refreshFriends();
        toast.success("Friend request canceled");
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (requestSent) {
      cancelFriendRequest();
    } else {
      sendFriendRequest();
    }
  };

  if (isFriend) {
    return (
      <Button disabled className="w-2/4 bg-green-600 h-12.25">
        Friends
      </Button>
    );
  }

  return (
    <div className="w-2/4">
      <Button
        className={`w-full h-12.25 ${
          requestSent ? "bg-red-600" : "bg-[#333333]"
        }`}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : requestSent ? "Request Sent" : "Add Friend"}
      </Button>
    </div>
  );
};

export default AddFriendButton;
