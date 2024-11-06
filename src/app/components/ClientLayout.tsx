// src/app/components/ClientLayout.tsx
"use client"; // This component will be a client component

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current pathname
  const isAdmin = pathname.startsWith("/admin"); // Check if the pathname starts with "/admin"

  return (
    <>
      {!isAdmin && <Navbar />} {/* Render Navbar only if not on admin route */}
      {children} {/* Render the children (current page content) */}
      {!isAdmin && <Footer />} {/* Render Footer only if not on admin route */}
    </>
  );
}
