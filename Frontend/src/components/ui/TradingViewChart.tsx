"use client";

import React, { useRef, useEffect, useCallback, useMemo } from "react";
import {
    createChart,
    ColorType,
    IChartApi,
    ISeriesApi,
    CandlestickData,
    CandlestickSeries,
} from "lightweight-charts";
import { useSmartStockData, TimePeriod } from "@/src/hooks/useSmartStockData";

interface Props {
    symbol: string;
    height?: number;
    defaultPeriod?: TimePeriod;
}

const TradingViewChart: React.FC<Props> = ({
    symbol,
    height = 300,
    defaultPeriod = "1M",
}) => {
    const {
        stockData,
        loading,
        error,
        currentPeriod,
        changePeriod,
        changeSymbol,
        loadData,
    } = useSmartStockData(symbol, defaultPeriod);

    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    // Initialize data on mount
    useEffect(() => {
        loadData(symbol, defaultPeriod);
    }, []); // Only run once on mount

    // Convert data to chart format
    const chartData: CandlestickData[] = useMemo(() => {
        return stockData.map((item) => ({
            time: item.date.split("T")[0],
            open: item.open_price,
            high: item.high_price,
            low: item.low_price,
            close: item.close_price,
        }));
    }, [stockData]);

    // Tooltip logic
    const handleCrosshairMove = useCallback((param: any) => {
        const tooltip = document.getElementById(
            "ohlc-tooltip"
        ) as HTMLDivElement;
        if (
            !tooltip ||
            !param.time ||
            !seriesRef.current ||
            !param.seriesData.has(seriesRef.current)
        ) {
            if (tooltip) tooltip.style.display = "none";
            return;
        }

        const ohlc = param.seriesData.get(seriesRef.current);
        tooltip.style.display = "flex";
        tooltip.innerHTML = `
            <div><strong>O:</strong> ${ohlc.open}</div>
            <div><strong>H:</strong> ${ohlc.high}</div>
            <div><strong>L:</strong> ${ohlc.low}</div>
            <div><strong>C:</strong> ${ohlc.close}</div>
        `;

        if (param.point && chartContainerRef.current) {
            const rect = chartContainerRef.current.getBoundingClientRect();
            tooltip.style.left = `${param.point.x + 20}px`;
            tooltip.style.top = `${Math.max(param.point.y - 40, 0)}px`;
        }
    }, []);

    const handleResize = useCallback(() => {
        if (chartContainerRef.current && chartRef.current) {
            chartRef.current.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        }
    }, []);

    // Initialize chart
    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "#ffffff" },
                textColor: "#1F2937",
                fontSize: 12,
            },
            width: chartContainerRef.current.clientWidth,
            height,
            grid: {
                vertLines: { color: "#f3f4f6" },
                horzLines: { color: "#f3f4f6" },
            },
            crosshair: {
                mode: 1,
                vertLine: { color: "#6B7280", width: 1, style: 2 },
                horzLine: { color: "#6B7280", width: 1, style: 2 },
            },
            rightPriceScale: {
                borderColor: "#e5e7eb",
                textColor: "#6B7280",
                scaleMargins: { top: 0.1, bottom: 0.3 },
            },
            timeScale: {
                borderColor: "#e5e7eb",
                timeVisible: true,
            },
        });

        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#10B981",
            downColor: "#EF4444",
            borderVisible: false,
            wickUpColor: "#10B981",
            wickDownColor: "#EF4444",
        });

        chartRef.current = chart;
        seriesRef.current = candlestickSeries;

        chart.subscribeCrosshairMove(handleCrosshairMove);
        window.addEventListener("resize", handleResize);

        return () => {
            chart.remove();
            window.removeEventListener("resize", handleResize);
        };
    }, [height, handleResize, handleCrosshairMove]);

    // Update chart data
    useEffect(() => {
        if (!seriesRef.current || !chartRef.current || !chartData.length)
            return;
        seriesRef.current.setData(chartData);
        chartRef.current.timeScale().fitContent();
    }, [chartData]);

    if (error) {
        return (
            <div className="space-y-4">
                <div className="flex gap-2 mb-2">
                    {(["1W", "1M", "1Y", "All"] as TimePeriod[]).map(
                        (period) => (
                            <button
                                key={period}
                                onClick={() => changePeriod(period)}
                                className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                                    currentPeriod === period
                                        ? "bg-[#06B6D4] text-white border-[#06B6D4]"
                                        : "bg-white text-[#1F2937] border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                {period}
                            </button>
                        )
                    )}
                </div>
                <div
                    className="flex items-center justify-center bg-red-50 rounded-md"
                    style={{ height }}
                >
                    <div className="text-center">
                        <p className="text-[#EF4444] mb-2">
                            Error loading chart data
                        </p>
                        <p className="text-sm text-[#6B7280]">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Time Period Buttons */}
            <div className="flex gap-2 mb-2">
                {(["1W", "1M", "1Y", "All"] as TimePeriod[]).map((period) => (
                    <button
                        key={period}
                        onClick={() => changePeriod(period)}
                        disabled={loading}
                        className={`px-3 py-1 text-sm rounded-md border transition-colors ${
                            currentPeriod === period
                                ? "bg-[#06B6D4] text-white border-[#06B6D4]"
                                : "bg-white text-[#1F2937] border-gray-300 hover:bg-gray-100 disabled:bg-gray-100 disabled:text-gray-400"
                        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {period}
                    </button>
                ))}
            </div>

            {/* Chart Container */}
            <div
                className="relative w-full"
                ref={chartContainerRef}
                style={{ height }}
            >
                {loading && (
                    <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#06B6D4]"></div>
                    </div>
                )}
                <div
                    id="ohlc-tooltip"
                    className="absolute z-20 hidden flex-col gap-1 text-xs bg-white border border-gray-300 px-2 py-1 rounded shadow text-[#1F2937] pointer-events-none"
                />
            </div>
        </div>
    );
};

export default TradingViewChart;
