import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@headlessui/react";
import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import UploadIcon from "/public/Group 55 (1).png";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CreateEvent() {
  const [bgPreview, setBgPreview] = useState<string | null>(null);

  const initialValues = {
    title: "",
    categories: "",
    description: "",
    date: "",
    slot: "",
    backgroundImage: null,
    galleryImages: [],
    isPrivate: false,
    hideFromMap: false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    categories: Yup.string().required("Required"),
    date: Yup.string().required("Required"),
    backgroundImage: Yup.mixed().required("Required"),
  });

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("categories", values.categories);
    formData.append("description", values.description);
    formData.append("date", values.date);
    formData.append("slot", values.slot || "∞");
    formData.append("isPrivate", String(values.isPrivate));
    formData.append("hideFromMap", String(values.hideFromMap));

    if (values.backgroundImage) {
      formData.append("backgroundImage", values.backgroundImage);
    }

    values.galleryImages.forEach((img: File) => {
      formData.append("galleryImages", img);
    });

    const res = await fetch("/api/events", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Upload failed");
    } else {
      console.log("Event created");
    }
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
        <div className="w-full rounded-3xl text-white space-y-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Field
                      name="title"
                      placeholder="Title"
                      className="w-full bg-[#0D0D0D]/70 p-3 rounded-lg outline-none text-sm border-1 border-[#2F2F2F]"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-[var(--destructive)] text-xs mt-2"
                    />
                  </div>
                  <div>
                    <Field
                      name="categories"
                      as="select"
                      className="w-full bg-[#0D0D0D]/70 p-3 rounded-lg outline-none text-sm border-1 border-[#2F2F2F]"
                    >
                      <option value="">Categories</option>
                      <option value="music">Music</option>
                      <option value="sports">Sports</option>
                      <option value="hangout">Hangout</option>
                    </Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-[var(--destructive)] text-xs mt-2"
                    />
                  </div>
                </div>

                <Field
                  as="textarea"
                  name="description"
                  placeholder="Description"
                  rows={4}
                  className="w-full bg-[#0D0D0D]/70 p-3 rounded-xl outline-none text-sm border-1 border-[#2F2F2F]"
                />

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    type="datetime-local"
                    name="date"
                    className="w-full bg-[#0D0D0D]/70 p-3 rounded-lg outline-none text-sm border-1 border-[#2F2F2F]"
                  />
                  <Field
                    name="slot"
                    placeholder="Slot"
                    className="w-full bg-[#0D0D0D]/70 p-3 rounded-lg outline-none text-sm border-1 border-[#2F2F2F]"
                  />
                </div>

                <div className="border-2 border-dashed border-[#2c2c2c] p-2 rounded-2xl text-center">
                  <label className="block cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.currentTarget.files?.[0];
                        if (file) {
                          setFieldValue("backgroundImage", file);
                          setBgPreview(URL.createObjectURL(file));
                        }
                      }}
                    />
                    {bgPreview ? (
                      <img
                        src={bgPreview}
                        className="w-full h-40 object-cover rounded-xl  "
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
                          <span className="text-blue-500 underline">
                            browse
                          </span>
                        </p>
                        <p className="text-[0.55rem] text-gray-500 mt-1">
                          Supports: JPEG, JPEG2000, PNG
                        </p>
                      </div>
                    )}
                  </label>
                  <ErrorMessage
                    name="backgroundImage"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1E1E1E] rounded-xl">
                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-xs text-gray-400">
                      It will be secured with 4 digit passcode
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#1E1E1E] rounded-xl">
                  <div>
                    <p className="font-medium">Hide from the map</p>
                    <p className="text-xs text-gray-400">
                      Only your friends can see the event
                    </p>
                  </div>
                  <Switch
                    checked={values.hideFromMap}
                    onChange={(val) => setFieldValue("hideFromMap", val)}
                    className={clsx(
                      "relative inline-flex h-6 w-11 items-center rounded-full",
                      values.hideFromMap ? "bg-blue-600" : "bg-gray-500"
                    )}
                  >
                    <span
                      className={clsx(
                        "inline-block h-4 w-4 transform rounded-full bg-white transition",
                        values.hideFromMap ? "translate-x-6" : "translate-x-1"
                      )}
                    />
                  </Switch>
                </div>
                <div className="w-full flex gap-3">
                  <div className="w-2/4 h-28 bg-[#0D0D0D]/70 rounded-2xl border-1 border-[#303030] p-4">
                    <div className="w-full h-2/4">
                      <Checkbox id="private" />
                    </div>
                    <div className="w-full h-2/4 flex flex-col gap-0.5">
                      <p className="text-sm text-[var(--background)]">
                        Regular
                      </p>
                      <p className="text-xs text-[var(--background)]/50">
                        Event secured with passcode
                      </p>
                    </div>
                  </div>
                  <div className="w-2/4 h-28 bg-[#0D0D0D]/70 rounded-2xl"></div>
                </div>

                <div className="flex justify-between gap-3 pt-4">
                  <button
                    type="button"
                    className="flex-1 bg-[#2a2a2a] text-white py-3 rounded-xl"
                  >
                    Maybe later
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                  >
                    Continue
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// Enkhjin was here
