"use client";

import LayoutComp from "@/components/LayoutComp";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutComp>{children}</LayoutComp>;
}
