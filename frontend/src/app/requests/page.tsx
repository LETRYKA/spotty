"use client"
import Header from "@/components/mobile/Header";
import AllRequest from "./_mobile/AllRequest";
const FriendRequests = () => {
    return (
        <div className="bg-[#141414] w-full h-screen px-[33px] py-[45px] 2xl:hidden xl:hidden lg:hidden">
            <Header />
            <AllRequest/>
        </div>
    )
}
export default FriendRequests;