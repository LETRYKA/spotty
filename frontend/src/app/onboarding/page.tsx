"use client";
import { MobileOnboarding } from "./_mobile/MobileBoarding";
import { WebOnboarding } from "./_web/WebBoarding";
const Onboarding = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center h-screen"
            >
            <div className="w-full h-full 2xl:hidden"><MobileOnboarding/></div>
            {/* <div className="hidden 2xl:block"><WebOnboarding/></div> */}
        </div>
    )
}
export default Onboarding;