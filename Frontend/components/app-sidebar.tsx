"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Calendar, ChevronRight, Home, LineChart, Menu, Newspaper, PieChart, Users, X } from "lucide-react"

import { useSidebar } from "@/components/sidebar-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Overview",
    href: "/overview",
    icon: BarChart3,
  },
  {
    title: "AI Forecasting",
    href: "/ai-forecasting",
    icon: LineChart,
  },
  {
    title: "Earnings",
    href: "/earnings",
    icon: Calendar,
  },
  {
    title: "Financials",
    href: "/financials",
    icon: PieChart,
  },
  {
    title: "News",
    href: "/news",
    icon: Newspaper,
  },
  {
    title:"Watchlist",
    href:"/watchlist",
    icon:Newspaper,
  }
]

export function AppSidebar() {
  const { open, setOpen, isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && open && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Mobile toggle button */}
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={() => setOpen(!open)}>
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-sidebar-background transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-primary to-secondary">
              <div className="absolute inset-0.5 rounded-full bg-sidebar-background"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
            </div>
            <span className="text-xl font-bold">StockInsight</span>
          </Link>
        </div>

        <nav className="mt-6 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-border p-4">
          <div className="rounded-md bg-muted p-3">
            <div className="text-xs font-medium text-muted-foreground">Selected Stock</div>
            <div className="mt-1 flex items-center justify-between">
              <div className="font-medium">AAPL</div>
              <div className="text-sm font-medium text-green-500">+1.42%</div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Apple Inc. - $187.32</div>
          </div>
        </div>
      </aside>
    </>
  )
}
