"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/src/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/src/components/ui/chart";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PieChartIcon,
    Activity,
    ArrowUp,
    ArrowDown,
    DollarSign,
    Building2,
    Coins,
    Home,
} from "lucide-react";

// Mock data
const portfolioData = [
    { date: "Jan", value: 850000 },
    { date: "Feb", value: 920000 },
    { date: "Mar", value: 880000 },
    { date: "Apr", value: 950000 },
    { date: "May", value: 1020000 },
    { date: "Jun", value: 1150000 },
];

const holdings = [
    {
        name: "Reliance Industries",
        symbol: "RELIANCE",
        qty: 50,
        avgPrice: 2450,
        currentPrice: 2680,
        investedAmount: 122500,
        currentValue: 134000,
        pnl: 11500,
        pnlPercent: 9.39,
        type: "equity",
    },
    {
        name: "HDFC Bank",
        symbol: "HDFCBANK",
        qty: 80,
        avgPrice: 1520,
        currentPrice: 1580,
        investedAmount: 121600,
        currentValue: 126400,
        pnl: 4800,
        pnlPercent: 3.95,
        type: "equity",
    },
    {
        name: "HDFC FlexiCap Fund",
        symbol: "HDFC_FLEXI",
        qty: 1250,
        avgPrice: 680,
        currentPrice: 720,
        investedAmount: 850000,
        currentValue: 900000,
        pnl: 50000,
        pnlPercent: 5.88,
        type: "mutual_fund",
    },
    {
        name: "Gold ETF",
        symbol: "GOLDBEES",
        qty: 200,
        avgPrice: 4200,
        currentPrice: 4350,
        investedAmount: 840000,
        currentValue: 870000,
        pnl: 30000,
        pnlPercent: 3.57,
        type: "gold",
    },
];

const assetAllocation = [
    { name: "Equity", value: 260400, percentage: 22.6, color: "#06B6D4" },
    { name: "Mutual Funds", value: 900000, percentage: 78.3, color: "#10B981" },
    { name: "Gold", value: 870000, percentage: 75.7, color: "#F59E0B" },
    { name: "Cash", value: 45000, percentage: 3.9, color: "#6B7280" },
];

const recentTransactions = [
    {
        type: "buy",
        asset: "HDFC Bank",
        quantity: 20,
        price: 1580,
        date: "2024-06-20",
        amount: 31600,
    },
    {
        type: "sip",
        asset: "HDFC FlexiCap Fund",
        quantity: 0,
        price: 0,
        date: "2024-06-15",
        amount: 5000,
    },
    {
        type: "sell",
        asset: "TCS",
        quantity: 15,
        price: 3200,
        date: "2024-06-10",
        amount: 48000,
    },
    {
        type: "buy",
        asset: "Gold ETF",
        quantity: 50,
        price: 4350,
        date: "2024-06-05",
        amount: 217500,
    },
];

