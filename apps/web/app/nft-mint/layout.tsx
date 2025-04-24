import type React from "react"
import { Navbar } from "@/components/navigation/navbar"

export default function NFTMintLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isCreator={true} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
