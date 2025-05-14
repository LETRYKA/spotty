import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface AddFriendButtonProps {
  friendId: string;
  userId: string;
  refreshFriends: () => void;
}

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  friendId,
  userId,
  refreshFriends,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendFriendRequest = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/friends/request/${friendId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      const data = await res.json();

      if (res.status === 201) {
        refreshFriends();
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
    setIsLoading(false);
  };

  return (
    <div className="w-2/4">
      {isLoading ? (
        <Button className="bg-[#333333] w-full h-12.25" disabled>
          Loading...
        </Button>
      ) : (
        <Button
          className="bg-[#333333] w-full h-12.25"
          onClick={sendFriendRequest}
        >
          Add Friend
        </Button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default AddFriendButton;
