import type React from "react";

export default function TokenGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="min-h-screen flex flex-col">{children}</div>;
}
