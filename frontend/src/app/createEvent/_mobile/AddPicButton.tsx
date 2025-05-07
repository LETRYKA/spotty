"use client";
import { useState, useRef } from "react";
import { Image as ImageIcon } from "lucide-react";


const AddPicButton = ( ) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const triggerFileInput = () => {
        fileInputRef.current?.click();
      };
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageURL = URL.createObjectURL(file);
          setImagePreview(imageURL);
        }
      };
    return (
        <div>
            <div
            className="absolute top-[18%] left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
            onClick={triggerFileInput}
            >
            {imagePreview ? (
                <div
                className="w-64 h-32 bg-cover bg-center rounded-lg border border-gray-700"
                style={{ backgroundImage: `url(${imagePreview})` }}
                onClick={() => triggerFileInput()}
                />
            ) : (
                <div
                className="flex flex-col justify-center items-center p-2"
                onClick={triggerFileInput}
                >
                <div className="bg-black/40 h-[50px] w-[50px] flex justify-center items-center rounded-full">
                    <ImageIcon
                    width={20}
                    height={20}
                    className="text-white"
                    onClick={triggerFileInput}
                    />
                </div>
                <p
                    className="text-white text-[10px] bg-black/30 rounded-full py-2 px-3 mt-2"
                    onClick={triggerFileInput}
                >
                    Add Background
                </p>
                </div>
            )}
            </div>
            <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            />
        </div>
    )
}
export default AddPicButton;