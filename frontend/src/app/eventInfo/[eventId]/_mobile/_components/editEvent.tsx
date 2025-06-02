"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Event } from "@/types/Event";
import { updateEvent } from "@/lib/api";
import { toast } from "react-toastify";
import { useUser } from "@clerk/clerk-react";
import { getCategories } from "@/lib/api"
import { EventFormFields } from "@/app/location/_web/_components/EventFormFields";

export interface EventFormValues {
  title: string;
  description: string;
  lat: number;
  lng: number;
  isPrivate: boolean;
  hiddenFromMap: boolean;
  password: string;
  startAt: Date;
  endAt: Date;
  participantLimit?: number;
  categories: string[];
  backgroundImage: string | null;
  galleryImages: string[];
}

interface EditEventFormDialogProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
  onEventUpdate: (updatedEvent: Event) => void;
}

const EditEventSchema = Yup.object().shape({
  title: Yup.string().max(50, "Too Long!").required("Required"),
  description: Yup.string().required("Required"),
  startAt: Yup.date().required("Required"),
  categories: Yup.array().min(1, "Select at least one category"),
  participantLimit: Yup.number().min(1, "Must be at least 1"),
  password: Yup.string().when("isPrivate", {
    is: true,
    then: (schema) => schema
      .required("Password is required for private events")
      .matches(/^[0-9]{4}$/, "Password must be 4 digits"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const EditEvent = ({
  event,
  isOpen,
  onClose,
  onEventUpdate,
}: EditEventFormDialogProps) => {
  const { user } = useUser();
  const [categoriesList, setCategoriesList] = useState<any[]>([]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, formikInstance: FormikProps<EventFormValues>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, "");
    const truncatedValue = numericValue.slice(0, 4);
    formikInstance.setFieldValue("password", truncatedValue);
  };

  useEffect(() => {
    const loadCategories = async () => {
      if (isOpen) {
        try {
          const fetchedCategories = await getCategories();
          setCategoriesList(fetchedCategories || []);
        } catch (error) {
          console.error("Өө алдаа гарлаа", error);
          toast.error("Өө алдаа гарлаа.");
          setCategoriesList([]);
        }
      }
    };
    loadCategories();
  }, [isOpen]);

  const initialValues: EventFormValues = {
    title: event.title,
    description: event.description || "",
    lat: event.lat,
    lng: event.lng,
    isPrivate: event.isPrivate,
    hiddenFromMap: event.hiddenFromMap,
    password: event.password || "",
    startAt: new Date(event.startAt),
    endAt: event.endAt ? new Date(event.endAt) : new Date(event.startAt),
    participantLimit: event.participantLimit || undefined,
    categories: event.categories?.map((cat: any) => cat.id) || [],
    backgroundImage: event.backgroundImage || null,
    galleryImages: event.galleryImages || [],
  };

  const handleSubmit = async (values: EventFormValues) => {
    if (!user?.id || !event.id) {
      toast.error("Хэрэглэгч олдсонгүй");
      return;
    }
    try {
      const payload = {
        ...values,
        userId: user.id,
        startAt: values.startAt.toISOString(),
        endAt: values.endAt ? values.endAt.toISOString() : null,
      };

      const response = await updateEvent(event.id, payload);

      if (!response.ok) {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (e) { }
        const errorMessage = errorData?.error || errorData?.message || response.statusText || `Failed to update event (status ${response.status})`;
        throw new Error(errorMessage);
      }

      const updatedEventResult: Event = await response.json();

      toast.success("Амжилттай шинэчиллээ");
      onEventUpdate(updatedEventResult);
      onClose();
    } catch (error) {
      console.error("Өө алдаа:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent
    className="bg-black/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl p-4 sm:p-6 text-[var(--background)] max-h-[90vh] overflow-y-auto w-[90vw] sm:w-[500px]"
  >
    <DialogHeader>
      <DialogTitle className="text-lg sm:text-xl">Edit Event</DialogTitle>
    </DialogHeader>

    <Formik
      initialValues={initialValues}
      validationSchema={EditEventSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik: FormikProps<EventFormValues>) => (
        <form
          id="event-edit-form"
          onSubmit={formik.handleSubmit}
          className="flex flex-col space-y-4"
        >
          <EventFormFields
            formik={formik}
            categoriesList={categoriesList}
            handlePasswordChange={handlePasswordChange}
          />

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-blue-600 rounded-xl py-5 hover:bg-blue-700"
            >
              {formik.isSubmitting ? "Хадгалж байна..." : "Хадгалах"}
            </Button>
          </DialogFooter>
        </form>
      )}
    </Formik>
  </DialogContent>
</Dialog>
  );
};

export default EditEvent;