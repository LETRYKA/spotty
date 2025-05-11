import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";

type PasscodeDialogProps = {
  open: boolean;
  onSubmit: (password: string) => void;
  onCancel: () => void;
  eventTitle: string;
  mode: "create" | "access";
};

const passcodeSchema = z.object({
  pin: z
    .string()
    .min(4, "Passcode must be 4 digits")
    .max(4, "Passcode must be 4 digits"),
});

export default function PasscodeDialog({
  open,
  onSubmit,
  onCancel,
  eventTitle,
  mode,
}: PasscodeDialogProps) {
  const formik = useFormik({
    initialValues: { pin: "" },
    validationSchema: toFormikValidationSchema(passcodeSchema),
    onSubmit: (values) => {
      onSubmit(values.pin);
    },
  });

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-[400px] bg-black/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl p-6">
        <DialogTitle className="text-white font-bold text-xl">
          {eventTitle}
        </DialogTitle>
        <DialogDescription className="-mt-3 text-white/30 font-regular">
          {mode === "create"
            ? "Set a passcode for your private event"
            : "Enter private passcode for the event"}
        </DialogDescription>
        <form onSubmit={formik.handleSubmit} className="w-full mt-2">
          <div className="w-full flex justify-center items-center">
            <InputOTP
              maxLength={4}
              value={formik.values.pin}
              onChange={(value) => formik.setFieldValue("pin", value)}
            >
              <InputOTPGroup className="flex gap-1.5">
                <InputOTPSlot
                  index={0}
                  className="border-[#28272A] bg-[#0D0D0D] !rounded-xl p-8 border-1 text-white text-xl font-bold"
                />
                <InputOTPSlot
                  index={1}
                  className="border-[#28272A] bg-[#0D0D0D] !rounded-xl p-8 border-1 text-white text-xl font-bold"
                />
                <InputOTPSlot
                  index={2}
                  className="border-[#28272A] bg-[#0D0D0D] !rounded-xl p-8 border-1 text-white text-xl font-bold"
                />
                <InputOTPSlot
                  index={3}
                  className="border-[#28272A] bg-[#0D0D0D] !rounded-xl p-8 border-1 text-white text-xl font-bold"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {formik.touched.pin && formik.errors.pin && (
            <div className="text-red-500 text-xs mt-2 text-center">
              {formik.errors.pin}
            </div>
          )}
          <div className="w-full flex justify-center gap-3 mt-6">
            <Button
              type="button"
              onClick={onCancel}
              className="w-2/4 py-6 rounded-full bg-[#0D0D0D]/70 hover:bg-[#1F1F1F]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-2/4 py-6 rounded-full bg-blue-600 hover:bg-blue-700"
            >
              {mode === "create" ? "Create" : "Join"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
