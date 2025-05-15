"use client";

import LayoutComp from "@/components/LayoutComp";
import { DockComp } from "@/components/Dock";
import { Toaster } from "sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComp>
      {children}
      <DockComp />
      <Toaster />
    </LayoutComp>
  );
}
