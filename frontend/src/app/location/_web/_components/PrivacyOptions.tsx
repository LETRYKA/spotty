import { Checkbox } from "@/components/ui/checkbox";
import { FormikProps } from "formik";

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

interface PrivacyOptionsProps {
  formik: FormikProps<EventFormValues>;
}

export const PrivacyOptions = ({ formik }: PrivacyOptionsProps) => {
  return (
    <>
      <div className="w-1/2 bg-[#0D0D0D]/70 rounded-2xl border-[#2F2F2F] p-4">
        <div className="flex justify-end">
          <Checkbox
            id="private"
            checked={formik.values.isPrivate}
            onCheckedChange={(checked) =>
              formik.setFieldValue("isPrivate", checked)
            }
            className="w-6 h-auto aspect-square rounded-full bg-[#0D0D0D]/10 border-white/30 data-[state=checked]:bg-blue-600"
          />
        </div>
        <p className="text-sm">Private</p>
        <p className="text-xs text-white/50">Event secured with passcode</p>
      </div>
      <div className="w-1/2 bg-[#0D0D0D]/70 rounded-2xl border-[#2F2F2F] p-4">
        <div className="flex justify-end">
          <Checkbox
            id="hiddenFromMap"
            checked={formik.values.hiddenFromMap}
            onCheckedChange={(checked) =>
              formik.setFieldValue("hiddenFromMap", checked)
            }
            className="w-6 h-auto aspect-square rounded-full bg-[#0D0D0D]/10 border-white/30 data-[state=checked]:bg-blue-600"
          />
        </div>
        <p className="text-sm">Hide from map</p>
        <p className="text-xs text-white/50">Only friends can see</p>
      </div>
    </>
  );
};
