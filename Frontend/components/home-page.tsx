"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const popularStocks = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 187.32,
        change: 1.42,
    },
    // ... rest of your stock data
];

export function HomePage() {
    const [isClient, setIsClient] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSearchFocus = () => {
        searchInputRef.current?.focus();
    };

    if (!isClient) {
        return (
            <div className="relative bg-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#1F2937]">
                            Loading Market Data...
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative bg-white ">
            <section className="py-12">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#1F2937] md:text-6xl lg:text-7xl">
                            <span className="text-[#06B6D4]">Finnd</span>
                            <br />
                            <div className="text-5xl font-extrabold">
                                Lorem ipsum lorem ipsum
                            </div>
                        </h1>

                        <div className="relative z-20 mx-auto max-w-2xl">
                            <div className="relative">
                                <div className="relative rounded-lg bg-slate-200 p-1 transition-all duration-200">
                                    <div className="flex items-center">
                                        <Input
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search for stocks, indices, or cryptocurrencies..."
                                            className="h-12 flex-1 border-none bg-transparent pl-4 pr-14 text-[#1F2937] placeholder:text-[#6B7280] focus:ring-2 focus:ring-[#06B6D4]"
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                        <div className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#06B6D4]/20 text-[#06B6D4] cursor-pointer hover:bg-[#06B6D4]/30 transition-colors">
                                            <Search className="h-5 w-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market insights section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#1F2937]">
                            Latest Market Insights
                        </h2>
                        <Link href="/news">
                            <Button
                                className="bg-white text-[#1F2937] hover:bg-[#D1D5DB]"
                                size="sm"
                            >
                                View All{" "}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                title: "Fed Signals Potential Rate Cuts in Coming Months",
                                category: "Economy",
                                time: "2 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                            },
                            {
                                title: "Tech Stocks Rally on Strong Earnings Reports",
                                category: "Markets",
                                time: "4 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                            },
                            {
                                title: "Oil Prices Stabilize After Recent Volatility",
                                category: "Commodities",
                                time: "6 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                            },
                        ].map((article, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white border-[#E5E7EB] shadow-md"
                            >
                                <div className="aspect-video overflow-hidden">
                                    <img
                                        src={
                                            article.image || "/placeholder.svg"
                                        }
                                        alt={article.title}
                                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-[#6B7280]">
                                            {article.time}
                                        </span>
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-[#1F2937]">
                                        {article.title}
                                    </h3>
                                    <Link href="/news">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="px-0 text-[#06B6D4] hover:bg-white hover:text-[#06B6D4]/80"
                                        >
                                            Read More{" "}
                                            <ChevronRight className="ml-1 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
