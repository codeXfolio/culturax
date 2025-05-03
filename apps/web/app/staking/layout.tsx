import type React from "react";
import { Header } from "@/components/navigation/header";

export default function StakingLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <div className="flex min-h-screen flex-col">
         <Header />
         <main className="flex-1">{children}</main>
      </div>
   );
}
