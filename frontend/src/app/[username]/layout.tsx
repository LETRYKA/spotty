"use client";

import LayoutComp from "@/components/LayoutComp";
import { DockComp } from "@/components/Dock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <LayoutComp>
      {children}
      <DockComp />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </LayoutComp>
  );
}
