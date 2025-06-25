import type React from "react"
import { SidebarProvider } from "@/src/components/providers/sidebarProvider"
import { ThemeProvider } from "@/src/components/providers/themeProvider"
import { Toaster } from "@/src/components/ui/toaster"
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
        <ThemeProvider>
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
  generator: 'v0.dev'
};
