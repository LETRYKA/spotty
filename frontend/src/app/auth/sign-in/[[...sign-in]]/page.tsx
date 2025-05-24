"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#EEEEEE]">
      <div className="w-2/4 h-screen flex flex-col justify-center items-center">
        <img src={`/logo-sd.png`} className="w-30 mb-10 flex lg:hidden" />
        <SignIn
          routing="hash"
          signUpUrl="/auth/sign-up"
          afterSignUpUrl={redirectUrl || "/location"}
          forceRedirectUrl={redirectUrl || "/location"}
        />
      </div>
      <div className="w-2/4 h-screen justify-center items-center py-4 px-6 hidden lg:flex">
        <div
          className="w-full h-full bg-slate-400 rounded-4xl bg-cover bg-center"
          style={{
            backgroundImage: `url(/23.png)`,
          }}
        ></div>
      </div>
    </div>
  );
}
