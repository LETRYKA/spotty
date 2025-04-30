"use client";
import { Button } from "@/components/ui/button"
export const MobileOnboarding = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            <div className="absolute bottom-8">
                <div className="flex flex-col items-center gap-[33px] mb-[25px]">
                    <h1 className="text-[9D9D9F] text-[35px]">Spotty</h1>
                    <h1 className="text-[30px] font-bold">Дэлхийтэй танилц</h1>
                </div>
                <div className="flex flex-col items-center gap-[13px]">
                    <Button className="bg-[white] text-[black] border-[1px] rounded-[74.5px] h-[60px] w-[370px]">Емэйлээр үргэлжлүүлэх</Button>
                    <Button className="bg-[black] text-[white] border-[1px] rounded-[74.5px] h-[60px] w-[370px]">Алимаар үргэлжлүүэх</Button>
                </div>
            </div>
        </div>
    )
}