"use client";

import { UserRound, HomeIcon, Map, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import Notification from "@/components/Notification";

export type IconProps = React.HTMLAttributes<SVGElement>;

const DATA = {
  navbar: [
    { href: "/home", icon: HomeIcon, label: "Нүүр" },
    { href: "/location", icon: Map, label: "Spotty" },
    { href: "/profile", icon: UserRound, label: "Профайл" },
    { href: "#", icon: ArrowUpRight, label: "ФАКЮҮ" },
  ],
};

export function DockComp() {
  return (
    <div className="fixed bottom-14 w-full flex flex-col items-center justify-center z-40">
      <TooltipProvider>
        <Dock
          direction="middle"
          className="bg-[var(--foreground)]/50 backdrop-blur-xl rounded-full text-white border border-[var(--background)]/10"
        >
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-12 rounded-full"
                    )}
                  >
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Notification />
        </Dock>
      </TooltipProvider>
    </div>
  );
}
