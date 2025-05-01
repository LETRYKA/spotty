"use client"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react';
const AllFriends = () => {
    return (
        <div className="flex flex-col gap-[24px]">
            <h1 className="text-[white] text-[20px] font-bold">All Friends</h1>
            <div className="w-[full] flex justify-between">
                <div className="flex gap-3 ">
                    <Avatar className="">
                        <AvatarImage
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <h1 className=" text-[white] text-[13px]">LETRYKA</h1>
                        <p className="text-[10px] text-[white]/50">itsryka</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-center items-center" >
                    <Button className="bg-[#D9D9D9]/30 border-none text-[white] text-[11px] w-[85px] h-[34px]" variant="outline">Invite</Button>
                    <X className="text-[#939394]"/>
                </div>
            </div>
            <div className="w-[full] flex justify-between">
                <div className="flex gap-3 ">
                    <Avatar className="">
                        <AvatarImage
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <h1 className=" text-[white] text-[13px]">LETRYKA</h1>
                        <p className="text-[10px] text-[white]/50">itsryka</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-center items-center" >
                    <Button className="bg-[#D9D9D9]/30 border-none text-[white] text-[11px] w-[85px] h-[34px]" variant="outline">Invite</Button>
                    <X className="text-[#939394]"/>
                </div>
            </div>
            <div className="w-[full] flex justify-between">
                <div className="flex gap-3 ">
                    <Avatar className="">
                        <AvatarImage
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <h1 className=" text-[white] text-[13px]">LETRYKA</h1>
                        <p className="text-[10px] text-[white]/50">itsryka</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-center items-center" >
                    <Button className="bg-[#D9D9D9]/30 border-none text-[white] text-[11px] w-[85px] h-[34px]" variant="outline">Invite</Button>
                    <X className="text-[#939394]"/>
                </div>
            </div>
            <div className="w-[full] flex justify-between">
                <div className="flex gap-3 ">
                    <Avatar className="">
                        <AvatarImage
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                        />
                    </Avatar>
                    <div className="flex flex-col justify-center">
                        <h1 className=" text-[white] text-[13px]">LETRYKA</h1>
                        <p className="text-[10px] text-[white]/50">itsryka</p>
                    </div>
                </div>
                <div className="flex gap-3 justify-center items-center" >
                    <Button className="bg-[#D9D9D9]/30 border-none text-[white] text-[11px] w-[85px] h-[34px]" variant="outline">Invite</Button>
                    <X className="text-[#939394]"/>
                </div>
            </div>
        </div>
    )
}
export default AllFriends;