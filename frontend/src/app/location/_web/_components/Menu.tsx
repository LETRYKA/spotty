import { Ellipsis, UserRound, UserRoundPlus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ellipsis className="pr-2 stroke-white/50 w-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-56 bg-[var(--background)]/20 backdrop-blur-xl rounded-2xl border-[var(--background)]/20 p-2"
      >
        <DropdownMenuItem className="hover:!bg-[var(--background)]/20 transition-all rounded-sm">
          <UserRound strokeWidth={3} className="text-[var(--background)]" />
          <span className="text-[var(--background)]">View profile</span>
          <DropdownMenuShortcut className="text-[var(--background)]/50">
            ⇧⌘P
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:!bg-[var(--background)]/20 transition-all rounded-sm">
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
