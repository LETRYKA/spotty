import { StatusStyles } from '@/app/profile/_web/types/statusStyles';

export const statusStyles: StatusStyles = {
  ENDED: {
    background: "bg-[#F45B69]/[0.23]",
    border: "border-[#F45B69]",
    text: "Дууссан",
  },
  UPCOMING: {
    background: "bg-[#F5B44A]/[0.23]",
    border: "border-[#F5B44A]",
    text: "Удахгүй болох",
  },
  ONGOING: {
    background: "bg-[#06D6A0]/[0.23]",
    border: "border-[#06D6A0]",
    text: "Болж байгаа",
  },
  CANCELLED: {
    background: "bg-[#000000]/[0.23]",
    border: "border-[#FFFFFF]",
    text: "Цуцлагдсан",
  },
};

export const getStatusStylesAndText = (status: keyof StatusStyles) => {
  return statusStyles[status] || statusStyles["ENDED"];
};