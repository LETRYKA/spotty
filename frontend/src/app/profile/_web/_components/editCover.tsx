import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/api"; 
const EditCover = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "NULL",
    friendships: [], // Store the friendships array
    friendsCount: 0, // Store the friends count
  });

  const userId = "user_2wTOJwIWXyv5OyMIQnLu9WQEPS0";

  const fetchUser = async () => {
    const data = await getUserData(userId);

    const uniqueFriends = [
      ...new Set([
        ...data.friendships.map(
          (friendship: { friendId: string }) => friendship.friendId
        ),
      ]),
    ];

    setUserData({
      name: data.name || "",
      email: data.email || "",
      phone: data.phone || "",
      friendships: data.friendships || [],
      friendsCount: uniqueFriends.length,
    });

    console.log("USER_DEDICATED_DATA", data);
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

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
          src='verified-badge-profile-icon-png-one.png'
          className="w-7 h-auto aspect-square absolute bottom-2 right-2"
        />
      </div>
      <p className="text-white font-extrabold text-4xl mt-4">{userData.name}</p>
      <div className="text-white/50 mt-3 flex gap-4">
        <p className="text-base">
          @{userData.name}
          <span className="text-white font-semibold">
            <Button
              variant="default"
              className="bg-transparent hover:bg-transparent border-none shadow-none hover:underline"
            >
              {userData.friendsCount > 0
                ? userData.friendsCount
                : "No friends yet"}
            </Button>
          </span>{" "}
          friends
          </p>
        </div>
      </div>
  );
};
export default EditCover;