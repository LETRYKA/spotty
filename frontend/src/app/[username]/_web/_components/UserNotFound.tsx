"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UserNotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-6">
      <img 
        src="https://i.pinimg.com/originals/df/bd/1d/dfbd1d84c4c68a5186b186e6a4488357.gif" 
        alt="404" 
        className="w-60 h-auto rounded-xl" 
      />
      <h1 className="text-4xl font-bold text-[var(--background)]">
        Хэрэглэгч олдсонгүй 😔
      </h1>
      <div className="flex gap-4">
        <Button
          onClick={() => router.push("/explore")}
          className="px-7 py-6 rounded-xl bg-blue-600 font-bold hover:bg-blue-700"
        >
          Explore Users
        </Button>
        <Button
          onClick={() => router.push("/")}
          className="px-7 py-6 rounded-xl bg-[var(--background)]/10 font-bold"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
} 