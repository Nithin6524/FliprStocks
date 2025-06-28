"use client";

import { useEffect } from "react";
import {
    ArrowUp,
    BarChart3,
    Calendar,
    DollarSign,
    Globe,
    TrendingUp,
    Users,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/src/components/ui/tabs";
import TradingViewChart from "@/src/components/ui/TradingViewChart";
import { useSmartStockData } from "@/src/hooks/useSmartStockData";

export function OverviewPage() {
    const symbol = "MARUTI";

    const {
        loading: infoLoading,
        error,
        loadData,
    } = useSmartStockData(symbol, "1M");

    // Load initial data
    useEffect(() => {
        loadData(symbol, "1M");
    }, []);

    const sampleStockInfo = {
        symbol: "MARUTI",
        companyName: "Maruti Suzuki India Ltd.",
        currentPrice: 11247.85,
        change: 158.45,
        changePercent: 1.43,
        marketCap: "₹3.40L Cr",
        peRatio: 25.84,
        weekRange52: "₹9,000.00 - ₹13,680.00",
        dividendYield: 1.2,
    };

    const displayStockInfo = sampleStockInfo;

    return (
        <div className="space-y-8 p-4 md:p-6 bg-white">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[#1F2937]">
                        {displayStockInfo.symbol} Overview
                    </h1>
                    <p className="text-[#6B7280] mt-1">
                        {displayStockInfo.companyName} - Automotive | NSE
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-[#1F2937]">
                        ₹
                        {displayStockInfo.currentPrice.toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                        })}
                    </div>
                    <div
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${
                            displayStockInfo.changePercent >= 0
                                ? "bg-[#10B981]/20 text-[#10B981]"
                                : "bg-[#EF4444]/20 text-[#EF4444]"
                        }`}
                    >
                        <ArrowUp
                            className={`h-3 w-3 ${
                                displayStockInfo.changePercent < 0
                                    ? "rotate-180"
                                    : ""
                            }`}
                        />
                        {Math.abs(displayStockInfo.changePercent).toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Stock Info Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                            <DollarSign className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-[#6B7280]">
                                Market Cap
                            </div>
                            <div className="text-lg font-bold text-[#1F2937]">
                                {displayStockInfo.marketCap}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                            <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-[#6B7280]">
                                P/E Ratio
                            </div>
                            <div className="text-lg font-bold text-[#1F2937]">
                                {displayStockInfo.peRatio}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                            <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-[#6B7280]">
                                52W Range
                            </div>
                            <div className="text-lg font-bold text-[#1F2937]">
                                {displayStockInfo.weekRange52}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white">
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-[#6B7280]">
                                Dividend Yield
                            </div>
                            <div className="text-lg font-bold text-[#1F2937]">
                                {displayStockInfo.dividendYield}%
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Chart Section */}
                <Card className="flex-1 bg-white">
                    <CardHeader>
                        <CardTitle className="text-[#1F2937]">
                            Stock Price Chart
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <TradingViewChart
                            symbol={symbol}
                            height={300}
                            defaultPeriod="1M"
                        />
                    </CardContent>
                </Card>

                {/* Company Profile Section */}
                <Card className="w-full lg:w-[30%] bg-white">
                    <CardHeader>
                        <CardTitle className="text-[#1F2937]">
                            Company Profile
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Globe className="h-5 w-5 text-[#6B7280]" />
                            <div>
                                <div className="text-sm font-medium text-[#1F2937]">
                                    Website
                                </div>
                                <div className="text-sm text-[#6B7280]">
                                    www.marutisuzuki.com
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="h-5 w-5 text-[#6B7280]" />
                            <div>
                                <div className="text-sm font-medium text-[#1F2937]">
                                    Employees
                                </div>
                                <div className="text-sm text-[#6B7280]">
                                    18,000+
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md bg-white p-3">
                            <div className="text-sm font-medium text-[#1F2937]">
                                About
                            </div>
                            <p className="mt-1 text-sm text-[#6B7280]">
                                Maruti Suzuki India Limited is an Indian
                                multinational automobile manufacturer
                                headquartered in New Delhi...
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white">
                <CardHeader>
                    <CardTitle className="text-[#1F2937]">
                        Key Statistics
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="valuation">
                        <TabsList className="mb-4 bg-white">
                            <TabsTrigger
                                value="valuation"
                                className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                            >
                                Valuation
                            </TabsTrigger>
                            <TabsTrigger
                                value="financial"
                                className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                            >
                                Financial
                            </TabsTrigger>
                            <TabsTrigger
                                value="trading"
                                className="data-[state=active]:bg-[#06B6D4] data-[state=active]:text-white"
                            >
                                Trading Info
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="valuation">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Market Cap
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹3.40L Cr
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Enterprise Value
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹3.25L Cr
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Trailing P/E
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        25.84
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Forward P/E
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        22.45
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        PEG Ratio (5yr)
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        1.84
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Price/Sales
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        3.24
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="financial">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Profit Margin
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        12.34%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Operating Margin
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        15.67%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        ROA
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        8.45%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        ROE
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        18.92%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Revenue
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹1,12,500 Cr
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Revenue Per Share
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹3,721
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="trading">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Beta
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        1.12
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        52-Week Change
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        +15.67%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        Nifty 52-Week Change
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        +12.45%
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        52 Week High
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹13,680.00
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        52 Week Low
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹9,000.00
                                    </div>
                                </div>
                                <div className="rounded-md bg-white p-3">
                                    <div className="text-sm text-[#6B7280]">
                                        50-Day Moving Average
                                    </div>
                                    <div className="text-lg font-medium text-[#1F2937]">
                                        ₹10,845.23
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
