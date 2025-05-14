import { Ellipsis, UserRound, UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addFriend } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DropDownProps {
  participant: {
    id: string;
    name: string;
    email: string;
    avatarImage?: string;
    phoneNumber?: string;
    isVerified: boolean;
    batteryLevel?: number;
    moodStatus?: string;
    backgroundImage?: string;

  };
}
export default function DropDown({ participant }: DropDownProps) {
  const { user } = useUser();
  const router = useRouter();

  const handleAddFriend = async () => {
    if (!user?.id) return;
    try {
      const response = await addFriend(user.id, participant.id);
      toast.success(`Амжилттай хүсэлт явууллаа 😊`);
    } catch (err) {
      console.error("Error occurred:", err);
      toast.error(`Өө алдаа гарлаа`);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="pr-2 stroke-white/50 w-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-56 bg-[var(--background)]/20 backdrop-blur-xl rounded-2xl border-[var(--background)]/20 p-2"
      >
        <DropdownMenuItem
          onClick={() => router.push(`/${participant.name}`)}
          className="hover:!bg-[var(--background)]/20 transition-all rounded-sm"
        >
          <UserRound strokeWidth={3} className="text-[var(--background)]" />
          <span className="text-[var(--background)]">View profile</span>
          <DropdownMenuShortcut className="text-[var(--background)]/50">
            ⇧⌘P
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleAddFriend}
          className="hover:!bg-[var(--background)]/20 transition-all rounded-sm cursor-pointer"
        >
          <UserRoundPlus strokeWidth={3} className="text-[var(--background)]" />
          <span className="text-[var(--background)]">Add friend</span>
          <DropdownMenuShortcut className="text-[var(--background)]/50">
            ⌘B
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
