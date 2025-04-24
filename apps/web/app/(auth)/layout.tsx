import type React from "react"
import { Navbar } from "@/components/navigation/navbar"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">{children}</main>
    </div>
  )
}
