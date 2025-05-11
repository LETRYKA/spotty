import { useState } from "react";
import { toast } from "react-toastify";
import EditFriends from "./editFriends";
import { uploadImageToCloudinary } from "@/utils/Cloudinary";
import EditAvatar from "./editAvatar";
import { useUserStore } from "@/app/profile/_web/store/userStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const EditCover = () => {
  const { userData, setUserData } = useUserStore() || {};
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const isVerified = userData?.isVerified;
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleImgUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const url = await uploadImageToCloudinary(file);
      setImageUrl(url);
      setUserData({ ...userData, backgroundImage: url });
      setShowSaveButton(true);
    } catch (error) {
      console.error("Зураг байршуулах үед алдаа гарлаа:", error);
      toast.error("Зураг upload амжилтгүй боллоо.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const userId = userData?.id;
    if (!userId || !imageUrl) return;

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backgroundImage: imageUrl }),
      });

      if (!response.ok) {
        toast.error("Хадгалах үед алдаа гарлаа.");
        return;
      }      const updated = await response.json();
      setUserData(updated);
      setShowSaveButton(false);
      toast.success("Ковер амжилттай хадгалсан2.");
    } catch (error) {
      console.error("Байжэээ ✋", error);
      toast.error("Сервертэй холбогдоход алдаа гарлаа.");
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-center">
      <div className="w-full h-[319px] rounded-3xl relative overflow-hidden">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center bg-[#8D8D8D]">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        ) : userData?.backgroundImage ? (
          <img
            src={userData.backgroundImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#8D8D8D]" />
        )}
        <div className="flex gap-3 absolute bottom-4 right-4">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-upload"
            onChange={handleImgUpload}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer py-2 px-4 text-white bg-black/70 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            {loading ? "Түр хүлээнэ үү..." : "Ковер солих"}
          </label>

          {showSaveButton && !loading && (
            <button
              onClick={handleSave}
              className="py-2 px-4 text-black bg-white/50 border border-green-700 rounded-xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            >
              Хадгалах
            </button>
          )}
        </div>
        ;
      </div>
      <div className="relative w-[128px] h-[128px] mt-4">
        <EditAvatar/>
        {isVerified && (
          <img
            src="verified-badge-profile-icon-png-one.png"
            className="w-7 h-auto aspect-square absolute bottom-18 right-2"
            alt="Verified Badge"
          />
        )}
      </div>
      <p className="text-white font-extrabold text-4xl -mt-8">
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
          {userData?.friendships?.length === 0 ? "" : "найзтай"}
        </p>
      </div>
    </div>
  );
};

export default EditCover;
