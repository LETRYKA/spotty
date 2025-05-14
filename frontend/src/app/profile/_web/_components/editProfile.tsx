import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/app/profile/_web/store/userStore";
import { User } from "../types/User";
import { handleSave } from "../utils/handleSave";
import { getUserData } from "@/lib/api";

const EditProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [localUserData, setLocalUserData] = useState<User | null>(null);
  const { setFullUserData, setUserData: updateStoreUserData } = useUserStore();
  const { user } = useUser();
  const userId = user?.id;
  const [error, setError] = useState("");

  const fetchUser = async (id: string) => {
    try {
      const data = await getUserData(id);
      setLocalUserData(data);
      setFullUserData(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  let value = e.target.value.toLowerCase();

  if (value.length > 15) {
    setError("15 тэмдэгтээс хэтэрсэн байна. 🥲");
    return;
  }
  const regex = /^[a-z0-9_]*$/;
  if (!regex.test(value)) {
    setError("Зөвхөн латин жижиг үсэг, тоо болон доогуур зураас ашиглаарай.😉");
  } else if (/[A-Z]/.test(value)) {
    setError("Том үсэг ашиглаж болохгүй. Бүгдийг жижиг үсгээр оруулна уу.");
  } else {
    setError("");
  }
  if (regex.test(value) && !/[A-Z]/.test(value)) {
    setLocalUserData((prev) => (prev ? { ...prev, name: value } : null));
  }
};

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);

  return (
    <div className="w-full h-auto flex flex-col items-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="mt-3 bg-[#141414] text-white rounded-4xl py-5 px-6 focus-visible:ring-transparent"
          >
            Профайл засах
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-gradient-to-b from-[#171717] to-[#101010] text-white border border-[#2A2A2A] rounded-3xl">
          <DialogHeader>
            <DialogTitle>Профайл засах</DialogTitle>
          </DialogHeader>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full h-[104px] bg-[#8D8D8D] flex flex-col rounded-3xl">
              {localUserData?.backgroundImage ? (
                <img
                  src={localUserData.backgroundImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#8D8D8D]" />
              )}
            </div>
            <div className="relative">
              <Avatar className="-mt-16 p-[4px] relative rounded-full w-[111px] h-[111px]">
                <AvatarImage
                  className="rounded-full border-4 border-black object-cover"
                  src={localUserData?.avatarImage ?? ""}
                  alt="User Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name" className="text-xs">
                  Нэр
                </Label>
                <Input
                  id="FirstName"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="username" className="text-xs">
                  Хэрэглэгчийн нэр
                </Label>
                <Input
                  id="username"
                  value={localUserData?.name ?? ""}
                  onChange={handleChange}
                />
                {error && (
                  <p className="text-red-500 text-[10px] mt-1">{error}</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center mt-4 gap-4">
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="name" className="text-xs">
                  И-Мэйл
                </Label>
                <Input
                  id="email"
                  value={localUserData?.email ?? ""}
                  disabled
                  className="col-span-3 bg-[#202020] text-white cursor-not-allowed border-none"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="username" className="text-xs">
                  Утасны дугаар
                </Label>
                <Input
                  id="phonenumber"
                  value={localUserData?.phoneNumber ?? ""}
                  onChange={(e) =>
                    setLocalUserData((prev) =>
                      prev ? { ...prev, phoneNumber: e.target.value } : prev
                    )
                  }
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                  type="number"
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center mt-4 gap-4">
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="name" className="text-xs">
                  Хуучин нууц үг
                </Label>
                <Input
                  id="name"
                  className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020]"
                  type="password"
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <Label htmlFor="confirm-password" className="text-xs">
                  Шинэ нууц үг
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020] pr-10"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label htmlFor="name" className="text-xs">
                    Нууц үг баталгаажуулах
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirm-password"
                      className="col-span-3 focus-visible:ring-transparent border-none bg-[#202020] pr-10"
                      type={showPassword ? "text" : "password"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex w-full mt-6 px-2 justify-center items-center gap-4">
                <Button className="rounded-full w-2/4 py-5 border border-[#262626] bg-none">
                  {" "}
                  Болих
                </Button>
                <Button
                  className="rounded-full w-2/4 py-5 dark"
                  type="button"
                  onClick={() => handleSave(localUserData, updateStoreUserData)}
                >
                  Хадгалах
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EditProfile;
