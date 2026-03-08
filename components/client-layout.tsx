"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CommandPalette from "@/components/command-palette";

export default function ClientLayout({ children }) {
  const [cmdOpen, setCmdOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearchOpen={() => setCmdOpen(true)} />
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
