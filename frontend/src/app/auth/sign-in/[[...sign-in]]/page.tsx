"use client";
import { SignIn } from "@clerk/nextjs";
import Banner from "/public/test.png";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-2/4 h-screen flex justify-center items-center">
        <SignIn
          routing="path"
          path="/auth/sign-in"
          signUpUrl="/auth/sign-up"
          afterSignUpUrl="/dashboard"
          redirectUrl="/dashboard"
        />
      </div>
      <div className="w-2/4 h-screen flex justify-center items-center py-4 px-6">
        <div
          className="w-full h-full bg-slate-400 rounded-4xl bg-cover bg-center"
          style={{
            backgroundImage: `url(${Banner.src})`,
          }}
        ></div>
      </div>
    </div>
  );
}
