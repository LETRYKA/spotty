import { CircleX } from 'lucide-react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { Lock } from 'lucide-react';
  import { Button } from "@/components/ui/button"
  import { CircleCheck } from 'lucide-react';
const EventInfoDetails = () => {
    return (
        <div>
            <div className="flex w-full justify-between items-center">
                <CircleX className='text-white h-[35px] w-[35px]'/>
                <Avatar className='h-[40px] w-[40px]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className='flex flex-col w-full justify-center items-center pt-[230px]'>
                <Lock className='text-white'/>
                <h1 className='text-white font-bold text-[40px] w-[300px] text-center'>Typical girls night</h1>
                <p className='text-[white]/80 w-[150px] text-center'>19 May, 12pm
                Ulaanbaatar, kid100</p>
            </div>
            <div className='px-[60px] h-[50px]'>
                <div className='bg-[black] h-full w-full flex justify-between'>
                    <Button className='flex flex-col p-4'>
                        <CircleCheck /> Going
                    </Button>
                    <Button className='p-4'>
                        Not Going
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default EventInfoDetails;