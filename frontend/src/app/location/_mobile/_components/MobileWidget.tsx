import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Search, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

interface MobileWidgetProps {
  cityName: string;
}

const MobileWidget = ({ cityName }: MobileWidgetProps) => {
  const router = useRouter();
  return (
    <div className="absolute inset-0 pointer-events-none">
      <p className="absolute left-6 top-4 text-3xl text-[var(--background)] font-bold underline-offset-1 w-60 pointer-events-none">
        {cityName || ""}
      </p>
      <div className="absolute w-full h-20 bottom-14 z-40 px-16 flex justify-center items-center gap-6">
        <div
          onClick={() => router.push(`/events`)}
          className="h-14 mt-6 w-auto aspect-square rounded-full bg-[var(--foreground)]/30 backdrop-blur-2xl flex justify-center items-center cursor-pointer hover:bg-[var(--foreground)]/50 transition-all pointer-events-auto"
        >
          <Search strokeWidth={3} className="w-4 stroke-[var(--background)]" />
        </div>
        <RainbowButton
          onClick={() => router.push(`/createEvent`)}
          className="h-16 w-auto aspect-square rounded-full text-3xl font-bold pointer-events-auto"
        >
          +
        </RainbowButton>
        <div
          onClick={() => router.push(`/profile`)}
          className="h-14 mt-6 w-auto aspect-square rounded-full bg-[var(--foreground)]/30 backdrop-blur-2xl flex justify-center items-center cursor-pointer hover:bg-[var(--foreground)]/50 transition-all pointer-events-auto"
        >
          <UserRound
            strokeWidth={3}
            className="w-4 stroke-[var(--background)]"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileWidget;
