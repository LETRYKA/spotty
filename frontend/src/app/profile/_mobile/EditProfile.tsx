"use client";

import { ChevronLeft, Bell, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import VerifiedIcon from "@/img/icons8-verified-16.png";
import { SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Image as ImageIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

const EditProfile = () => {
  return (
    <div>
      <SheetContent
        side="right"
        className="w-screen h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
      >
        <SheetHeader className="p-0 m-0 border-none shadow-none bg-transparent">
          <DialogTitle className="flex w-full justify-between">
            <SheetClose>
              <span className="cursor-pointer p-2 rounded hover:bg-muted">
                <ChevronLeft className="text-white mr-9.25" />
              </span>
            </SheetClose>
            <div className="flex text-white text-[18px] font-bold items-center justify-center">
              Enji
              <Image
                src={VerifiedIcon}
                alt="verified"
                className="w-4 h-4 ml-1"
              />
            </div>
            <div className="flex gap-2.75 items-center justify-center">
              <Bell className="text-white w-[30px] h-[30px] bg-[#434343] rounded-full p-2" />
              <EllipsisVertical className="text-white w-4.5 h-4.5" />
            </div>
          </DialogTitle>
        </SheetHeader>

        {/* Body content */}
        <div
          className="w-full flex flex-col rounded-2xl h-26 mt-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://i.pinimg.com/1200x/b9/e6/da/b9e6da7fe10a7f908b68e552d44e15ee.jpg)`,
          }}
        ></div>
        <Avatar className="-mt-14 relative flex justify-center items-center">
          <AvatarImage
            className="rounded-full object-cover w-27 h-auto aspect-square bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
            src="https://i.pinimg.com/236x/fc/3d/2a/fc3d2ab28b96352bfe48a4a8ebed81f4.jpg"
            alt="User Profile"
          />
          <Link href={`/addstory`}>
            <div className="w-9 h-auto aspect-square bg-[var(--background)] rounded-full absolute -bottom-1 right-32 border-3 border-[#141414] flex justify-center items-center">
              <ImageIcon strokeWidth={3} width={15} />
            </div>
          </Link>
        </Avatar>
        <div className="mt-4 flex justify-center items-center flex-col">
          <p className="text-[var(--background)] text-2xl font-semibold">
            @Enjiiiiibn
          </p>
          <span className="text-[var(--background)]/50 text-sm font-light mt-1">
            Mood status here mf
          </span>
        </div>
      </SheetContent>
    </div>
  );
};

export default EditProfile;
