import type { Metadata } from "next";
import { ClerkProvider, SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spotty",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <SignedOut>
            <SignIn routing="hash" />
          </SignedOut>
          <SignedIn>{children}</SignedIn>
        </ClerkProvider>
      </body>
    </html>
  );
}
