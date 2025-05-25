"use client";

import { ClerkProvider, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

const BY_PASS_PAGES = ["/auth/sign-in", "/auth/sign-up", "/home", "/invite"];
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider signInUrl="/auth/sign-in" signUpUrl="/auth/sign-up">
          <Content>{children}</Content>
        </ClerkProvider>
      </body>
    </html>
  );
}

const Content = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const isPassable =
    BY_PASS_PAGES.map((pagePath) => pathname.includes(pagePath)).filter(
      (cur) => cur
    ).length !== 0;

  useEffect(() => {
    if (!isLoaded) return; // Don't do anything while still loading
    if (!isPassable && !isSignedIn) {
      router.replace("/auth/sign-in");
    }
  }, [pathname, isLoaded, isSignedIn]);

  if (!isLoaded) return null; // Show nothing while loading
  if (isPassable || isSignedIn) return children;
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <div>Redirecting to sign in...</div>
      </SignedOut>
    </>
  );
};
