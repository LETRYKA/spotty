import React from "react";
import Mapping from "/public/Mapping.png";
import RandomIcon from "/public/Random-icon.png";
import { Navigation } from "lucide-react";

const getStatusStyles = (status: string) => {
  switch (status) {
    case "upcoming":
      return {
        bg: "bg-[#FFD7003A]",
        border: "border-[#FFD700]",
      };
    case "ongoing":
      return {
        bg: "bg-[#00FF7F3A]",
        border: "border-[#00FF7F]",
      };
    case "over":
      return {
        bg: "bg-[#FF63473A]",
        border: "border-[#FF6347]",
      };
    default:
      return {
        bg: "bg-[#F5B44A3A]",
        border: "border-[#F5B44A]",
      };
  }
};

const EventCard: React.FC<{ status: string; participants?: string }> = ({
  status,
  participants = "0/0",
}) => {
  const { bg, border } = getStatusStyles(status);

  return (
      <div className="w-full h-auto flex flex-row items-center gap-4 mt-8 px-8">
        <div className="bg-[#313034] flex flex-col rounded-3xl items-center relative">
          <img
            src={Mapping.src}
            alt="Event"
            className="w-[300px] h-auto aspect-square rounded-3xl object-cover"
          />
          <div className="absolute top-4 bottom-4 left-6 right-6">
            <div className="w-full flex justify-between items-center gap-4">
              <div className="w-full h-auto flex flex-col justify-start items-start">
                <h5 className="text-white/50 text-base font-medium flex gap-2 items-center">
                  <Navigation className="text-white w-5 rounded-full" />
                  Capacity, nation
                </h5>
                <p className="text-white text-3xl font-bold mt-2">EventName</p>
              </div>
              <div className="w-24 h-auto aspect-square bg-[linear-gradient(45deg,_#FAC634,_#FACF64)] rounded-full flex justify-center items-center">
                <img
                  src={RandomIcon.src}
                  alt="Category Icon"
                  className="w-10 h-auto aspect-square object-cover"
                />
              </div>
            </div>
            <div className="w-full absolute bottom-20">
              <div
                className={`w-22 h-7 rounded-2xl px-4 py-2 ${bg} ${border} text-white font-bold text-sm flex justify-center items-center`}
              >
                {status}
              </div>
            </div>
            <div className="w-full h-auto flex flex-row justify-between bg-white mt-4 absolute top-47 rounded-xl px-4 py-2 gap-3">
              <div className="flex flex-col items-start">
                <p className="font-extrabold text-[10px]">@USERNAME</p>
                <p>YYYY-MM-DD-HH</p>
              </div>
              <div className="flex flex-row gap-1 justify-center items-center relative">
                <div className="rounded-full w-5 h-5 bg-[#D9D9D9] absolute right-13"></div>
                <div className="rounded-full w-5 h-5 bg-[#B7B7B7] absolute right-10"></div>
                <div className="rounded-full w-5 h-5 bg-[#939393] absolute right-7"></div>
                <p className="font-semibold text-xs">{participants}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default EventCard;
