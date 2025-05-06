import { ChevronDown, Plus } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UpcomingHeader = () => {
  return (
    <div className="w-full flex justify-between p-8">
      <div className="flex gap-2 justify-center items-center text-white">
        <h1 className="text-2xl font-extrabold flex gap-2 items-center">
          Upcoming
          <ChevronDown className="w-6 text-[var(--background)]/50 mt-1 cursor-pointer" />
        </h1>
      </div>
      <div className="flex gap-4 justify-end items-center">
        <div className="w-9 h-auto aspect-square bg-[var(--background)] rounded-full flex justify-center items-center cursor-pointer">
          <Plus className="w-5 text-[var(--foreground)]" strokeWidth={3} />
        </div>
        <Avatar className="w-9 h-auto aspect-square cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
          <AvatarFallback>ANN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
export default UpcomingHeader;
