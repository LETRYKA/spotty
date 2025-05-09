"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, Earth, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import GallerySection from "./GallerySection";
import AboutCreateEvent from "./AboutCreateEvent";
import AddPicButton from "./AddPicButton";
import DatePickStart from "./DatePickStart";
import DatePickEnd from "./DatePickEnd";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

const eventSchema = z.object({
  title: z.string().max(20, "Title must be at most 20 characters"),
  description: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional(),
  isPrivate: z.boolean().default(false),
  hiddenFromMap: z.boolean().default(false),
  password: z.string().optional(),
  startAt: z.date({ required_error: "Start time is required" }),
  endAt: z.date().optional(),
  participantLimit: z.number().optional(),
  categories: z
    .array(z.string())
    .min(1, "Select at least one category")
    .default([]),
  backgroundImage: z.string({ required_error: "Background image is required" }),
  galleryImages: z.array(z.string()).max(5, "Max 5 gallery images"),
});

const CreateEventSection = () => {
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<any>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      lat: undefined,
      lng: undefined,
      isPrivate: false,
      hiddenFromMap: false,
      password: "",
      startAt: undefined,
      endAt: undefined,
      participantLimit: undefined,
      categories: [] as string[],
      backgroundImage: null,
      galleryImages: [],
    },
    validationSchema: toFormikValidationSchema(eventSchema),
    onSubmit: (values) => {
      if (values.isPrivate) {
        setPendingValues(values);
        setShowPasscodeDialog(true);
      } else {
        console.log({ ...values, password: "" });
      }
    },
  });

  return (
    <div className="w-full h-auto flex flex-col justify-center p-9">
      <div className="flex w-full h-full justify-between items-center z-40">
        <div className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <X className="w-4 text-[var(--background)]" strokeWidth={3} />
        </div>
        <Avatar className="w-9 h-auto aspect-square">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-70">
        <AddPicButton />
        <h1 className="text-white font-extrabold text-5xl text-center">
          Event title
        </h1>
        <p className="text-[white]/70 text-sm text-center px-28 mt-6">
          19 May, 12pm Ulaanbaatar, kid100
        </p>
      </div>
      <div className="w-full px-10 mt-10">
        <div className="w-full bg-[#0A0A0B] border-1 border-[#1D1D1D] rounded-full flex justify-center items-center p-2">
          <Button className="flex flex-col items-center text-black text-sm font-extrabold bg-[var(--background)] hover:bg-[var(--background)] rounded-full gap-0 w-2/4 py-6">
            <Lock />
            Private
          </Button>
          <Button className="flex flex-col items-center text-[var(--background)]/50 text-sm font-extrabold bg-[#0A0A0B] hover:bg-[#0A0A0B] rounded-full gap-0 w-2/4 py-6">
            <Earth />
            Public
          </Button>
        </div>
      </div>
      <AboutCreateEvent />
      <div className="flex flex-col justify-center items-center w-full bg-[#28272A] border-1 border-[#28272A] rounded-2xl mt-5 p-5 text-center">
        <h1 className="text-white/50">Direction</h1>
        <p className="text-white text-[12px] w-[180px]">
          Хүүхдийн 100 өргөн чөлөө Ulaanbatar, Mongolia, Ulan Bator
        </p>
      </div>
      <div className="flex flex-col w-full space-x-4 mt-5 gap-4">
        <input
          type="text"
          placeholder="Slot"
          className="w-full bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
        />
        <div className="flex w-full gap-3 flex-col justify-center ">
          <DatePickStart
            value={formik.values.startAt}
            onChange={(date) => formik.setFieldValue("startAt", date)}
            touched={formik.touched.startAt}
            error={formik.errors.startAt}
          />
          <DatePickEnd
            value={formik.values.endAt}
            onChange={(date) => formik.setFieldValue("endAt", date)}
            touched={formik.touched.endAt}
            error={formik.errors.endAt}
          />
        </div>
        <GallerySection />
      </div>
    </div>
  );
};

export default CreateEventSection;
