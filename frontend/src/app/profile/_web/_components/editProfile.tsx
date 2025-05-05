import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Label } from "@/components/ui/label";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  

  const EditProfile = () => {
    return (
      <div className="w-full h-auto flex flex-col items-center">
        <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-3 bg-[#141414] text-white rounded-4xl py-5 px-6 focus-visible:ring-transparent"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-[#171717] to-[#101010] text-white border border-[#2A2A2A] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full h-[104px] bg-[#8D8D8D] flex flex-col rounded-3xl"></div>
            <div className="relative">
              <Avatar className="-mt-16 p-[4px] relative rounded-full w-[111px] h-[111px]">
                <AvatarImage
                  className="rounded-full border-4 border-black object-cover"
                  src="https://www.angelopedia.com/NewsInPic/E0G6MS5T42Mongolia.jpg"
                  alt="User Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name" className="text-xs">
                  First Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="username" className="text-xs">
                  Username
                </Label>
                <Input
                  id="username"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                />
              </div>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name" className="text-xs">
                  Email
                </Label>
                <Input
                  id="name"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="username" className="text-xs">
                  Phonenumber
                </Label>
                <Input
                  id="username"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="name" className="text-xs">
                  Password
                </Label>
                <Input
                  id="name"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex w-full mt-6 px-2 justify-center items-center gap-4">
            <Button className="rounded-full w-2/4 py-5 border border-[#262626] bg-none"
            > Maybe later</Button>
            <Button className="rounded-full w-2/4 py-5 dark" type="submit">
              Save changes
            </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    )
  }
  export default EditProfile;