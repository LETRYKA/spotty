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
}

export const EventFormFields = ({
  formik,
  categoriesList,
  handlePasswordChange,
}: EventFormFieldsProps) => {
  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 pt-4">
      <div className="flex gap-4">
        <div className="w-1/2">
          <Input
            name="title"
            placeholder="Title"
            maxLength={50}
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
        <CategoryDropdown
          categories={categoriesList}
          selectedCategories={formik.values.categories}
          onToggleCategory={(categoryId) => {
            const currentCategories = formik.values.categories;
            formik.setFieldValue(
              "categories",
              currentCategories.includes(categoryId)
                ? currentCategories.filter((c: string) => c !== categoryId)
                : [...currentCategories, categoryId]
            );
          }}
          error={
            formik.touched.categories && formik.errors.categories
              ? String(formik.errors.categories)
              : undefined
          }
        />
      </div>

      <Textarea
        name="description"
        placeholder="Description"
        rows={4}
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="bg-[#0D0D0D]/70 border-[#2F2F2F] rounded-xl p-3"
      />
      {formik.touched.description && formik.errors.description && (
        <div className="text-red-500 text-xs mt-1">
          {formik.errors.description}
        </div>
      )}

      <div className="flex gap-4">
        <div className="w-1/2">
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
        <div className="w-1/2">
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

      <div className="w-full pr-2">
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
          className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl"
        />
        {formik.touched.participantLimit && formik.errors.participantLimit && (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.participantLimit}
          </div>
        )}
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

      <div className="flex w-full gap-3">
        <PrivacyOptions formik={formik} />
      </div>
      {formik.values.isPrivate && (
        <div>
          <Input
            name="password"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="4 оронтой тоо"
            value={formik.values.password}
            onChange={(e) => handlePasswordChange(e, formik)}
            onBlur={formik.handleBlur}
            className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl mt-2"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-xs mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
      )}
    </form>
  );
}; 