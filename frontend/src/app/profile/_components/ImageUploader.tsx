import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@radix-ui/react-label";
import { Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

const ImageUploader = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-[319px] flex justify-center items-center">
        {image ? (
          <Image
            src={typeof image === "string" ? image : ""}
            alt="Uploaded"
            className="w-full h-full rounded-xl object-cover"
            width={1440}
            height={319}
          />
        ) : (
          <Label
            htmlFor="picture"
            className="cursor-pointer flex flex-row gap-2 justify-center items-center bg-black text-[14px] text-white rounded-lg p-2"
          >
            <Camera className="w-[16px] h-[16px] text-white" />
            Add a cover image
            <Input
              id="picture"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
        )}
      </div>
    </div>
  );
};
export default ImageUploader;
