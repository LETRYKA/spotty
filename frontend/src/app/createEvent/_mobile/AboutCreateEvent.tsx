import * as React from "react";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import DefaultAvatar from "@/img/default_avatar.png";
import { useEffect } from "react";

const MAX_CHAR_LIMIT = 1000;

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
type User = {
  id: string;
  name: string;
  email: string;
  avatarImage: string;
  backgroundImage: string | null;
  batteryLevel: number | null;
  createdAt: string;
  phoneNumber: string | null;
  moodStatus: string | null;
  events: Event[];
  joinedEvents: Event[];
  // friendsOf: Friendship[];
  // friendships: Friendship[];
  locations: any[];
  stories: any[];
  isVerified: boolean;
};

const AboutCreateEvent = () => {
  const [userData, setLocalUserData] = useState<User | null>(null);
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

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
              ownerId: user?.id,
            }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            alert("❌ " + data.error);
            return;
          }
  
          alert("✅ Event created successfully!");
          router.push("/events"); 
        } catch (error) {
          console.error("Unexpected error:", error);
          alert("Something went wrong.");
        }
      },
    });
      const getUserData = async (userId: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/${userId}`, {
        headers: {
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.log("Axios Error shuu", error);
      return error;
    }
  };
    useEffect(() => {
        const fetchUser = async (id: string) => {
          try {
            const data = await getUserData(id);
            setLocalUserData(data);
            console.log("User data fetched:", data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        if (userId) {
          fetchUser(userId);
        }
      }, [userId]);

  const [aboutText, setAboutText] = React.useState(formik.initialValues.description || "");

  // const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const inputValue = event.target.value;
  //   if (inputValue.length <= MAX_CHAR_LIMIT) {
  //     setAboutText(inputValue);
  //   }
  // };
  return (
    <div className="z-50">
      <Drawer>
        <DrawerTrigger asChild>
          <div className="w-full bg-[#28272A] border-1 border-[#28272A] rounded-2xl mt-7 p-7 cursor-pointer hover:bg-[#333235] transition">
            <div className="w-full flex flex-col justify-center items-center gap-2">
                      <Avatar className="w-9 h-auto aspect-square">
                        <AvatarImage src={userData?.avatarImage || DefaultAvatar.src} alt="User Profile" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
              <p className="text-xs text-[var(--background)]/50">
                Hosted by{" "}
                <strong className="text-[var(--background)]">{user?.username || "User"}</strong>
              </p>
            </div>
            <p className="text-xs text-[var(--background)]/50 mt-4">About</p>

            <p className="text-sm text-[var(--background)] mt-2 line-clamp-3">
              {aboutText
                ? aboutText
                : "Tell your guests about your event. Click to add more..."}
            </p>
          </div>
        </DrawerTrigger>

        <DrawerContent className="bg-[#252526]">
          <div className="mx-auto w-full max-w-sm">
            <DrawerClose asChild className="flex justify-end p-0">
              <p className="text-[#0278FC] font-extrabold cursor-pointer">Done</p>
            </DrawerClose>
            <DrawerHeader className="py-0 pb-4">
              <DrawerTitle className="text-[#FFFFFF]/50">About</DrawerTitle>
              <textarea
                placeholder="Tell your guests about your event."
                value={formik.values.description}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue.length <= MAX_CHAR_LIMIT) {
                    formik.setFieldValue("description", inputValue);
                    setAboutText(inputValue);
                  }
                }}
                className="w-full h-[200px] mt-2 p-3 rounded-2xl bg-[#1f1f1f] text-white resize-none align-top focus:outline-none focus:ring-[#FFFFFF]/30"
              />
              <p className="text-[#FFFFFF]/30 text-[12px] mt-1">
                Character Limit: {aboutText.length}/{MAX_CHAR_LIMIT}
              </p>
            </DrawerHeader>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AboutCreateEvent;
