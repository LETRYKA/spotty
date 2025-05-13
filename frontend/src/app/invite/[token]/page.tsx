"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { fetchEvent, getInvite, joinViaInvite } from "@/lib/api";
import { formatDate } from "@/utils/DateFormatter";
import { CircleCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function InvitePage() {
  const { user } = useUser();
  const { token } = useParams();
  const router = useRouter();
  const [state, setState] = useState({
    eventId: null as string | null,
    message: "",
    loading: true,
    error: null as string | null,
  });

  interface EventData {
    backgroundImage?: string;
    title?: string;
    startAt?: string;
    isPrivate?: boolean;
    categories?: { emoji: string; name: string }[];
  }

  const [eventData, setEventData] = useState<EventData | null>(null);

  useEffect(() => {
    const fetchInviteDetails = async () => {
      if (typeof token !== "string") return;

      try {
        const { invite } = await getInvite(token);
        if (!invite?.eventId) throw new Error("Өө эвeнт олдсонгүй");
        setState((prev) => ({ ...prev, eventId: invite.eventId }));
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || "Алдаа гарлаа";
        setState((prev) => ({ ...prev, error: errorMessage }));
        toast.error(errorMessage);
      } finally {
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchInviteDetails();
  }, [token]);

  const { eventId, message, loading, error } = state;

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          const res = await fetchEvent(eventId);
          setEventData(res);
        } catch (err) {
          toast.error("Эвент мэдээлэл ачаалахад алдаа гарлаа");
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleResponse = async (accept: boolean) => {
    if (typeof token !== "string" || !user?.id) return;

    setState((prev) => ({ ...prev, loading: true, message: "", error: null }));

    try {
      const data = await joinViaInvite(token, user.id, accept);
      const successMessage =
        data.message || (accept ? "Нэгдлээ!" : "Татгалзлаа.");
      setState((prev) => ({ ...prev, message: successMessage }));

      if (accept) {
        toast.success(successMessage, {
          onClose: () => {
            router.push("/location");
          },
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
        });
      } else {
        toast.success(successMessage);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Алдаа гарлаа";
      setState((prev) => ({ ...prev, error: errorMessage }));
      toast.error(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Нэвтрэх шаардлагатай
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-110 h-auto bg-[var(--foreground)]/10 backdrop-blur-2xl border-1 border-[var(--background)]/50 rounded-3xl z-40 flex flex-col justify-start items-center p-4 gap-3">
        <div
          className="w-full h-auto aspect-10/7 bg-slate-300 rounded-xl bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: `url(${eventData?.backgroundImage})` }}
        >
          <div className="w-full absolute bottom-6 left-6 z-20 flex flex-col justify-start items-start">
            <p className="text-[var(--background)] text-xl">
              Та <strong>{eventData?.title}</strong>-д уригдлаа ✨
            </p>
            <p className="text-[var(--background)]/50 text-base">
              {formatDate(eventData?.startAt || "")}
            </p>
          </div>
          {eventData?.isPrivate && (
            <div className="absolute right-4 top-4 p-2 px-3 bg-[var(--background)]/30 backdrop-blur-sm rounded-full z-20">
              <Lock
                strokeWidth={3}
                className="stroke-[var(--background)] w-4"
              />
            </div>
          )}
          <div className="w-full h-full bg-gradient-to-b from-black/0 via-black/20 to-black absolute z-0 object-cover"></div>
        </div>
        <div className="w-full flex justify-center gap-3 my-2 px-2.5">
          <Button
            onClick={() => handleResponse(true)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 w-2/4 text-white rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
          >
            <CircleCheck strokeWidth={3} />
            Нэгдэх
          </Button>
          <Button
            onClick={() => handleResponse(false)}
            disabled={loading}
            className="bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 w-2/4 text-white/50 rounded-2xl py-8 flex flex-col gap-0 text-base hover:scale-105 transition-all"
          >
            <CircleCheck strokeWidth={3} />
            Буцах
          </Button>
        </div>
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-vid.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
