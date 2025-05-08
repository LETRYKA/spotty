import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditFriends from "./editFriends";
import { useUserStore } from "@/app/profile/_web/store/userStore";

const EditCover = () => {
  const { userData } = useUserStore();

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-[319px] rounded-3xl relative overflow-hidden">
        {userData?.backgroundImage ? (
          <img
            src={userData.backgroundImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#8D8D8D]" />
        )}
        <Button className="absolute bottom-4 right-4 z-10 opacity-80 hover:opacity-100 bg-[#141414] text-white py-2 px-4 focus-visible:ring-transparent transition-transform duration-300 ease-in-out transform hover:scale-102 hover:shadow-xl">
          Edit Cover image
        </Button>
      </div>
      <div className="relative">
        <Avatar className="-mt-16  relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[128px] h-[128px]">
          <AvatarImage
            className="rounded-full border-3 border-black object-cover"
            src={userData?.avatarImage}
            alt="User Profile"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <img
          src="verified-badge-profile-icon-png-one.png"
          className="w-7 h-auto aspect-square absolute bottom-2 right-2"
        />
      </div>
      <p className="text-white font-extrabold text-4xl mt-4">
        {userData?.name}
      </p>
      <div className="text-white/50 mt-3 flex gap-4">
        <p className="text-base">
          @{userData?.name}
          <span className="text-white font-semibold">
            <EditFriends
              friendIds={userData?.friendships?.map((f) => f.friendId) || []}
            />
          </span>
          friends
        </p>
      </div>
    </div>
  );
};
export default EditCover;