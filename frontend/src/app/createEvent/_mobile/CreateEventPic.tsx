"use client";
import { useState, useRef } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import { uploadImageToCloudinary } from "@/utils/Cloudinary"; 

const CreateEventPic = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        setImagePreview(url);
      } catch (err) {
        console.error("Failed to upload:", err);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
  };

  return (
    <div className="absolute w-full bg-black h-[75vh] overflow-hidden">
      <div className="w-full h-full relative">
        <img
          className="w-full h-full object-cover"
          src={imagePreview || "/CreateEventPic.png"}
          alt="Banner"
        />
        {!imagePreview && (
          <div
            className="absolute top-[18%] left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
            onClick={triggerFileInput}
          >
            <div className="flex flex-col justify-center items-center p-2">
              <div className="bg-black/40 h-[50px] w-[50px] flex justify-center items-center rounded-full">
                <ImageIcon width={20} height={20} className="text-white" />
              </div>
              <p className="text-white text-[10px] bg-black/30 rounded-full py-2 px-3 mt-2">
                {isUploading ? "Uploading..." : "Add Background"}
              </p>
            </div>
          </div>
        )}
        {imagePreview && (
          <div
            className="absolute top-[24%] left-1/2 transform -translate-x-1/2 p-2 bg-black/70 rounded-full cursor-pointer z-20"
            onClick={handleDeleteImage}
          >
            <X className="text-white" width={20} height={20} />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />
        <div className="w-full h-[40rem] absolute top-20 left-0 blur-gradient-mask pointer-events-none z-0" />
        <div className="absolute bottom-0 w-full z-0">
          <div className="w-full h-[30rem] bg-gradient-to-t from-[#00090D] to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPic;
