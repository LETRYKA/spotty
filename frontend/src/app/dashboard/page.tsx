"use client";
import { UserButton, useAuth } from "@clerk/nextjs";

export default function Dashboard() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <p>Please sign in</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <UserButton />
    </div>
  );
}
