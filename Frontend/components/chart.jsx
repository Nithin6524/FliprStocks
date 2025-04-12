import React, { useEffect, useRef } from "react";

const LightweightChartComponent = () => {
    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const mainSeriesRef = useRef(null);
    const areaSeriesRef = useRef(null);

    // Function to generate sample candlestick data
    const generateCandlestickData = () => {
        return [
          {
            time: "2018-10-19",
            open: 180.34,
            high: 180.99,
            low: 178.57,
            close: 179.85,
          },
          {
            time: "2018-10-22",
            open: 180.82,
            high: 181.4,
            low: 177.56,
            close: 178.75,
          },
          {
            time: "2018-10-23",
            open: 175.77,
            high: 179.49,
            low: 175.44,
            close: 178.53,
          },
          {
            time: "2018-10-24",
            open: 178.58,
            high: 182.37,
            low: 176.31,
            close: 176.97,
          },
          {
            time: "2018-10-25",
            open: 177.52,
            high: 180.5,
            low: 176.83,
            close: 179.07,
          },
          {
            time: "2018-10-26",
            open: 176.88,
            high: 177.34,
            low: 170.91,
            close: 172.23,
          },
          {
            time: "2018-10-29",
            open: 173.74,
            high: 175.99,
            low: 170.95,
            close: 173.2,
          },
          {
            time: "2018-10-30",
            open: 173.16,
            high: 176.43,
            low: 172.64,
            close: 176.24,
          },
          {
            time: "2018-10-31",
            open: 177.98,
            high: 178.85,
            low: 175.59,
            close: 175.88,
          },
          {
            time: "2018-11-01",
            open: 176.84,
            high: 180.86,
            low: 175.9,
            close: 180.46,
          },
          {
            time: "2018-11-02",
            open: 182.47,
            high: 183.01,
            low: 177.39,
            close: 179.93,
          },
          {
            time: "2018-11-05",
            open: 181.02,
            high: 182.41,
            low: 179.3,
            close: 182.19,
          },
          {
            time: "2018-11-06",
            open: 181.93,
            high: 182.65,
            low: 180.05,
            close: 182.01,
          },
        ];
    };

    useEffect(() => {
        // Load the Lightweight Charts library dynamically
        const script = document.createElement("script");
        script.src =
            "https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js";
        script.async = true;
        script.onload = initializeChart;
        document.body.appendChild(script);

        return () => {
            // Cleanup
            document.body.removeChild(script);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, []);

    const initializeChart = () => {
        if (
            !chartContainerRef.current ||
            typeof LightweightCharts === "undefined"
        )
            return;

        // Create the chart
        chartRef.current = LightweightCharts.createChart(
            chartContainerRef.current,
            {
                layout: {
                    background: { color: "#222" },
                    textColor: "#C3BCDB",
                },
                grid: {
                    vertLines: { color: "#444" },
                    horzLines: { color: "#444" },
                },
            }
        );

        // Chart configuration
        chartRef.current.priceScale().applyOptions({
            borderColor: "#71649C",
        });

        chartRef.current.timeScale().applyOptions({
            borderColor: "#71649C",
            barSpacing: 10,
        });

        chartRef.current.applyOptions({
            layout: {
                fontFamily: "'Roboto', sans-serif",
            },
            localization: {
                priceFormatter: Intl.NumberFormat(
                    window.navigator.languages[0],
                    {
                        style: "currency",
                        currency: "EUR",
                    }
                ).format,
            },
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
                vertLine: {
                    width: 8,
                    color: "#C3BCDB44",
                    style: LightweightCharts.LineStyle.Solid,
                    labelBackgroundColor: "#9B7DFF",
                },
                horzLine: {
                    color: "#9B7DFF",
                    labelBackgroundColor: "#9B7DFF",
                },
            },
        });

        // Generate and process data
        const candleStickData = generateCandlestickData().map((datapoint) => {
            if (datapoint.close < 205) return datapoint;
            return { ...datapoint, color: "orange", wickColor: "orange" };
        });

        const lineData = candleStickData.map((datapoint) => ({
            time: datapoint.time,
            value: (datapoint.close + datapoint.open) / 2,
        }));

        // Add area series
        areaSeriesRef.current = chartRef.current.addSeries(
            LightweightCharts.AreaSeries,
            {
                lastValueVisible: false,
                crosshairMarkerVisible: false,
                lineColor: "transparent",
                topColor: "rgba(56, 33, 110,0.6)",
                bottomColor: "rgba(56, 33, 110, 0.1)",
            }
        );
        areaSeriesRef.current.setData(lineData);

        // Add candlestick series
        mainSeriesRef.current = chartRef.current.addSeries(
            LightweightCharts.CandlestickSeries
        );
        mainSeriesRef.current.setData(candleStickData);
        mainSeriesRef.current.applyOptions({
            wickUpColor: "rgb(54, 116, 217)",
            upColor: "rgb(54, 116, 217)",
            wickDownColor: "rgb(225, 50, 85)",
            downColor: "rgb(225, 50, 85)",
            borderVisible: false,
        });

        mainSeriesRef.current.priceScale().applyOptions({
            autoScale: false,
            scaleMargins: {
                top: 0.1,
                bottom: 0.2,
            },
        });

        // Handle resize
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.resize(
                    chartContainerRef.current.clientWidth,
                    chartContainerRef.current.clientHeight
                );
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
            {/* Add Google Fonts */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
                rel="stylesheet"
            />

            {/* Chart container */}
            <div
                ref={chartContainerRef}
                style={{ position: "absolute", width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default LightweightChartComponent;
