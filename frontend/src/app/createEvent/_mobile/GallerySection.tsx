import { Image } from "lucide-react";
const GallerySection = () => {
  return (
    <div className="w-full h-54 max-w-sm flex flex-col bg-[#28272A] justify-center items-center p-3 gap-3 rounded-2xl mt-5">
      <p className="text-white/50">Gallery</p>
      <div className="w-full h-full flex justify-between w-full gap-3">
        <div className="bg-[#3D3D3D] h-auto w-1/3 h-[90%] rounded-2xl flex justify-center items-center">
          <Image className="text-white/70" />
        </div>
        <div className="bg-[#3D3D3D] h-auto w-1/3 h-[90%] rounded-2xl flex justify-center items-center">
          <Image className="text-white/70" />
        </div>
        <div className="bg-[#3D3D3D] h-auto w-1/3 h-[90%] rounded-2xl flex justify-center items-center">
          <Image className="text-white/70" />
        </div>
      </div>
    </div>
  );
};
export default GallerySection;
