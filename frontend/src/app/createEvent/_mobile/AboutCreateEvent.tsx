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

const MAX_CHAR_LIMIT = 1000;

const AboutCreateEvent = () => {
  const [aboutText, setAboutText] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    if (inputValue.length <= MAX_CHAR_LIMIT) {
      setAboutText(inputValue);
    }
  };

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

        <DrawerContent className="bg-[#252526]">
          <div className="mx-auto w-full max-w-sm">
            <DrawerClose asChild className="flex justify-end p-0">
              <p className="text-[#0278FC] font-extrabold cursor-pointer ">Done</p>
            </DrawerClose>
            <DrawerHeader className="py-0 pb-4">
              <DrawerTitle className="text-[#FFFFFF]/50">About</DrawerTitle>
              <textarea
                placeholder="Tell your guests about your event."
                value={aboutText}
                onChange={handleInputChange}
                className="w-full h-[200px] mt-2 p-3 rounded-2xl bg-[#1f1f1f] text-white resize-none align-top
                focus:outline-none focus:ring-[#FFFFFF]/30 "
              />
              <p className="text-[#FFFFFF]/30 text-[12px] mt-1">
                Character Limit: {aboutText.length}/{MAX_CHAR_LIMIT}
              </p>
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AboutCreateEvent;
