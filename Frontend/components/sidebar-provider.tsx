"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

import { useMobile } from "@/hooks/use-mobile"

type SidebarContext = {
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useMobile()
  const [open, setOpen] = React.useState(!isMobile)
  const pathname = usePathname()

  // Close sidebar on mobile when navigating
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    }
  }, [pathname, isMobile])

  // Set open state based on mobile status
  React.useEffect(() => {
    setOpen(!isMobile)
  }, [isMobile])

  return <SidebarContext.Provider value={{ open, setOpen, isMobile }}>{children}</SidebarContext.Provider>
}
