"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormikProps } from "formik";
import CategoryDropdown from "./CategoryDropDown";
import DateTimePicker from "./DateTimePicker";
import ImageGallery from "./ImageGallery";
import { PrivacyOptions } from "./PrivacyOptions";
import { EventFormValues } from "./EditEventFormDialog";

interface EventFormFieldsProps {
  formik: FormikProps<EventFormValues>;
  categoriesList: { id: string; name: string; emoji: string }[];
  handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>, formikInstance: FormikProps<EventFormValues>) => void;
  isMobile?: boolean; // optional flag
}

export const EventFormFields = ({
  formik,
  categoriesList,
  handlePasswordChange,
}: EventFormFieldsProps) => {
  return (
    <div className="space-y-4 pt-4">
      {/* Title + Category */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <Input
            name="title"
            placeholder="Title"
            maxLength={50}
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-4 rounded-xl w-full"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.title}
            </div>
          )}
        </div>
        <CategoryDropdown
          categories={categoriesList}
          selectedCategories={formik.values.categories}
          onToggleCategory={(categoryId) => {
            const current = formik.values.categories;
            const updated = current.includes(categoryId)
              ? current.filter((c: string) => c !== categoryId)
              : [...current, categoryId];
            formik.setFieldValue("categories", updated);
          }}
          error={
            formik.touched.categories && formik.errors.categories
              ? String(formik.errors.categories)
              : undefined
          }
        />
      </div>

      {/* Description */}
      <div>
        <Textarea
          name="description"
          placeholder="Description"
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-[#0D0D0D]/70 border-[#2F2F2F] rounded-xl p-3 w-full"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.description}
          </div>
        )}
      </div>

      {/* Date & Time */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <DateTimePicker
            value={formik.values.startAt}
            onChange={(date) => formik.setFieldValue("startAt", date)}
            touched={!!formik.touched.startAt}
            error={
              formik.touched.startAt && typeof formik.errors.startAt === "string"
                ? formik.errors.startAt
                : undefined
            }
          />
        </div>
        <div className="w-full sm:w-1/2">
          <DateTimePicker
            value={formik.values.endAt}
            onChange={(date) => formik.setFieldValue("endAt", date)}
            touched={!!formik.touched.endAt}
            error={
              formik.touched.endAt && typeof formik.errors.endAt === "string"
                ? formik.errors.endAt
                : undefined
            }
          />
        </div>
      </div>

      {/* Participant Limit */}
      <div>
        <Input
          name="participantLimit"
          type="number"
          placeholder="Participant Limit (Slot)"
          value={formik.values.participantLimit || ""}
          onChange={(e) =>
            formik.setFieldValue(
              "participantLimit",
              e.target.value === "" ? undefined : parseInt(e.target.value)
            )
          }
          onBlur={formik.handleBlur}
          className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-4 rounded-xl w-full"
        />
        {formik.touched.participantLimit && formik.errors.participantLimit && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.participantLimit}
          </div>
        )}
      </div>

      {/* Image Upload */}
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

      {/* Privacy Toggle */}
      <div className="w-full">
        <PrivacyOptions formik={formik} />
      </div>

      {/* Password Input if Private */}
      {formik.values.isPrivate && (
        <div>
          <Input
            name="password"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="4 оронтой нууц код"
            value={formik.values.password}
            onChange={(e) => handlePasswordChange(e, formik)}
            onBlur={formik.handleBlur}
            className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-4 rounded-xl w-full mt-2"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
