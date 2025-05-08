import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown } from "lucide-react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useState } from "react";
import DateTimePicker from "./DateTimePicker";
import ImageGallery from "./ImageGallery";
import PasscodeDialog from "./Passcode";

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

export default function CreateEvent() {
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

  const handlePasscodeSubmit = (password: string) => {
    if (pendingValues) {
      console.log({ ...pendingValues, password });
      setShowPasscodeDialog(false);
      setPendingValues(null);
      formik.resetForm();
    }
  };

  const handlePasscodeCancel = () => {
    setShowPasscodeDialog(false);
    setPendingValues(null);
  };

  const toggleCategory = (category: string) => {
    const categories = formik.values.categories;
    formik.setFieldValue(
      "categories",
      categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category]
    );
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Event</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[500px] bg-black/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl p-6">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">
              Create Event
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-3 text-white">
            <div className="flex gap-3">
              <div className="w-1/2">
                <Input
                  name="title"
                  placeholder="Title"
                  maxLength={20}
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.title}
                  </div>
                )}
              </div>
              <div className="w-1/2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl flex justify-between"
                    >
                      Category <ChevronDown className="text-white/50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#0D0D0D] border-[#2F2F2F] text-white">
                    {["Status Bar", "Panel"].map((cat) => (
                      <DropdownMenuCheckboxItem
                        key={cat}
                        checked={formik.values.categories.includes(cat)}
                        onCheckedChange={() => toggleCategory(cat)}
                      >
                        {cat}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {formik.touched.categories && formik.errors.categories && (
                  <div className="text-red-500 text-xs mt-1">
                    {formik.errors.categories}
                  </div>
                )}
              </div>
            </div>
            <Textarea
              name="description"
              placeholder="Description"
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              className="bg-[#0D0D0D]/70 border-[#2F2F2F] rounded-xl p-3"
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <DateTimePicker
                  value={formik.values.startAt}
                  onChange={(date) => formik.setFieldValue("startAt", date)}
                  touched={formik.touched.startAt}
                  error={formik.errors.startAt}
                />
              </div>
              <div className="w-1/2">
                <Input
                  name="participantLimit"
                  type="number"
                  placeholder="Slot"
                  value={formik.values.participantLimit || ""}
                  onChange={(e) =>
                    formik.setFieldValue(
                      "participantLimit",
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value)
                    )
                  }
                  className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl"
                />
              </div>
            </div>
            <ImageGallery
              galleryImages={formik.values.galleryImages}
              setGalleryImages={(urls) =>
                formik.setFieldValue("galleryImages", urls)
              }
              backgroundImage={formik.values.backgroundImage}
              setBackgroundImage={(url) =>
                formik.setFieldValue("backgroundImage", url)
              }
              touched={formik.touched}
              errors={formik.errors}
            />
            <div className="flex gap-3">
              <div className="w-1/2 bg-[#0D0D0D]/70 rounded-2xl border-[#2F2F2F] p-4">
                <div className="flex justify-end">
                  <Checkbox
                    id="private"
                    checked={formik.values.isPrivate}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("isPrivate", checked)
                    }
                    className="w-6 aspect-square rounded-full bg-[#0D0D0D]/10 border-white/30 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <p className="text-sm">Private</p>
                <p className="text-xs text-white/50">
                  Event secured with passcode
                </p>
              </div>
              <div className="w-1/2 bg-[#0D0D0D]/70 rounded-2xl border-[#2F2F2F] p-4">
                <div className="flex justify-end">
                  <Checkbox
                    id="hiddenFromMap"
                    checked={formik.values.hiddenFromMap}
                    onCheckedChange={(checked) =>
                      formik.setFieldValue("hiddenFromMap", checked)
                    }
                    className="w-6 aspect-square rounded-full bg-[#0D0D0D]/10 border-white/30 data-[state=checked]:bg-blue-600"
                  />
                </div>
                <p className="text-sm">Hide from map</p>
                <p className="text-xs text-white/50">Only friends can see</p>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 rounded-xl py-5 hover:bg-blue-700"
            >
              Continue
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {showPasscodeDialog && (
        <PasscodeDialog
          open={showPasscodeDialog}
          onSubmit={handlePasscodeSubmit}
          onCancel={handlePasscodeCancel}
          eventTitle={formik.values.title || "Event"}
        />
      )}
    </>
  );
}
