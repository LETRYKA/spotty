import { Button } from "@/components/ui/button";
import { ChevronLeft, CircleCheck, Pencil, Share, Trash, Trash2 } from "lucide-react";
import { Event } from "@/types/Event";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { generateInviteLink, deleteEvent as apiDeleteEvent } from "@/lib/api";
import { toast } from "react-toastify";
import EditEventFormDialog from "./EditEventFormDialog";
import { EventDisplayLayout } from "./EventDisplayLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';

interface EventDetailContentProps {
  event: Event;
  joined: boolean;
  onBack: () => void;
  onJoin: () => void;
  onLeave: () => void;
  onRefresh?: (updatedEvent: Event) => void;
}

export const EventDetailContent = ({
  event,
  joined,
  onBack,
  onJoin,
  onLeave,
  onRefresh,
}: EventDetailContentProps) => {
  const user = useUser();
  const [inviteLink, setInviteLink] = useState("");
  const userId = user.user?.id;
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleShare = async (id: String) => {
    if (!userId) return;

    try {
      const { inviteLink } = await generateInviteLink(id as string, userId);
      setInviteLink(inviteLink);
      await navigator.clipboard.writeText(inviteLink);
      toast.success("Линк copied");
    } catch (error) {
      console.error("Error generating invite link:", error);
      toast.error("Өө алдаа гарлаа");
    }
  };

  const handleDeleteEvent = async () => {
    if (!event || !event.id || !userId) {
      toast.error("Cannot delete event: missing event ID or user ID.");
      return;
    }
    try {
      await apiDeleteEvent(event.id, userId);
      toast.success("Event deleted successfully!");
      setIsDeleteDialogOpen(false);
      router.push("/location");
    } catch (error) {
      console.error("Error deleting event:", error);
      let errorMessage = "Failed to delete event.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
      setIsDeleteDialogOpen(false);
    }
  };

  if (!event) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-3 overflow-y-scroll pb-20">
      <div className="w-full flex justify-between px-8 pt-8">
        <Button
          onClick={onBack}
          className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full w-fit px-4 aspect-square"
        >
          <ChevronLeft />
        </Button>
        <div className="flex gap-3">
          {userId && event.ownerId === userId && (
            <>
              <Button
                onClick={() => setIsDeleteDialogOpen(true)}
                className="bg-red-500/20 hover:bg-red-700/30 text-red-500 hover:text-red-400 rounded-full w-fit px-4 aspect-square"
              >
                <Trash2 />
              </Button>
              <Button
                onClick={() => setIsEditDialogOpen(true)}
                className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full w-fit px-4 aspect-square"
              >
                <Pencil />
              </Button>
            </>
          )}
          <Button
            onClick={() => handleShare(event.id)}
            className="bg-white/20 hover:bg-[#3c3a3f] text-white rounded-full w-fit px-4 aspect-square"
          >
            <Share />
          </Button>
        </div>
      </div>

      <EventDisplayLayout
        event={event}
        joined={joined}
        onJoin={onJoin}
        onLeave={onLeave}
      />

      {event && event.ownerId === userId && (
        <EditEventFormDialog
          event={event}
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onEventUpdate={(updatedEventFromDialog) => {
            toast.success("Event updated successfully!");
            if (onRefresh) {
              onRefresh(updatedEventFromDialog);
            }
            setIsEditDialogOpen(false);
          }}
        />
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[var(--foreground)]/30 backdrop-blur-lg border-[#2F2F2F] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-white/50">Эвент устгах</DialogTitle>
            <DialogDescription className="pt-2 text-white text-base">
              Та <strong>"{event?.title}"</strong> эвентийг усгахдаа итгэлтэй байна уу?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Буцах
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteEvent}
            >
              Устгах
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
