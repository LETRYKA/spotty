import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <div className="absolute w-full h-30 z-50 flex justify-between items-center px-30 top-0">
      <div className="h-full flex justify-start items-center gap-10">
        <p className="text-2xl font-bold text-[var(--background)]">spotty.</p>
        <ul className="ml-10 flex items-center gap-8">
          <Link href={`/home`}>
            <li className="text-base text-[var(--background)] font-semibold cursor-pointer hover:text-[var(--background)]/70 transition-all duration-200">
              Home
            </li>
          </Link>
          <Link href={`/location`}>
            <li className="text-base text-[var(--background)] font-semibold cursor-pointer hover:text-[var(--background)]/70 transition-all duration-200">
              Location
            </li>
          </Link>
          <Link href={`https://github.com/LETRYKA/spotty`} target="_blank">
            <li className="text-base text-[var(--background)] font-semibold cursor-pointer hover:text-[var(--background)]/70 transition-all duration-200">
              Github
            </li>
          </Link>
          <Link href={`/home`}>
            <li className="text-base text-[var(--background)] font-semibold cursor-pointer hover:text-[var(--background)]/70 transition-all duration-200">
              FAQ
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-4">
        <SignedOut>
          <div className="bg-[var(--background)] hover:bg-[var(--background)]/90 rounded-full py-2 px-6 font-medium cursor-pointer transition-all">
            <SignInButton />
          </div>
          <div className="bg-[var(--background)] hover:bg-[var(--background)]/90 rounded-full py-2 px-6 font-medium cursor-pointer transition-all">
            <SignUpButton />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
