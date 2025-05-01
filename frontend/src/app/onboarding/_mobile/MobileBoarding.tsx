"use client";

import Banner from "/public/Group2.png";
import { Button } from "@/components/ui/button";
// import BackPic from './pic/Group.png';
export const MobileOnboarding = () => {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center bg-red-400 border "
      style={{
        background:
          "linear-gradient(to bottom, #F8E6E3 54%, #E1E9F4 77%, #F4F1F4 100%)",
      }}
    >
    <img
      className="absolute h-[60%] top-20 object-cover"
      src={Banner.src} 
      alt="Banner Image"
    />
            <div className="absolute bottom-8 w-full">
                <div className="flex flex-col items-center gap-[33px] mb-[25px]">
                    <h1 className="text-9D9D9F text-[35px]">Spotty</h1>
                    <h1 className="text-[30px] font-bold bg-gradient-to-r from-[#3C91FA] via-[#E755D8] to-[#F98436] bg-clip-text text-transparent">
                        Дэлхийтэй танилц
                    </h1>
                </div>
                <div className="flex flex-col items-center gap-[13px] w-full px-[33px]">
                    <Button className="bg-[white] text-[black] border-[1px] rounded-[74.5px] h-[60px] p-[14px] w-full">Емэйлээр үргэлжлүүлэх</Button>
                    <Button className="bg-[black] text-[white] border-[1px] rounded-[74.5px] h-[60px] p-[14px] w-full">Алимаар үргэлжлүүэх</Button>
                </div>
              </div>
    </div>
  );
};
