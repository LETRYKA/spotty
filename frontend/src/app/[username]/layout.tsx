"use client";

import LayoutComp from "@/components/LayoutComp";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LayoutComp>{children}</LayoutComp>;
}
