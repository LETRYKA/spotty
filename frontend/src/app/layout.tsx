"use client";

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname?.startsWith("/auth");
  const isHomePage = pathname === "/home";

  useEffect(() => {
    if (!isAuthPage && !isHomePage) {
      const isSignedIn = document.cookie.includes("__session");
      if (!isSignedIn) {
        router.replace("/auth/sign-in");
      }
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body>
        <ClerkProvider signInUrl="/auth/sign-in" signUpUrl="/auth/sign-up">
          {isAuthPage || isHomePage ? (
            children
          ) : (
            <>
              <SignedIn>{children}</SignedIn>
              <SignedOut>
                <div>Redirecting to sign in...</div>
              </SignedOut>
            </>
          )}
        </ClerkProvider>
      </body>
    </html>
  );
}
