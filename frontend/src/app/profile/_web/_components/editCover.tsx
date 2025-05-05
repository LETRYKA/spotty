import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Verified from "/public/verified-badge-profile-icon-png 1.png";
import { Button } from "@/components/ui/button";
import EditFriends from "./editFriends";

const EditCover = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-[319px] bg-[#8D8D8D] flex flex-col rounded-3xl relative">
        <Button className="absolute bottom-4 right-4">Edit Cover image</Button>
      </div>
      <div className="relative">
        <Avatar className="-mt-16  relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[128px] h-[128px]">
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
        <div className="text-base flex items-center justify-center">
          @username |{" "}
          <span>
            <EditFriends />
          </span>{" "}
          friends
        </div>
      </div>
    </div>
  );
};
export default EditCover;
