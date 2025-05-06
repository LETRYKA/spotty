import { ChevronDown } from 'lucide-react';
import { CirclePlus } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
const UpcomingHeader = () => {
    return (
        <div className='w-full flex justify-between'>
            <div className='flex gap-2 justify-center items-center text-white'>
                <h1 className='text-[28px] font-bold'>Upcoming</h1>
                <ChevronDown />
            </div>
            <div className='flex gap-3 justify-center items-center text-white'>         
                <CirclePlus className='h-[38px] w-[38px]'/>
                <Avatar className='h-[42px] w-[42px]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
export default UpcomingHeader;