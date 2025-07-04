import type React from "react"
import { SidebarProvider } from "@/components/sidebar-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Finnd</title>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
