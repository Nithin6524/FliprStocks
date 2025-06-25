"use client";

import { useState } from "react";
import {
    ArrowRight,
    BarChart3,
    DollarSign,
    LineChart,
    PieChart,
    RefreshCw,
    Search,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";

const watchlistData = [
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 124.67, change: 5.23 },
    {
        symbol: "META",
        name: "Meta Platforms Inc.",
        price: 478.22,
        change: 2.15,
    },
    {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        price: 198.56,
        change: 0.87,
    },
    { symbol: "V", name: "Visa Inc.", price: 276.34, change: -0.54 },
    { symbol: "WMT", name: "Walmart Inc.", price: 67.89, change: 1.23 },
];

export function WatchlistPage() {
    return (
        <div className="p-4 md:p-6 bg-white">
            <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-[#1F2937]">Watchlist</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[#06B6D4] hover:bg-[#06B6D4]/10 hover:text-[#06B6D4]"
                    >
                        <PieChart className="mr-2 h-4 w-4" /> Edit
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {watchlistData.map((stock) => (
                            <div
                                key={stock.symbol}
                                className="flex items-center justify-between rounded-lg bg-white p-3"
                            >
                                <div>
                                    <div className="font-bold text-[#1F2937]">
                                        {stock.symbol}
                                    </div>
                                    <div className="text-xs text-[#6B7280]">
                                        {stock.name}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-right font-bold text-[#1F2937]">
                                        ${stock.price.toFixed(2)}
                                    </div>
                                    <div
                                        className={`text-right text-xs ${
                                            stock.change >= 0
                                                ? "text-[#10B981]"
                                                : "text-[#EF4444]"
                                        }`}
                                    >
                                        {stock.change >= 0 ? "+" : ""}
                                        {stock.change}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        className="mt-4 w-full bg-white text-black"
                    >
                        <BarChart3 className="mr-2 h-4 w-4 text-[#06B6D4]" />{" "}
                        Add Symbol
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
