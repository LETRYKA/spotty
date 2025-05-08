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
        className="w-full h-screen max-w-none bg-[#19181A] flex flex-col border-none shadow-none outline-none p-7"
      >
        <DialogTitle></DialogTitle>
        <SheetHeader className="border-none shadow-none bg-transparent">
          <div className="w-full flex justify-between items-center">
            <SheetClose className="w-20 flex justify-start items-center">
              <span className="cursor-pointer rounded hover:bg-muted w-6 h-6 ">
                <ChevronLeft className="text-white " />
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
            <div className="w-20 flex gap-2.75 items-center justify-center">
              <Bell className="text-white w-[30px] h-[30px] bg-[#434343] rounded-full p-2" />
              <EllipsisVertical className="text-white w-4.5 h-4.5" />
            </div>
          </div>
        </SheetHeader>

        {/* Body content */}
        <div
          className="w-full flex flex-col rounded-2xl h-26 mt-8 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://i.pinimg.com/1200x/b9/e6/da/b9e6da7fe10a7f908b68e552d44e15ee.jpg)`,
          }}
        ></div>
        <div className="w-full flex justify-center">
          <Avatar className="-mt-14 relative flex justify-center items-center ">
            <AvatarImage
              className="rounded-full object-cover w-27 h-auto aspect-square bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
              src="https://i.pinimg.com/236x/fc/3d/2a/fc3d2ab28b96352bfe48a4a8ebed81f4.jpg"
              alt="User Profile"
            />
            <Link href={`/addstory`}>
              <div className="w-9 h-auto aspect-square bg-[var(--background)] rounded-full absolute bottom-0 right-0 border-3 border-[#141414] flex justify-center items-center">
                <ImageIcon strokeWidth={3} width={15} />
              </div>
            </Link>
          </Avatar>
        </div>
        <div className="mt-4 flex justify-center items-center flex-col">
          <p className="text-[var(--background)] text-2xl font-semibold">
            @Enjiiiiibn
          </p>
          <span className="text-[var(--background)]/50 text-sm font-light mt-1">
            Mood status here mf
          </span>
        </div>
        <div className=" min-h-screen py-10 text-white font-sans">
          <div className="max-w-md mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#2c2c2c] rounded-xl p-4">
                <label className="block text-sm text-gray-400 mb-1">
                  Username
                </label>
                <p className="text-sm font-medium">Enjiiibn</p>
              </div>
              <div className="bg-[#2c2c2c] rounded-xl p-4 ">
                <label className="block text-sm text-gray-400 mb-1">
                  Phone number
                </label>
                <p className="text-sm font-medium">9999-9999</p>
              </div>
            </div>

            <div className="bg-[#2c2c2c] rounded-xl p-4">
              <label className="block text-sm text-gray-400 mb-1">
                Email address
              </label>
              <p className="text-sm font-medium">enji@gmail.com</p>
            </div>

            <div className="bg-[#2c2c2c] rounded-xl p-4">
              <label className="block text-sm text-gray-400 mb-1">
                Mood Status
              </label>
              <p className="text-sm font-medium">Happi happi happi</p>
            </div>

            <div className="bg-[#2c2c2c] rounded-xl p-4">
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <p className="text-sm font-medium">*****</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </div>
  );
};

export default EditProfile;
