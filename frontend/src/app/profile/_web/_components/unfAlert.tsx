"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleRemoveFriend } from "@/app/profile/_web/utils/handleRemoveFriend";

interface UnfAlertProps {
  userId: string;
  friendId: string;
}

const UnfAlert = ({ userId, friendId }: UnfAlertProps) => {
  const router = useRouter();

  const confirmRemoveFriend = async () => {
    await handleRemoveFriend(userId, friendId, () => {
      router.refresh();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="group text-white/50 text-xs font-semibold rounded-full bg-transparent hover:bg-transparent border-none shadow-none hover:underline focus-visible:ring-transparent"
          variant="default"
        >
          <X
            className="text-white/50 transition-transform duration-300 group-hover:rotate-180"
            size={10}
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] dark px-8 py-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-sm">Итгэлтэй байна уу?</AlertDialogTitle>
          <AlertDialogDescription>
            Unfriend хийлэээшдэ. Ингээд л харилцаандаа сэв шааж байгаа юм уу?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-white border-none">Болих</AlertDialogCancel>
          <AlertDialogAction onClick={confirmRemoveFriend}>
            Тэгье
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UnfAlert;