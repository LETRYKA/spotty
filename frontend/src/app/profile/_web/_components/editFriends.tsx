import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  
const EditFriends = () => {
    return (
        <div className="w-full flex flex-col justify-start items-center">
            <div className="relative">
                <Avatar className="-mt-16  relative rounded-full bg-gradient-to-r from-[#428CFA] via-[#7062FB] via-[#E956D1] via-[#FB5F78] to-[#F98437] w-[128px] h-[128px]">
                    <AvatarImage
                        className="rounded-full border-3 border-black object-cover"
                        src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                        alt="User Profile"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};
export default EditFriends;