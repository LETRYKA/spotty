import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Ellipsis } from 'lucide-react';
import { UserRound } from 'lucide-react';
import { UserRoundPlus } from 'lucide-react';
const GuestInfo = () => {
    return (
      <div>  
        <Drawer>
            <div className="w-full bg-[#28272A] border-1 border-[#28272A] rounded-2xl mt-7 p-4 cursor-pointer hover:bg-[#333235]">
              <div className="flex w-full justify-between items-center"> 
                <div className="flex gap-4 items-center">
                  <Avatar className="h-[40px] w-[40px]">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1"> 
                    <h1 className="text-white text-lg font-semibold">LETRYKA</h1>
                    <p className="text-white/56 text-[12px]">Mood status</p>
                  </div>
                </div>
                <DrawerTrigger asChild>
                <Ellipsis className="text-white/50"/>
                </DrawerTrigger>
              </div>
            </div>
          <DrawerContent className="bg-[#252526]">
            <div className="mx-auto w-full max-w-sm ">
            <DrawerTitle/>
              <DrawerFooter>
                <Button className="bg-[#404040] flex justify-start">
                  <UserRound />
                  View profile
                </Button>
                <Button className="bg-white text-black flex justify-start">
                  <UserRoundPlus className="text-black"/>
                  Add friend
                </Button>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )
}
export default GuestInfo;