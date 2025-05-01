"use client"
// import { Chevron} from "lucide-react";
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
const FriendRequests = () => {
    return (
        <div className="w-full flex justify-between ">
            <div className='flex justify-between gap-3'>
                <div className="relative h-[60px] w-[60px]">
                    <Avatar className="absolute top-0 left-0">
                        <AvatarImage
                        className="rounded-full object-cover w-[40px] h-[40px]"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                    <Avatar className="absolute bottom-0 right-0">
                        <AvatarImage
                        className="rounded-full  w-[50px] h-[50px] object-cover"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className="font-bold text-[white] text-[13px]">Friend Requests</h1>
                    <p className="text-[10px] text-[white]/50">letryka +32 others</p>
                </div>
            </div>
            <div className="flex justify-center items-center ">
                <li className="text-[#346DFD]"></li>
                <ChevronRight className="text-white" />
            </div>
        </div>
    )
}
export default FriendRequests;