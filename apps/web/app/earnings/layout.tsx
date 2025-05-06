import type React from "react";
import { Navbar } from "@/components/navigation/navbar";

export default function EarningsLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex min-h-screen flex-col">
         <main className="flex-1">{children}</main>
      </div>
   );
}