export default function PortfolioDashboard() {
    const [timeFilter, setTimeFilter] = useState("1M");

    const totalValue = 1150000;
    const totalInvested = 1054100;
    const totalPnL = totalValue - totalInvested;
    const totalPnLPercent = (totalPnL / totalInvested) * 100;
    const availableCash = 45000;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getAssetIcon = (type: string) => {
        switch (type) {
            case "equity":
                return <Building2 className="h-5 w-5" />;
            case "mutual_fund":
                return <PieChartIcon className="h-5 w-5" />;
            case "gold":
                return <Coins className="h-5 w-5" />;
            default:
                return <DollarSign className="h-5 w-5" />;
        }
    };

    return (
        <div className="space-y-8 p-4 md:p-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#1F2937]">
                            Portfolio Dashboard
                        </h1>
                        <p className="text-[#6B7280] mt-1">
                            Track your investments and performance
                        </p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    <Card className="bg-white">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                                <Wallet className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm text-[#6B7280]">
                                    Total Portfolio Value
                                </div>
                                <div className="text-lg font-bold text-[#1F2937]">
                                    {formatCurrency(totalValue)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                                <Activity className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm text-[#6B7280]">
                                    Net P&L
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="text-lg font-bold text-[#1F2937]">
                                        {formatCurrency(Math.abs(totalPnL))}
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium ${
                                            totalPnL >= 0
                                                ? "bg-[#10B981]/20 text-[#10B981]"
                                                : "bg-[#EF4444]/20 text-[#EF4444]"
                                        }`}
                                    >
                                        {totalPnL >= 0 ? (
                                            <ArrowUp className="h-3 w-3" />
                                        ) : (
                                            <ArrowDown className="h-3 w-3" />
                                        )}
                                        {Math.abs(totalPnLPercent).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                                <DollarSign className="h-5 w-5" />
                            </div>
                            <div>
                                <div className="text-sm text-[#6B7280]">
                                    Available Cash
                                </div>
                                <div className="text-lg font-bold text-[#1F2937]">
                                    {formatCurrency(availableCash)}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Portfolio Performance Chart */}
                <div className="grid gap-6 lg:grid-cols-3 mt-8">
                    <Card className="lg:col-span-2 bg-white">
                        <CardHeader>
                            <CardTitle className="text-[#1F2937]">
                                Portfolio Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    value: {
                                        label: "Portfolio Value",
                                        color: "#06B6D4",
                                    },
                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={portfolioData}>
                                        <XAxis
                                            dataKey="date"
                                            stroke="#6B7280"
                                        />
                                        <YAxis stroke="#6B7280" />
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#06B6D4"
                                            strokeWidth={2}
                                            dot={{ fill: "#06B6D4" }}
                                            fill="rgba(6, 182, 212, 0.1)"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="mt-4 flex justify-center gap-2">
                                {["1D", "1W", "1M", "1Y", "All"].map(
                                    (period) => (
                                        <Button
                                            key={period}
                                            className={`rounded-md px-3 py-1 text-xs font-medium ${
                                                timeFilter === period
                                                    ? "bg-[#06B6D4]/20 text-[#06B6D4]"
                                                    : "bg-white text-[#6B7280]"
                                            }`}
                                            onClick={() =>
                                                setTimeFilter(period)
                                            }
                                        >
                                            {period}
                                        </Button>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Asset Allocation */}
                    <Card className="bg-white">
                        <CardHeader>
                            <CardTitle className="text-[#1F2937]">
                                Asset Allocation
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={{
                                    equity: {
                                        label: "Equity",
                                        color: "#06B6D4",
                                    },
                                    mutualFunds: {
                                        label: "Mutual Funds",
                                        color: "#10B981",
                                    },
                                    gold: { label: "Gold", color: "#F59E0B" },
                                    cash: { label: "Cash", color: "#6B7280" },
                                }}
                                className="h-[200px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={assetAllocation}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={80}
                                            dataKey="value"
                                        >
                                            {assetAllocation.map(
                                                (entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.color}
                                                    />
                                                )
                                            )}
                                        </Pie>
                                        <ChartTooltip
                                            content={<ChartTooltipContent />}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="mt-4 space-y-2">
                                {assetAllocation.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{
                                                    backgroundColor: item.color,
                                                }}
                                            />
                                            <span className="text-sm text-[#6B7280]">
                                                {item.name}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-[#1F2937]">
                                            {item.percentage.toFixed(1)}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Holdings Table */}
                <Card className="mt-8 bg-white">
                    <CardHeader>
                        <CardTitle className="text-[#1F2937]">
                            Holdings
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-white">
                                        <TableHead className="text-[#6B7280]">
                                            Asset
                                        </TableHead>
                                        <TableHead className="text-right text-[#6B7280]">
                                            Qty
                                        </TableHead>
                                        <TableHead className="text-right text-[#6B7280]">
                                            Avg Price
                                        </TableHead>
                                        <TableHead className="text-right text-[#6B7280]">
                                            Current Price
                                        </TableHead>
                                        <TableHead className="text-right text-[#6B7280]">
                                            Current Value
                                        </TableHead>
                                        <TableHead className="text-right text-[#6B7280]">
                                            P&L
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {holdings.map((holding, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-white"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
                                                        {getAssetIcon(
                                                            holding.type
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#1F2937]">
                                                            {holding.name}
                                                        </div>
                                                        <div className="text-sm text-[#6B7280]">
                                                            {holding.symbol}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-[#1F2937]">
                                                {holding.qty}
                                            </TableCell>
                                            <TableCell className="text-right text-[#1F2937]">
                                                {formatCurrency(
                                                    holding.avgPrice
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right text-[#1F2937]">
                                                {formatCurrency(
                                                    holding.currentPrice
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right font-medium text-[#1F2937]">
                                                {formatCurrency(
                                                    holding.currentValue
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div
                                                    className={`font-medium ${
                                                        holding.pnl >= 0
                                                            ? "text-[#10B981]"
                                                            : "text-[#EF4444]"
                                                    }`}
                                                >
                                                    {formatCurrency(
                                                        Math.abs(holding.pnl)
                                                    )}
                                                </div>
                                                <div
                                                    className={`text-sm ${
                                                        holding.pnl >= 0
                                                            ? "text-[#10B981]"
                                                            : "text-[#EF4444]"
                                                    }`}
                                                >
                                                    {holding.pnl >= 0
                                                        ? "+"
                                                        : ""}
                                                    {holding.pnlPercent.toFixed(
                                                        2
                                                    )}
                                                    %
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Transactions */}
                <Card className="mt-8 bg-white">
                    <CardHeader>
                        <CardTitle className="text-[#1F2937]">
                            Recent Transactions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTransactions.map((transaction, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between rounded-md bg-white p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`rounded-full p-2 ${
                                                transaction.type === "buy"
                                                    ? "bg-[#10B981]/20 text-[#10B981]"
                                                    : transaction.type ===
                                                      "sell"
                                                    ? "bg-[#EF4444]/20 text-[#EF4444]"
                                                    : "bg-[#06B6D4]/20 text-[#06B6D4]"
                                            }`}
                                        >
                                            {transaction.type === "buy" ? (
                                                <TrendingUp className="h-5 w-5" />
                                            ) : transaction.type === "sell" ? (
                                                <TrendingDown className="h-5 w-5" />
                                            ) : (
                                                <Activity className="h-5 w-5" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-medium text-[#1F2937]">
                                                {transaction.type === "sip"
                                                    ? "SIP"
                                                    : transaction.type === "buy"
                                                    ? "Bought"
                                                    : "Sold"}{" "}
                                                {transaction.asset}
                                            </div>
                                            <div className="text-sm text-[#6B7280]">
                                                {new Date(
                                                    transaction.date
                                                ).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="font-medium text-[#1F2937]">
                                        {formatCurrency(transaction.amount)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
