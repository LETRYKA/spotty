"use client";

import { getUserAll, addFriend, cancelFriendRequest } from "@/lib/api";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Friendship {
  id: string;
  friendId: string;
  userId: string;
  status: string;
}

interface User {
  id: string;
  name: string;
  avatarImage: string;
  friendships?: Friendship[];
  moodStatus?: string;
  friendsOf?: User[];
}

const Explore = () => {
  const { user } = useUser();
  const router = useRouter();
  const userId = user?.id;
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingRequests, setPendingRequests] = useState<Set<string>>(
    new Set()
  );

  const filteredUsers = userData.filter((user) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleFollow = async (e: React.MouseEvent, targetUserId: string) => {
    e.stopPropagation(); // Prevent card click event
    if (!userId) return;

    try {
      if (pendingRequests.has(targetUserId)) {
        await cancelFriendRequest(targetUserId, userId);
        setPendingRequests((prev) => {
          const newSet = new Set(prev);
          newSet.delete(targetUserId);
          return newSet;
        });
        toast.success("Friend request cancelled!");
      } else {
        await addFriend(targetUserId, userId);
        setPendingRequests((prev) => new Set(prev).add(targetUserId));
        toast.success("Friend request sent!");
      }

      const updatedData = await getUserAll(userId);
      setUserData(updatedData);
    } catch (error) {
      console.error("Error handling friend request:", error);
      toast.error("Failed to process friend request");
    }
  };

  console.log(userData);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      try {
        const data = await getUserAll(userId);
        console.log(data, "data");
        setUserData(data);

        const pending = new Set<string>();
        data.forEach((user: User) => {
          const friendship = user.friendships?.find(
            (f: Friendship) =>
              (f.userId === userId || f.friendId === userId) &&
              f.status === "pending"
          );
          if (friendship) {
            pending.add(user.id);
          }
        });
        setPendingRequests(pending);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId]);

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start px-8 md:px-10 lg:px-20 xl:px-40">
      {/* Search */}
      {isSearchOpen && (
        <div className="absolute w-full h-screen bg-white/10 backdrop-blur-2xl flex justify-center items-start z-50 inset-0">
          <form
            onSubmit={handleSearch}
            className="w-[60rem] h-20 border-b border-white/30 flex justify-start items-center mt-50"
          >
            <input
              placeholder="Search spotty"
              className="w-full h-full outline-none text-3xl text-white font-semibold bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onKeyDown={handleKeyDown}
              autoFocus
            />
            <Search
              strokeWidth={2}
              className="w-10 stroke-white cursor-pointer"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
            />
          </form>
        </div>
      )}
      {/* END */}
      <div className="w-full flex justify-between items-center mt-20">
        <p className="text-2xl font-bold text-[var(--background)]">
          Explore friend
        </p>
        <Button
          onClick={() => setIsSearchOpen(true)}
          className="w-12 h-auto aspect-square rounded-full bg-[var(--background)]/20 backdrop-blur-xl"
        >
          <Search strokeWidth={3} />
        </Button>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-10 mt-10 mb-20">
        {(searchQuery ? filteredUsers : userData).toReversed().map((user) => (
          <div
            key={user.id}
            onClick={() => router.push(`/${user.name}`)}
            className="w-full h-60 bg-[var(--background)]/20 hover:bg-[var(--background)]/25 backdrop-blur-sm rounded-3xl flex flex-col justify-start p-7 relative transition-all cursor-pointer"
          >
            <div className="w-full flex justify-between z-20">
              <div
                className={`h-18 w-auto aspect-square rounded-full bg-slate-400 bg-cover bg-center overflow-hidden bg-[url(${user?.avatarImage})]`}
              >
                <img
                  src={user?.avatarImage || "/nouser.jpg"}
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-3">
                <div
                  onClick={(e) => handleFollow(e, user.id)}
                  className={`h-fit py-2 px-4 ${pendingRequests.has(user.id)
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-blue-600 hover:bg-blue-700"
                    } transition-all backdrop-blur-sm rounded-full text-[var(--background)] text-sm cursor-pointer font-semibold`}
                >
                  {pendingRequests.has(user.id) ? "Хүсэлт илгээсэн" : "Дагах"}
                </div>
              </div>
            </div>
            <p className="text-[var(--background)] font-bold text-xl mt-4 hover:ml-0.5 transition-all">
              {user.name || "Sam Smith"}
            </p>
            <p className="text-[var(--background)]/50 text-sm">
              {user.moodStatus || "no status yet"}
            </p>
            <div className="w-full flex justify-start items-center gap-3 mt-4 -mb-2 overflow-hidden">
              <div className="py-2 px-4 bg-[var(--foreground)]/60 backdrop-blur-sm rounded-full text-[var(--background)] text-xs">
                <p>
                  {user?.friendsOf?.length === 0
                    ? "😔"
                    : `${user?.friendsOf?.length} найз`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
