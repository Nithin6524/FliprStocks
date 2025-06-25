"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart2,
    BarChart3,
    Calendar,
    ChevronRight,
    Home,
    LineChart,
    Menu,
    Newspaper,
    PieChart,
    Users,
    X,
} from "lucide-react";

import { useSidebar } from "@/src/components/providers/sidebarProvider";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

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
        title: "News",
        href: "/news",
        icon: Newspaper,
    },
    {
        title: "Portfolio",
        href: "/portfolio",
        icon: BarChart2,
    },
    {
        title: "Watchlist",
        href: "/watchlist",
        icon: Newspaper,
    },
];

export function AppSidebar() {
    const { open, setOpen, isMobile } = useSidebar();
    const pathname = usePathname();

    return (
        <>
            {/* Mobile overlay */}
            {isMobile && open && (
                <div
                    className="fixed inset-0 z-40 bg-white/80 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile toggle button */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed left-4 top-4 z-50 md:hidden text-[#1F2937] hover:bg-white"
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
            </Button>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-[#E5E7EB] bg-white transition-transform duration-300 ease-in-out",
                    open ? "translate-x-0" : "-translate-x-full",
                    "md:translate-x-0"
                )}
            >
                <div className="flex h-16 items-center border-b border-[#E5E7EB] px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]">
                            <div className="absolute inset-0.5 rounded-full bg-white"></div>
                            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#10B981]"></div>
                        </div>
                        <span className="text-xl font-bold text-[#1F2937]">
                            Finnd
                        </span>
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
                                            ? "bg-[#06B6D4]/20 text-[#1F2937]"
                                            : "text-[#6B7280] hover:bg-white hover:text-[#1F2937]"
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "h-5 w-5",
                                            pathname === item.href
                                                ? "text-[#06B6D4]"
                                                : "text-[#6B7280]"
                                        )}
                                    />
                                    <span>{item.title}</span>
                                    {pathname === item.href && (
                                        <ChevronRight className="ml-auto h-4 w-4 text-[#06B6D4]" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
