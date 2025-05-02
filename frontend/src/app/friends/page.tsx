"use client"
import Header from "@/components/mobile/Header";
import FriendRequests from "./_mobile/FriendRequests";
import AllFriends from "./_mobile/AllFriends";
const Friends = () => {
    return (
        <div className="bg-[#141414] h-screen w-full px-[33px] py-[45px] 2xl:hidden xl:hidden lg:hidden">
            <Header />
            <div className="py-[30px]">
                <FriendRequests/>
            </div>
            <AllFriends/>
        </div>
    )
}
export default Friends;