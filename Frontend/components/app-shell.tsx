"use client"

import type * as React from "react"

import { AppSidebar } from "@/components/app-sidebar"
import { useSidebar } from "@/components/sidebar-provider"
import { cn } from "@/lib/utils"

export function AppShell({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar()

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className={cn("flex-1 ", open && !isMobile ? "ml-64" : "ml-0")+ " bg-white"}>
        <div className="container mx-auto p-4 md:p-6 bg-white">{children}</div>
      </main>
    </div>
  )
}
