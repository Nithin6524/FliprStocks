// hooks/useSmartStockData.ts

import { useState, useCallback } from "react";

export type TimePeriod = "1W" | "1M" | "1Y" | "All";

export interface StockData {
    date: string;
    open_price: number;
    high_price: number;
    low_price: number;
    close_price: number;
    volume: number;
}

interface CacheEntry {
    data: StockData[];
    timestamp: number;
}

const CACHE_EXPIRY_MS = 5 * 60 * 1000;

const PERIOD_DAYS: Record<TimePeriod, number | null> = {
    "1W": 7,
    "1M": 30,
    "1Y": 365,
    All: null,
};

export const useSmartStockData = (
    defaultSymbol?: string,
    defaultPeriod?: TimePeriod
) => {
    const [dataCache, setDataCache] = useState<Record<string, CacheEntry>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [currentSymbol, setCurrentSymbol] = useState(
        defaultSymbol || "MARUTI"
    );
    const [currentPeriod, setCurrentPeriod] = useState(defaultPeriod || "1M");
    const [stockData, setStockData] = useState<StockData[]>([]);

    const isCacheValid = useCallback((timestamp: number): boolean => {
        return Date.now() - timestamp < CACHE_EXPIRY_MS;
    }, []);

    const getDateRange = useCallback((period: TimePeriod) => {
        const end = new Date();
        const start = new Date();

        switch (period) {
            case "1W":
                start.setDate(end.getDate() - 7);
                break;
            case "1M":
                start.setDate(end.getDate() - 30);
                break;
            case "1Y":
                start.setFullYear(end.getFullYear() - 1);
                break;
            case "All":
                start.setFullYear(end.getFullYear() - 5);
                break;
        }

        return {
            start: start.toISOString().split("T")[0],
            end: end.toISOString().split("T")[0],
        };
    }, []);

    const fetchStockData = useCallback(
        async (symbol: string, period: TimePeriod): Promise<StockData[]> => {
            const key = `${symbol}_${period}`;
            if (dataCache[key] && isCacheValid(dataCache[key].timestamp)) {
                return dataCache[key].data;
            }

            try {
                const { start, end } = getDateRange(period);
                const res = await fetch(
                    `http://localhost:3001/api/stocks/daily?symbol=${symbol}&start=${start}&end=${end}`
                );

                if (!res.ok) throw new Error("Failed to fetch stock data");

                const raw = await res.json();
                const cleaned: StockData[] = raw.data.map((item: any) => ({
                    date: item.date,
                    open_price: +item.open_price,
                    high_price: +item.high_price,
                    low_price: +item.low_price,
                    close_price: +item.close_price,
                    volume: +item.volume,
                }));

                setDataCache((prev) => ({
                    ...prev,
                    [key]: { data: cleaned, timestamp: Date.now() },
                }));

                return cleaned;
            } catch (err) {
                console.error("fetchStockData error:", err);
                return [];
            }
        },
        [dataCache, isCacheValid, getDateRange]
    );

    const loadData = useCallback(
        async (symbol?: string, period?: TimePeriod) => {
            const targetSymbol = symbol || currentSymbol;
            const targetPeriod = period || currentPeriod;

            setLoading(true);
            setError(null);

            try {
                const data = await fetchStockData(targetSymbol, targetPeriod);
                setStockData(data);
                setCurrentSymbol(targetSymbol);
                setCurrentPeriod(targetPeriod);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        },
        [currentSymbol, currentPeriod, fetchStockData]
    );

    const changePeriod = useCallback(
        (newPeriod: TimePeriod) => {
            if (newPeriod !== currentPeriod) {
                loadData(currentSymbol, newPeriod);
            }
        },
        [currentSymbol, currentPeriod, loadData]
    );

    const changeSymbol = useCallback(
        (newSymbol: string) => {
            if (newSymbol !== currentSymbol) {
                loadData(newSymbol, currentPeriod);
            }
        },
        [currentSymbol, currentPeriod, loadData]
    );

    const clearCache = useCallback(() => {
        setDataCache({});
    }, []);

    const getCacheStats = useCallback(() => {
        return {
            dataEntries: Object.keys(dataCache).length,
        };
    }, [dataCache]);

    return {
        // State
        stockData,
        loading,
        error,
        currentSymbol,
        currentPeriod,

        // Actions
        loadData,
        changePeriod,
        changeSymbol,

        // Utilities
        clearCache,
        getCacheStats,

        // Direct fetch (optional legacy)
        fetchStockData,
    };
};
