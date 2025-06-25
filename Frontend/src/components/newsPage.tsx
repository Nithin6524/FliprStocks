"use client";

import { Calendar, ExternalLink, Filter, Search } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

export function NewsPage() {
    return (
        <div className="space-y-8 p-4 md:p-6 bg-white">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#1F2937]">
                        Market News
                    </h1>
                    <p className="text-[#6B7280] mt-1">
                        Latest updates and insights for AAPL and the market
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full md:w-auto">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                        <Input
                            type="text"
                            placeholder="Search news..."
                            className="pl-9 md:w-[200px] bg-white border-[#E5E7EB] text-[#1F2937] placeholder:text-[#6B7280]"
                        />
                    </div>
                    <Button
                        className="bg-white text-[#1F2937] hover:bg-[#D1D5DB]"
                        size="sm"
                    >
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <TabsList className="bg-white">
                        <TabsTrigger
                            value="all"
                            className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                        >
                            All News
                        </TabsTrigger>
                        <TabsTrigger
                            value="aapl"
                            className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                        >
                            AAPL News
                        </TabsTrigger>
                        <TabsTrigger
                            value="market"
                            className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                        >
                            Market News
                        </TabsTrigger>
                        <TabsTrigger
                            value="earnings"
                            className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                        >
                            Earnings
                        </TabsTrigger>
                    </TabsList>
                    <Select defaultValue="latest">
                        <SelectTrigger className="w-[180px] bg-white border-[#E5E7EB] text-[#1F2937]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-[#E5E7EB]">
                            <SelectItem
                                value="latest"
                                className="text-[#1F2937] hover:bg-white"
                            >
                                Latest First
                            </SelectItem>
                            <SelectItem
                                value="oldest"
                                className="text-[#1F2937] hover:bg-white"
                            >
                                Oldest First
                            </SelectItem>
                            <SelectItem
                                value="relevance"
                                className="text-[#1F2937] hover:bg-white"
                            >
                                Relevance
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <TabsContent value="all" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Apple's AI Strategy: What to Expect at WWDC 2024",
                                source: "TechCrunch",
                                date: "2 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Technology",
                                summary:
                                    "Apple is expected to unveil its AI strategy at WWDC 2024, potentially introducing new features for iOS 18 and macOS 15.",
                            },
                            {
                                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                                source: "Bloomberg",
                                date: "5 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
                            },
                            {
                                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                                source: "CNBC",
                                date: "6 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
                            },
                            {
                                title: "Apple Supplier TSMC Reports Strong Demand for Advanced Chips",
                                source: "Reuters",
                                date: "8 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Supply Chain",
                                summary:
                                    "TSMC, a key Apple supplier, reported strong demand for advanced chips, potentially benefiting Apple's future products.",
                            },
                            {
                                title: "Apple's iPhone 16 Production Ramps Up Ahead of Fall Launch",
                                source: "Wall Street Journal",
                                date: "10 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Products",
                                summary:
                                    "Apple has reportedly started ramping up production of the iPhone 16 series ahead of its expected fall launch.",
                            },
                            {
                                title: "Tech Stocks Rally as Market Anticipates Fed Rate Cut",
                                source: "Financial Times",
                                date: "12 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Market",
                                summary:
                                    "Tech stocks, including Apple, rallied as investors anticipate a potential Federal Reserve interest rate cut.",
                            },
                        ].map((article, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white"
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
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                                            <Calendar className="h-3 w-3" />{" "}
                                            {article.date}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg text-[#1F2937]">
                                        {article.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="line-clamp-3 text-sm text-[#6B7280]">
                                        {article.summary}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t border-[#E5E7EB] p-4">
                                    <span className="text-xs font-medium text-[#1F2937]">
                                        {article.source}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1 text-[#06B6D4] hover:text-[#06B6D4]/80 hover:bg-white"
                                    >
                                        Read More{" "}
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                        <Button className="bg-white text-[#1F2937] hover:bg-[#D1D5DB]">
                            Load More News
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="aapl" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Apple's AI Strategy: What to Expect at WWDC 2024",
                                source: "TechCrunch",
                                date: "2 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Technology",
                                summary:
                                    "Apple is expected to unveil its AI strategy at WWDC 2024, potentially introducing new features for iOS 18 and macOS 15.",
                            },
                            {
                                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                                source: "Bloomberg",
                                date: "5 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
                            },
                            {
                                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                                source: "CNBC",
                                date: "6 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
                            },
                        ].map((article, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white"
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
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                                            <Calendar className="h-3 w-3" />{" "}
                                            {article.date}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg text-[#1F2937]">
                                        {article.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="line-clamp-3 text-sm text-[#6B7280]">
                                        {article.summary}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t border-[#E5E7EB] p-4">
                                    <span className="text-xs font-medium text-[#1F2937]">
                                        {article.source}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1 text-[#06B6D4] hover:text-[#06B6D4]/80 hover:bg-white"
                                    >
                                        Read More{" "}
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="market" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Tech Stocks Rally as Market Anticipates Fed Rate Cut",
                                source: "Financial Times",
                                date: "12 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Market",
                                summary:
                                    "Tech stocks, including Apple, rallied as investors anticipate a potential Federal Reserve interest rate cut.",
                            },
                            {
                                title: "S&P 500 Reaches New All-Time High Amid Tech Sector Strength",
                                source: "Wall Street Journal",
                                date: "1 day ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Market",
                                summary:
                                    "The S&P 500 reached a new all-time high, driven by strong performance in the technology sector.",
                            },
                            {
                                title: "Market Volatility Increases as Earnings Season Begins",
                                source: "Bloomberg",
                                date: "2 days ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Market",
                                summary:
                                    "Market volatility has increased as the Q2 earnings season begins, with investors closely watching tech giants.",
                            },
                        ].map((article, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white"
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
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                                            <Calendar className="h-3 w-3" />{" "}
                                            {article.date}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg text-[#1F2937]">
                                        {article.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="line-clamp-3 text-sm text-[#6B7280]">
                                        {article.summary}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t border-[#E5E7EB] p-4">
                                    <span className="text-xs font-medium text-[#1F2937]">
                                        {article.source}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1 text-[#06B6D4] hover:text-[#06B6D4]/80 hover:bg-white"
                                    >
                                        Read More{" "}
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="earnings" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                                source: "Bloomberg",
                                date: "5 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
                            },
                            {
                                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                                source: "CNBC",
                                date: "6 hours ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
                            },
                            {
                                title: "Tech Earnings Season: What to Expect from Big Tech",
                                source: "Reuters",
                                date: "1 day ago",
                                image: "/placeholder.svg?height=200&width=400",
                                category: "Earnings",
                                summary:
                                    "An overview of what to expect from major tech companies during the current earnings season.",
                            },
                        ].map((article, index) => (
                            <Card
                                key={index}
                                className="overflow-hidden bg-white"
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
                                <CardHeader className="p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-full bg-[#06B6D4]/20 px-2 py-1 text-xs font-medium text-[#06B6D4]">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                                            <Calendar className="h-3 w-3" />{" "}
                                            {article.date}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2 text-lg text-[#1F2937]">
                                        {article.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="line-clamp-3 text-sm text-[#6B7280]">
                                        {article.summary}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between border-t border-[#E5E7EB] p-4">
                                    <span className="text-xs font-medium text-[#1F2937]">
                                        {article.source}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 gap-1 text-[#06B6D4] hover:text-[#06B6D4]/80 hover:bg-white"
                                    >
                                        Read More{" "}
                                        <ExternalLink className="h-3 w-3" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
