import { ToastContainer, Slide } from "react-toastify";
import { ClerkProvider } from "@clerk/nextjs";
import { Manrope } from "next/font/google";
import "@/app/globals.css";

const manRope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-wrk-sans",
});

export default function LayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={manRope.variable}>
      <ClerkProvider>{children}</ClerkProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </div>
  );
}
