"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheck, Earth, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft } from "lucide-react";
import AboutCreateEvent from "./AboutCreateEvent";
// import AddPicButton from "./AddPicButton";
import DatePickStart from "./DatePickStart";
import DatePickEnd from "./DatePickEnd";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useRouter } from "next/navigation";
import GallerySection from "./GallerySection";
import { useUser } from "@clerk/nextjs";

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
  const [isPrivate, setIsPrivate] = useState(true);
  const router = useRouter();
  const { user } = useUser();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      lat: undefined,
      lng: undefined,
      isPrivate: true,
      hiddenFromMap: false,
      password: "",
      startAt: undefined,
      endAt: undefined,
      participantLimit: undefined,
      categories: [] as string[],
      backgroundImage: "",
      galleryImages: [],
    },
    validationSchema: toFormikValidationSchema(eventSchema),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            password: values.isPrivate ? values.password : null,
            lat: values.lat ?? 47.9184676,
            lng: values.lng ?? 106.9177016,
            ownerId: user?.id, // 👈 Make sure user is logged in
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          alert("❌ " + data.error);
          return;
        }

        alert("✅ Event created successfully!");
        router.push("/events"); // redirect to events list or details
      } catch (error) {
        console.error("Unexpected error:", error);
        alert("Something went wrong.");
      }
    },
  });

  return (
    <div className="w-full h-auto flex flex-col justify-center p-9">
      <div className="flex w-full h-full justify-between items-center z-40">
        <div className="w-9 h-auto aspect-square bg-[var(--background)]/15 backdrop-blur-xs rounded-full flex justify-center items-center cursor-pointer">
          <ChevronLeft className="w-4 text-[var(--background)]" strokeWidth={3} onClick={() => router.back()}/>
        </div>
        <Avatar className="w-9 h-auto aspect-square">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col w-full justify-center items-center mt-70 z-50 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Event title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-white text-center bg-transparent border-gray-600 text-3xl font-bold focus:outline-none placeholder-white/40"
        />
        {formik.touched.title && formik.errors.title && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
        )}
        <textarea
          name="description"
          placeholder="Short description e.g., 19 May, 12pm Ulaanbaatar"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="text-white text-center bg-transparent border-gray-600 text-sm resize-none focus:outline-none placeholder-white/50 w-full max-w-md"
          rows={2}
        />
      </div>
      <div className="w-full px-10 mt-10 z-50">
      <div className="w-full bg-[#0A0A0B] border border-[#1D1D1D] rounded-full flex justify-center items-center p-2">
        <Button
          type="button"
          onClick={() => {
            setIsPrivate(true);
            formik.setFieldValue("isPrivate", true);
          }}
          className={`flex flex-col items-center text-sm font-extrabold rounded-full gap-0 w-2/4 py-6 transition-all duration-300 ${
            isPrivate
              ? "bg-[var(--background)] text-black"
              : "bg-[#0A0A0B] text-[var(--background)]/50"
          }`}
        >
          <Lock
            className={`w-5 h-5 mb-1 ${
              isPrivate ? "text-black" : "text-[var(--background)]/50"
            }`}
          />
          Private
        </Button>
        <Button
              type="button"
              onClick={() => {
                setIsPrivate(false);
                formik.setFieldValue("isPrivate", false);
                formik.setFieldValue("password", "");
              }}
              className={`flex flex-col items-center text-sm font-extrabold rounded-full gap-0 w-2/4 py-6 transition-all duration-300 ${
                !isPrivate
                  ? "bg-[var(--background)] text-black"
                  : "bg-[#0A0A0B] text-[var(--background)]/50"
              }`}
            >
              <Earth
                className={`w-5 h-5 mb-1 ${
                  !isPrivate ? "text-black" : "text-[var(--background)]/50"
                }`}
              />
              Public
            </Button>
        </div>
          {isPrivate && (
            <div className="mt-4">
              <input
                type="password"
                name="password"
                placeholder="4-digit passcode"
                maxLength={4}
                value={formik.values.password}
                onChange={(e) => {
                  // Only allow numbers
                  const value = e.target.value.replace(/\D/g, "");
                  formik.setFieldValue("password", value);
                }}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-700 rounded-lg focus:outline-none"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
              )}
            </div>
          )}
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
          type="number"
          name="participantLimit"
          value={formik.values.participantLimit || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Slot"
          className="w-full bg-[#28272A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-[#68686d]"
        />
        {formik.touched.participantLimit && formik.errors.participantLimit && (
          <p className="text-red-500 text-sm mt-1">{formik.errors.participantLimit}</p>
        )}
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
        <GallerySection
          galleryImages={formik.values.galleryImages}
          setGalleryImages={(images) => formik.setFieldValue("galleryImages", images)}
          backgroundImage={formik.values.backgroundImage}
          setBackgroundImage={(image) => formik.setFieldValue("backgroundImage", image)}
          touched={{
            galleryImages: formik.touched.galleryImages,
            backgroundImage: formik.touched.backgroundImage,
          }}
          errors={{
            galleryImages: formik.errors.galleryImages,
            backgroundImage: formik.errors.backgroundImage,
          }}
        />
      </div>
    </div>
  );
};

export default CreateEventSection;
