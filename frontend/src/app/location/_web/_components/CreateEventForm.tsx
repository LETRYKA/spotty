import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FormikProps } from "formik";
import CategoryDropdown from "./CategoryDropDown";
import DateTimePicker from "./DateTimePicker";
import ImageGallery from "./ImageGallery";
import { PrivacyOptions } from "./PrivacyOptions";

interface EventFormValues {
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

interface CreateEventFormProps {
  formik: FormikProps<EventFormValues>;
  categories: { id: string; name: string; emoji: string }[];
}

const CreateEventForm = ({ formik, categories }: CreateEventFormProps) => {
  return (
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
        <CategoryDropdown
          categories={categories}
          selectedCategories={formik.values.categories}
          onToggleCategory={(categoryId) => {
            const currentCategories = formik.values.categories;
            formik.setFieldValue(
              "categories",
              currentCategories.includes(categoryId)
                ? currentCategories.filter((c) => c !== categoryId)
                : [...currentCategories, categoryId]
            );
          }}
          error={
            formik.touched.categories ? formik.errors.categories : undefined
          }
        />
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
            touched={!!formik.touched.startAt}
            error={
              typeof formik.errors.startAt === "string"
                ? formik.errors.startAt
                : undefined
            }
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
                e.target.value === "" ? undefined : parseInt(e.target.value)
              )
            }
            className="bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl"
          />
        </div>
      </div>

      <ImageGallery
        galleryImages={formik.values.galleryImages}
        setGalleryImages={(urls) => formik.setFieldValue("galleryImages", urls)}
        backgroundImage={formik.values.backgroundImage}
        setBackgroundImage={(url) =>
          formik.setFieldValue("backgroundImage", url)
        }
        touched={formik.touched}
        errors={formik.errors}
      />

      <div className="flex gap-3">
        <PrivacyOptions formik={formik} />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 rounded-xl py-5 hover:bg-blue-700"
      >
        Continue
      </Button>
    </form>
  );
};

export default CreateEventForm;
