"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Brain, Info, LineChart, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function AIForecastingPage() {
    const chartRef = useRef<HTMLCanvasElement>(null);

    // AI forecast chart
    useEffect(() => {
        const canvas = chartRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = canvas.offsetWidth * 2;
        canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2); // For retina displays

        // Chart dimensions
        const width = canvas.width / 2;
        const height = canvas.height / 2;
        const padding = 20;

        // Generate historical data (would be replaced with actual stock data)
        const historicalPoints = 30;
        const historicalData: number[] = [];
        let prev = 150;
        for (let i = 0; i < historicalPoints; i++) {
            prev += (Math.random() - 0.5) * 5;
            prev = Math.max(130, Math.min(170, prev));
            historicalData.push(prev);
        }

        // Generate forecast data (would be replaced with actual AI predictions)
        const forecastPoints = 15;
        const forecastData: number[] = [];
        let lastHistorical = historicalData[historicalData.length - 1];

        // Upward trend for the forecast
        for (let i = 0; i < forecastPoints; i++) {
            lastHistorical += Math.random() * 2 - 0.5 + 0.7; // Slight upward bias
            lastHistorical = Math.max(140, Math.min(190, lastHistorical));
            forecastData.push(lastHistorical);
        }

        // Calculate confidence intervals (±10% of the forecast value)
        const upperBound = forecastData.map((val) => val * 1.1);
        const lowerBound = forecastData.map((val) => val * 0.9);

        // Calculate x and y scales
        const totalPoints = historicalPoints + forecastPoints;
        const xScale = (width - padding * 2) / (totalPoints - 1);

        const allValues = [...historicalData, ...upperBound, ...lowerBound];
        const yMin = Math.min(...allValues) * 0.95;
        const yMax = Math.max(...allValues) * 1.05;
        const yScale = (height - padding * 2) / (yMax - yMin);

        // Draw historical data line
        ctx.beginPath();
        ctx.moveTo(
            padding,
            height - padding - (historicalData[0] - yMin) * yScale
        );

        for (let i = 1; i < historicalPoints; i++) {
            ctx.lineTo(
                padding + i * xScale,
                height - padding - (historicalData[i] - yMin) * yScale
            );
        }

        // Style the historical line
        ctx.strokeStyle = "#22d3ee"; // Primary color
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the forecast line
        ctx.beginPath();
        ctx.moveTo(
            padding + (historicalPoints - 1) * xScale,
            height -
                padding -
                (historicalData[historicalPoints - 1] - yMin) * yScale
        );

        for (let i = 0; i < forecastPoints; i++) {
            ctx.lineTo(
                padding + (historicalPoints + i) * xScale,
                height - padding - (forecastData[i] - yMin) * yScale
            );
        }

        // Style the forecast line
        ctx.strokeStyle = "#c084fc"; // Secondary color
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]); // Dashed line for forecast
        ctx.stroke();
        ctx.setLineDash([]); // Reset dash

        // Draw confidence interval
        ctx.beginPath();
        // Upper bound
        for (let i = 0; i < forecastPoints; i++) {
            ctx.lineTo(
                padding + (historicalPoints + i) * xScale,
                height - padding - (upperBound[i] - yMin) * yScale
            );
        }

        // Lower bound (in reverse)
        for (let i = forecastPoints - 1; i >= 0; i--) {
            ctx.lineTo(
                padding + (historicalPoints + i) * xScale,
                height - padding - (lowerBound[i] - yMin) * yScale
            );
        }

        ctx.closePath();
        ctx.fillStyle = "rgba(192, 132, 252, 0.1)"; // Secondary color with opacity
        ctx.fill();

        // Draw the axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw vertical line separating historical and forecast
        ctx.beginPath();
        ctx.moveTo(padding + (historicalPoints - 1) * xScale, padding);
        ctx.lineTo(padding + (historicalPoints - 1) * xScale, height - padding);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.setLineDash([5, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Add labels
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = "10px sans-serif";
        ctx.fillText("Historical", padding + 5, padding + 15);
        ctx.fillText(
            "Forecast",
            padding + historicalPoints * xScale + 5,
            padding + 15
        );

        // Handle resize
        const handleResize = () => {
            if (canvas) {
                canvas.width = canvas.offsetWidth * 2;
                canvas.height = canvas.offsetHeight * 2;
                ctx.scale(2, 2);
                // Redraw chart...
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-3xl font-bold">AI Forecasting</h1>
                    <p className="text-muted-foreground">
                        Predictive analytics powered by machine learning
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Select defaultValue="AAPL">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Stock" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
                            <SelectItem value="MSFT">
                                Microsoft (MSFT)
                            </SelectItem>
                            <SelectItem value="GOOGL">
                                Alphabet (GOOGL)
                            </SelectItem>
                            <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
                            <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select defaultValue="30">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Forecast Period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="7">7 Days</SelectItem>
                            <SelectItem value="14">14 Days</SelectItem>
                            <SelectItem value="30">30 Days</SelectItem>
                            <SelectItem value="90">90 Days</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Price Forecast</CardTitle>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Info className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="max-w-xs">
                                        This chart shows historical data and
                                        AI-generated price forecasts with
                                        confidence intervals. The shaded area
                                        represents the range of potential price
                                        movements.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <canvas
                                ref={chartRef}
                                className="h-full w-full"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-primary"></div>
                                    <span className="text-xs text-muted-foreground">
                                        Historical
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                    <span className="text-xs text-muted-foreground">
                                        Forecast
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="h-3 w-6 rounded-sm bg-secondary/20"></div>
                                    <span className="text-xs text-muted-foreground">
                                        Confidence Interval
                                    </span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">
                                <LineChart className="mr-2 h-4 w-4" /> Advanced
                                Analysis
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Forecast Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="rounded-md bg-muted p-3">
                                <div className="text-sm text-muted-foreground">
                                    Current Price
                                </div>
                                <div className="text-lg font-medium">
                                    $187.32
                                </div>
                            </div>
                            <div className="rounded-md bg-muted p-3">
                                <div className="text-sm text-muted-foreground">
                                    30-Day Forecast
                                </div>
                                <div className="text-lg font-medium">
                                    $204.56
                                </div>
                                <div className="flex items-center gap-1 text-sm font-medium text-green-500">
                                    <TrendingUp className="h-3 w-3" />
                                    +9.2%
                                </div>
                            </div>
                            <div className="rounded-md bg-muted p-3">
                                <div className="text-sm text-muted-foreground">
                                    Confidence Interval
                                </div>
                                <div className="text-lg font-medium">
                                    $192.18 - $217.94
                                </div>
                            </div>
                            <div className="rounded-md bg-muted p-3">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-muted-foreground">
                                        AI Confidence
                                    </div>
                                    <div className="text-sm font-medium text-green-500">
                                        High
                                    </div>
                                </div>
                                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted-foreground/20">
                                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>AI Insights</CardTitle>
                            <Brain className="h-5 w-5 text-secondary" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4 rounded-md bg-muted p-3">
                                <p className="text-sm">
                                    Based on recent earnings reports, product
                                    announcements, and market sentiment, our AI
                                    model predicts a positive trend for AAPL
                                    over the next 30 days.
                                </p>
                                <p className="text-sm">
                                    Key factors influencing this forecast
                                    include strong iPhone sales, growth in
                                    services revenue, and potential new product
                                    announcements.
                                </p>
                                <Button
                                    variant="link"
                                    className="h-auto p-0 text-sm"
                                >
                                    View detailed analysis{" "}
                                    <ArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Price Targets by Time Frame</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Time Frame</TableHead>
                                <TableHead>Price Target</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>Confidence</TableHead>
                                <TableHead>Last Updated</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">
                                    7 Days
                                </TableCell>
                                <TableCell>$191.45</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +2.2%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[90%] rounded-full bg-green-500"></div>
                                        </div>
                                        <span>High</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    14 Days
                                </TableCell>
                                <TableCell>$196.78</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +5.1%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                                        </div>
                                        <span>High</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    30 Days
                                </TableCell>
                                <TableCell>$204.56</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +9.2%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[85%] rounded-full bg-green-500"></div>
                                        </div>
                                        <span>High</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    90 Days
                                </TableCell>
                                <TableCell>$212.34</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +13.4%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[70%] rounded-full bg-yellow-500"></div>
                                        </div>
                                        <span>Medium</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    6 Months
                                </TableCell>
                                <TableCell>$225.67</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +20.5%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[60%] rounded-full bg-yellow-500"></div>
                                        </div>
                                        <span>Medium</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">
                                    1 Year
                                </TableCell>
                                <TableCell>$243.21</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1 text-green-500">
                                        <TrendingUp className="h-4 w-4" />
                                        +29.8%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                                            <div className="h-full w-[40%] rounded-full bg-red-500"></div>
                                        </div>
                                        <span>Low</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    Today, 9:30 AM
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
