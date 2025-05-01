"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import HeaderMobileProfile from "./Header";

const UserProfileMobile = () => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-center p-9">
      <HeaderMobileProfile/>
      <div className="w-full bg-[#8D8D8D] flex flex-col rounded-3xl h-26 mt-8">
        <div className="relative">
          <Avatar className="rounded-full">
            <AvatarImage
              className="rounded-full object-cover w-27.25 h-27.25 absolute left-1/2 -translate-x-1/2 top-13 bg-gradient-to-tr from-blue-500 via-pink-500 to-orange-400 p-[3px]"
              src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
              alt="User Profile"
            />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default UserProfileMobile;
