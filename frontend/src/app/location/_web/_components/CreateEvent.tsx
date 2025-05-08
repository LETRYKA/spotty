import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import UploadIcon from "/public/Group 55 (1).png";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, Clock } from "lucide-react";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const eventSchema = z.object({
  title: z.string().max(12, "Title must be at most 12 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  description: z.string().optional(),
  dateTime: z.date({ required_error: "Date and time are required" }),
  slot: z.number().optional(),
  backgroundImage: z.instanceof(File, {
    message: "Background image is required",
  }),
  isPrivate: z.boolean().default(false),
  hideFromMap: z.boolean().default(false),
});

export default function CreateEvent() {
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      title: "",
      categories: [] as string[],
      description: "",
      dateTime: undefined as Date | undefined,
      slot: undefined as number | undefined,
      backgroundImage: null as File | null,
      isPrivate: false,
      hideFromMap: false,
    },
    validationSchema: toFormikValidationSchema(eventSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      const file = event.currentTarget.files[0];
      formik.setFieldValue("backgroundImage", file);
      setBgPreview(URL.createObjectURL(file));
    }
  };

  const toggleCategory = (category: string) => {
    const currentCategories = formik.values.categories;
    if (currentCategories.includes(category)) {
      formik.setFieldValue(
        "categories",
        currentCategories.filter((c) => c !== category)
      );
    } else {
      formik.setFieldValue("categories", [...currentCategories, category]);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      const currentDateTime = formik.values.dateTime;
      if (currentDateTime) {
        date.setHours(currentDateTime.getHours());
        date.setMinutes(currentDateTime.getMinutes());
      } else {
        date.setHours(12);
        date.setMinutes(0);
      }
      formik.setFieldValue("dateTime", date);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string
  ) => {
    let currentDate = formik.values.dateTime;

    if (!currentDate) {
      currentDate = new Date();
      currentDate.setHours(12);
      currentDate.setMinutes(0);
    }

    const newDate = new Date(currentDate);

    if (type === "hour") {
      const hour = parseInt(value, 10);
      const isPM = newDate.getHours() >= 12;
      newDate.setHours(isPM ? hour + 12 : hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    } else if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      } else if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    formik.setFieldValue("dateTime", newDate);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-black/30 backdrop-blur-lg border-1 border-[#2F2F2F] rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-white font-semibold text-xl">
            Create Event
          </DialogTitle>
          <DialogDescription className="-mt-2">
            Enter your event details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
          <div className="flex w-full justify-center items-start gap-3">
            <div className="w-2/4">
              <Input
                name="title"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={12}
                className="w-full bg-[#0D0D0D]/70 p-3 py-6 rounded-xl outline-none text-sm border-1 border-[#2F2F2F]"
              />
              {formik.touched.title && formik.errors.title && (
                <div className="text-[var(--destructive)] text-xs mt-2">
                  {formik.errors.title}
                </div>
              )}
            </div>
            <div className="flex flex-col w-2/4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full py-6 bg-[#0D0D0D]/70 rounded-xl border-1 border-[#2F2F2F] text-[var(--background)] text-sm flex justify-between items-center hover:bg-[#111111] hover:text-[var(--background]"
                  >
                    Category
                    <ChevronDown className="text-[var(--background)]/50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-54 dark">
                  <DropdownMenuCheckboxItem
                    checked={formik.values.categories.includes("Status Bar")}
                    onCheckedChange={() => toggleCategory("Status Bar")}
                  >
                    Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={formik.values.categories.includes("Panel")}
                    onCheckedChange={() => toggleCategory("Panel")}
                  >
                    Panel
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {formik.touched.categories && formik.errors.categories && (
                <div className="text-[var(--destructive)] text-xs mt-2">
                  {formik.errors.categories}
                </div>
              )}
            </div>
          </div>
          <Textarea
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            rows={4}
            className="w-full min-h-24 bg-[#0D0D0D]/70 p-3 rounded-xl outline-none text-sm border-1 border-[#2F2F2F] text-[var(--background)]"
          />
          <div className="w-full flex justify-center items-enter gap-3">
            <div className="flex flex-col w-2/4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-[#0D0D0D]/70 border-[#2F2F2F] py-6 rounded-xl text-[var(--background)]",
                      !formik.values.dateTime && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formik.values.dateTime ? (
                      format(formik.values.dateTime, "MM/dd/yyyy hh:mm aa")
                    ) : (
                      <span>Pick a date and time</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-[#0D0D0D] border-[#2F2F2F] text-[var(--background)] rounded-2xl"
                  align="start"
                >
                  <div className="sm:flex">
                    <Calendar
                      mode="single"
                      selected={formik.values.dateTime}
                      onSelect={handleDateSelect}
                      initialFocus
                      className="bg-[#0D0D0D]"
                    />
                    <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x divide-[#2F2F2F]">
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i + 1)
                            .reverse()
                            .map((hour) => (
                              <Button
                                key={hour}
                                size="icon"
                                variant={
                                  formik.values.dateTime &&
                                  formik.values.dateTime.getHours() % 12 ===
                                    hour % 12
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square bg-[#0D0D0D] hover:bg-[#1F1F1F]"
                                onClick={() =>
                                  handleTimeChange("hour", hour.toString())
                                }
                              >
                                {hour}
                              </Button>
                            ))}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="w-64 sm:w-auto">
                        <div className="flex sm:flex-col p-2">
                          {Array.from({ length: 12 }, (_, i) => i * 5).map(
                            (minute) => (
                              <Button
                                key={minute}
                                size="icon"
                                variant={
                                  formik.values.dateTime &&
                                  formik.values.dateTime.getMinutes() === minute
                                    ? "default"
                                    : "ghost"
                                }
                                className="sm:w-full shrink-0 aspect-square bg-[#0D0D0D] hover:bg-[#1F1F1F]"
                                onClick={() =>
                                  handleTimeChange("minute", minute.toString())
                                }
                              >
                                {minute.toString().padStart(2, "0")}
                              </Button>
                            )
                          )}
                        </div>
                        <ScrollBar
                          orientation="horizontal"
                          className="sm:hidden"
                        />
                      </ScrollArea>
                      <ScrollArea className="">
                        <div className="flex sm:flex-col p-2">
                          {["AM", "PM"].map((ampm) => (
                            <Button
                              key={ampm}
                              size="icon"
                              variant={
                                formik.values.dateTime &&
                                ((ampm === "AM" &&
                                  formik.values.dateTime.getHours() < 12) ||
                                  (ampm === "PM" &&
                                    formik.values.dateTime.getHours() >= 12))
                                  ? "default"
                                  : "ghost"
                              }
                              className="sm:w-full shrink-0 aspect-square bg-[#0D0D0D] hover:bg-[#1F1F1F]"
                              onClick={() => handleTimeChange("ampm", ampm)}
                            >
                              {ampm}
                            </Button>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {formik.touched.dateTime && formik.errors.dateTime && (
                <div className="text-[var(--destructive)] text-xs mt-2">
                  {formik.errors.dateTime as string}
                </div>
              )}
            </div>
            <Input
              name="slot"
              type="number"
              placeholder="Slot"
              value={formik.values.slot || ""}
              onChange={(e) => {
                const value = e.target.value;
                formik.setFieldValue(
                  "slot",
                  value === "" ? undefined : parseInt(value)
                );
              }}
              className="w-2/4 bg-[#0D0D0D]/70 py-6 rounded-xl outline-none text-sm border-1 border-[#2F2F2F] text-[var(--background)]"
            />
          </div>

          <div className="border-2 border-dashed border-[#2c2c2c] p-2 rounded-2xl text-center">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {bgPreview ? (
                <img
                  src={bgPreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl"
                />
              ) : (
                <div className="my-6">
                  <img
                    src={UploadIcon.src}
                    alt="upload"
                    className="mx-auto mb-2 w-16 h-auto"
                  />
                  <p className="text-xs text-gray-400">
                    Drop your image here, or{" "}
                    <span className="text-blue-500 underline">browse</span>
                  </p>
                  <p className="text-[0.55rem] text-gray-500 mt-1">
                    Supports: JPEG, JPEG2000, PNG
                  </p>
                </div>
              )}
            </label>
            {formik.touched.backgroundImage &&
              formik.errors.backgroundImage && (
                <div className="text-[var(--destructive)] text-xs mt-2">
                  {formik.errors.backgroundImage}
                </div>
              )}
          </div>

          <div className="w-full flex gap-3">
            <div className="w-2/4 h-28 bg-[#0D0D0D]/70 rounded-2xl border-1 border-[#303030] p-4">
              <div className="w-full flex items-start justify-end space-x-2 h-2/4">
                <Checkbox
                  id="private"
                  checked={formik.values.isPrivate}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("isPrivate", checked)
                  }
                  className="w-6 h-auto aspect-square rounded-full bg-[#0D0D0D]/10 border-[var(--background)]/30 data-[state=checked]:bg-blue-600"
                />
              </div>
              <div className="w-full h-2/4 flex flex-col gap-0.5">
                <p className="text-sm text-[var(--background)]">Private</p>
                <p className="text-xs text-[var(--background)]/50">
                  Event secured with passcode
                </p>
              </div>
            </div>
            <div className="w-2/4 h-28 bg-[#0D0D0D]/70 rounded-2xl border-1 border-[#303030] p-4">
              <div className="w-full flex items-start justify-end space-x-2 h-2/4">
                <Checkbox
                  id="hideFromMap"
                  checked={formik.values.hideFromMap}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("hideFromMap", checked)
                  }
                  className="w-6 h-auto aspect-square rounded-full bg-[#0D0D0D] border-[var(--background)]/30 data-[state=checked]:bg-blue-600"
                />
              </div>
              <div className="w-full h-2/4 flex flex-col gap-0.5">
                <p className="text-sm text-[var(--background)]">
                  Hide from the map
                </p>
                <p className="text-xs text-[var(--background)]/50">
                  Only friends can see
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-blue-600 text-[var(--background)] font-bold py-6 rounded-xl hover:bg-blue-700 transition-all"
            >
              Continue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Ekhjin was here
