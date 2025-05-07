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
const GuedtInfo = () => {
    return (
<div>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="w-full bg-[#28272A] border-1 border-[#28272A] rounded-2xl mt-7 p-7 cursor-pointer hover:bg-[#333235] transition">
            <div className="w-full flex flex-col justify-center items-center gap-2">
              <div className="w-8 h-auto aspect-square bg-slate-400 rounded-full"></div>
              <p className="text-xs text-[var(--background)]/50">
                Hosted by{" "}
                <strong className="text-[var(--background)]">LETRYKA</strong>
              </p>
            </div>
            <p className="text-xs text-[var(--background)]/50 mt-4">About</p>
            <p className="text-sm text-[var(--background)] mt-2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since.
            </p>
          </div>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>Set your daily activity goal.</DrawerDescription>
            </DrawerHeader>

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
              </div>
            </div>

            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
    )
}
export default GuedtInfo;