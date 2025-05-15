"use client";

import LayoutComp from "@/components/LayoutComp";
import { DockComp } from "@/components/Dock";

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutComp>
        {children}
        <DockComp />
      </LayoutComp>;
}