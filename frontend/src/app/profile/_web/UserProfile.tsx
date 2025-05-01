"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Verified from "/public/verified-badge-profile-icon-png 1.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const UserProfile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <Dialog>
        <div className="w-full h-[319px] bg-[#8D8D8D] flex flex-col rounded-3xl"></div>
        <div className="relative">
          <Avatar className="-mt-16 p-[4px] relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[128px] h-[128px]">
            <AvatarImage
              className="rounded-full border-3 border-black object-cover"
              src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
              alt="User Profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <img
            src={Verified.src}
            className="w-7 h-auto aspect-square absolute bottom-2 right-2"
          />
        </div>
        <p className="text-white font-extrabold text-4xl mt-4">@USER_NAME</p>
        <div className="text-white/50 mt-3 flex gap-4">
          <p className="text-base">
            @username | <span className="text-white font-semibold">###</span>{" "}
            friends
          </p>
        </div>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-5 bg-[#141414] text-white rounded-4xl py-5 px-6 focus-visible:ring-transparent"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-[#171717] to-[#101010] text-white border border-[#2A2A2A] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full h-[104px] bg-[#8D8D8D] flex flex-col rounded-3xl"></div>
            <div className="relative">
              <Avatar className="-mt-16 p-[4px] relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[111px] h-[111px]">
                <AvatarImage
                  className="rounded-full border-3 border-black object-cover"
                  src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                  alt="User Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-right">
                  First Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3 focus-visible:ring-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3 focus-visible:ring-transparent"
                />
              </div>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3 focus-visible:ring-transparent"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-right">
                  Phonenumber
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3 focus-visible:ring-transparent"
                  type="number"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default UserProfile;
