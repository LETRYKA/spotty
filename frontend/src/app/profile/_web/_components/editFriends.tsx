import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UnfAlert from "./unfAlert";

//Friend list fectching and updating logic
//  const patchFriendAction = async (
//   userId: string,
//   action: "invite" | "unfriend"
// ) => {
//   try {
//     const response = await fetch(`/api/friends/${action}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update friend status");
//     }

//     const result = await response.json();
//     console.log(`${action} successful`, result);
//   } catch (error) {
//     console.error(`Error performing ${action}:`, error);
//   }
// };

const EditFriends = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="text-base font-semibold bg-transparent hover:bg-transparent border-none shadow-none hover:underline focus-visible:ring-transparent"
        >
          count
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark px-8 py-6">
        <DialogHeader>
          <DialogTitle className="text-white">All friends</DialogTitle>
        </DialogHeader>
        <div className=" flex flex-row gap-4 mt-4 items-center justify-center">
          <Avatar className="rounded-full w-[58px] h-[58px]">
            <AvatarImage
              className="rounded-full object-cover"
              src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
              alt="User Profile"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center items-start">
            <p className="text-white text-sm">first_name</p>
            <p className="text-white/50 text-[10px]">user_name</p>
          </div>
          <Button
            className="ml-auto bg-[#D9D9D9]/30 text-white hover:bg-[#141414] hover:text-white/50 border-none shadow-none text-sm font-semibold"
            // onClick={() => patchFriendAction("user-id-123", "invite")}
          >
            Invite
          </Button>
          <UnfAlert />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default EditFriends;
