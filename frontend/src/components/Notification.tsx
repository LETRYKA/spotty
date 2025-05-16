import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getPendingRequest, acceptFriend } from "@/lib/api";
import { useEffect, useState } from "react";

type FriendRequest = {
  id: string;
  name: string;
  moodStatus?: string;
  avatarImage?: string;
};

export function Notification() {
  const { user } = useUser();
  const userId = user?.id;
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAccept = async (friendId: string) => {
    if (!userId) return;
    await acceptFriend(friendId, userId);
    setPendingRequests((prev) => prev.filter((r) => r.id !== friendId));
  };

  useEffect(() => {
    const fetchPendingRequests = async () => {
      if (!userId) return;
      const requests = await getPendingRequest(userId);
      setPendingRequests(requests || []);
      setIsLoading(false);
    };
    fetchPendingRequests();
  }, [userId]);

  console.log(pendingRequests);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full h-full w-auto aspect-square bg-transparent hover:bg-[var(--background)] border-0"
        >
          <Bell strokeWidth={2} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] bg-[var(--foreground)]/50 backdrop-blur-xl rounded-3xl text-white border border-[var(--background)]/10">
        <DialogHeader>
          <DialogTitle>Мэдэгдэл</DialogTitle>
        </DialogHeader>

        <div className="w-full flex flex-col gap-4">
          {isLoading ? (
            <p className="text-center text-sm text-muted">Loading...</p>
          ) : pendingRequests.length === 0 ? (
            <p className="text-center text-sm text-muted">
              Мэдэгдэл алга байна.
            </p>
          ) : (
            pendingRequests.map((request) => (
              <div
                key={request.id}
                className="w-full p-3 bg-[#D9D9D9]/10 hover:bg-[#D9D9D9]/15 flex justify-between items-center rounded-2xl transition-all"
              >
                <div className="flex h-12 gap-3 items-center">
                  <div
                    className="h-full aspect-square rounded-full bg-cover bg-center bg-slate-300"
                    style={{
                      backgroundImage: `url(${
                        request.avatarImage || "/nouser.jpg"
                      })`,
                    }}
                  ></div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[var(--background)] text-base font-bold">
                      {request.name}
                    </p>
                    <p className="text-[var(--background)]/50 text-sm -mt-1">
                      {request.moodStatus || "No status"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={() => handleAccept(request.id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Accept
                </Button>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Notification;
