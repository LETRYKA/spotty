"use client";
import { MobileOnboarding } from "./_mobile/MobileBoarding";
import { WebOnboarding } from "./_web/WebBoarding";
const Onboarding = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <MobileOnboarding/>
            {/* <WebOnboarding/> */}
        </div>
    )
}
export default Onboarding;