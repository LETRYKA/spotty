import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { createEvent, getCategories } from "@/lib/api";
import { toast } from "react-toastify";
import CreateEventForm from "./CreateEventForm";
import LocationSelect from "./LocationSelect";
import PasscodeDialog from "./Passcode";
import { EventFormValues } from "../types/Event";
import { Plus } from "lucide-react";

const eventSchema = z.object({
  title: z.string().max(20, "Title must be at most 20 characters"),
  description: z.string().optional(),
  lat: z.number({ required_error: "Location is required" }),
  lng: z.number({ required_error: "Location is required" }),
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

export default function CreateEvent() {
  const { user } = useUser();
  const [showLocationSelect, setShowLocationSelect] = useState(false);
  const [showCreateEventDialog, setShowCreateEventDialog] = useState(false);
  const [showPasscodeDialog, setShowPasscodeDialog] = useState(false);
  const [pendingValues, setPendingValues] = useState<EventFormValues | null>(
    null
  );
  const [categories, setCategories] = useState<
    { id: string; name: string; emoji: string }[]
  >([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const fetchCategoriesForForm = async () => {
      if (showCreateEventDialog) {
        setIsLoadingCategories(true);
        try {
          const fetchedCategories = await getCategories();
          if (Array.isArray(fetchedCategories)) {
            setCategories(fetchedCategories);
          } else {
            setCategories([]);
            toast.error("Could not load categories.");
          }
        } catch (error) {
          console.error("Failed to fetch categories:", error);
          toast.error("Failed to load categories for the form.");
          setCategories([]);
        } finally {
          setIsLoadingCategories(false);
        }
      }
    };

    fetchCategoriesForForm();
  }, [showCreateEventDialog]);

  const formik = useFormik<EventFormValues>({
    initialValues: {
      title: "",
      description: "",
      lat: location?.lat || 0,
      lng: location?.lng || 0,
      isPrivate: false,
      hiddenFromMap: false,
      password: "",
      startAt: new Date(),
      endAt: new Date(),
      participantLimit: undefined,
      categories: [],
      backgroundImage: null,
      galleryImages: [],
    },
    validationSchema: toFormikValidationSchema(eventSchema),
    onSubmit: async (values) => {
      setShowCreateEventDialog(false);
      if (values.isPrivate) {
        setPendingValues(values);
        setShowPasscodeDialog(true);
      } else if (user?.id) {
        try {
          await createEvent({ ...values, password: "" }, user.id);
          toast.success("Event created successfully");
          formik.resetForm();
          setLocation(null);
        } catch (err) {
          console.error("Failed to create event:", err);
          toast.error("Failed to create event");
        }
      }
    },
  });

  const handlePasscodeSubmit = async (password: string) => {
    if (pendingValues && user?.id) {
      try {
        await createEvent({ ...pendingValues, password }, user.id);
        toast.success("Event created successfully");
        setShowPasscodeDialog(false);
        setPendingValues(null);
        formik.resetForm();
        setLocation(null);
      } catch (err) {
        console.error("Failed to create event with passcode:", err);
        toast.error("Failed to create event");
        setShowPasscodeDialog(false);
      }
    }
  };

  return (
    <>
      <Dialog
        open={showCreateEventDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowCreateEventDialog(false);
          }
        }}
      >
        <DialogTrigger asChild>
          <Button
            className="rounded-full w-14 h-14 bg-[var(--background)] hover:bg-[var(--background)]/80 text-[var(--foreground)] text-2xl font-bod"
            onClick={() => {
              setShowLocationSelect(true);
            }}
          >
           <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[500px] bg-black/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Create Event
            </DialogTitle>
          </DialogHeader>
          {isLoadingCategories ? (
            <div className="text-white text-center py-4">Loading categories...</div>
          ) : (
            <CreateEventForm formik={formik} categories={categories} />
          )}
        </DialogContent>
      </Dialog>

      <LocationSelect
        open={showLocationSelect}
        onSelect={(lat, lng) => {
          setLocation({ lat, lng });
          formik.setFieldValue("lat", lat);
          formik.setFieldValue("lng", lng);
          setShowLocationSelect(false);
          setShowCreateEventDialog(true);
        }}
        onClose={() => setShowLocationSelect(false)}
      />

      {showPasscodeDialog && (
        <PasscodeDialog
          open={showPasscodeDialog}
          onSubmit={handlePasscodeSubmit}
          onCancel={() => {
            setShowPasscodeDialog(false);
            setPendingValues(null);
          }}
          eventTitle={formik.values.title || "Event"}
          mode="create"
        />
      )}
    </>
  );
}
