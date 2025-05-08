import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Trash } from "lucide-react";
import { useState } from "react";
import UploadIcon from "/public/Group 55 (1).png";
import { uploadImageToCloudinary } from "@/utils/Cloudinary";

type ImageGalleryProps = {
  galleryImages: string[];
  setGalleryImages: (urls: string[]) => void;
  backgroundImage: string | null;
  setBackgroundImage: (url: string | null) => void;
  touched: any;
  errors: any;
};

export default function ImageGallery({
  galleryImages,
  setGalleryImages,
  backgroundImage,
  setBackgroundImage,
  touched,
  errors,
}: ImageGalleryProps) {
  const [previews, setPreviews] = useState<string[]>(galleryImages);
  const [bgIndex, setBgIndex] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleGalleryChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && galleryImages.length < 5 && !isUploading) {
      setIsUploading(true);
      try {
        const file = e.target.files[0];
        const url = await uploadImageToCloudinary(file);
        const newUrls = [...galleryImages, url];
        setGalleryImages(newUrls);
        setPreviews([...previews, url]);
        if (!backgroundImage) {
          setBackgroundImage(url);
          setBgIndex(newUrls.length - 1);
        }
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newUrls = galleryImages.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setGalleryImages(newUrls);
    setPreviews(newPreviews);
    if (bgIndex === index) {
      const newBgIndex = newUrls.length > 0 ? 0 : null;
      setBackgroundImage(newUrls[0] || null);
      setBgIndex(newBgIndex);
    } else if (bgIndex !== null && index < bgIndex) {
      setBgIndex(bgIndex - 1);
    }
  };

  const handleBgSelect = (index: number) => {
    setBackgroundImage(galleryImages[index]);
    setBgIndex(index);
  };

  return (
    <div>
      <Carousel>
        <CarouselContent className="h-40 gap-2 my-4">
          {previews.map((preview, index) => (
            <CarouselItem key={index} className="basis-2/5 pl-2">
              <div
                className="relative h-full rounded-xl bg-cover bg-center cursor-pointer group"
                style={{ backgroundImage: `url(${preview})` }}
                onClick={() => handleBgSelect(index)}
              >
                <div
                  className={`absolute inset-0 border-2 rounded-xl transition-all ${
                    bgIndex === index ? "border-white" : "border-transparent"
                  }`}
                />
                <div
                  className="opacity-0 group-hover:opacity-100 p-2 px-3 aspect-square absolute right-3 top-2 bg-[var(--foreground)]/40 rounded-full backdrop-blur-lg transition-all duration-300"
                  onClick={(e) => handleDeleteImage(index, e)}
                >
                  <Trash className="w-4 text-red-500" />
                </div>
              </div>
            </CarouselItem>
          ))}
          {previews.length < 5 && (
            <CarouselItem
              className={`${
                previews.length <= 0 ? "basis-5/5" : "basis-2/5"
              } pl-2`}
            >
              <label className="h-full flex items-center justify-center border-2 border-dashed border-[#2C2C2C] rounded-xl cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleGalleryChange}
                  disabled={isUploading}
                />
                <div className="text-center">
                  <img
                    src={UploadIcon.src}
                    alt="upload"
                    className="mx-auto mb-2 w-14"
                  />
                  <p className="text-sm text-gray-400 font-bold">
                    {isUploading ? "Uploading..." : "Upload"}
                  </p>
                  <p className="text-xs text-gray-500">JPEG, PNG</p>
                </div>
              </label>
            </CarouselItem>
          )}
        </CarouselContent>
      </Carousel>
      {touched.galleryImages && errors.galleryImages && (
        <div className="text-red-500 text-xs mt-1">{errors.galleryImages}</div>
      )}
      {touched.backgroundImage && errors.backgroundImage && (
        <div className="text-red-500 text-xs mt-1">
          {errors.backgroundImage}
        </div>
      )}
    </div>
  );
}
