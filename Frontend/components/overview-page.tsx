
"use client"

import { useEffect, useRef } from "react"
import { ArrowUp, BarChart3, Calendar, DollarSign, Globe, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils" // Import cn utility

export function OverviewPage() {
  const chartRef = useRef<HTMLCanvasElement>(null)

  // Simple chart rendering
  useEffect(() => {
    const canvas = chartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2) // For retina displays

    // Chart dimensions
    const width = canvas.width / 2
    const height = canvas.height / 2
    const padding = 20

    // Generate random data points (would be replaced with actual stock data)
    const dataPoints = 60
    const data: number[] = []
    let prev = 150
    for (let i = 0; i < dataPoints; i++) {
      prev += (Math.random() - 0.5) * 10
      prev = Math.max(100, Math.min(200, prev))
      data.push(prev)
    }

    // Calculate x and y scales
    const xScale = (width - padding * 2) / (dataPoints - 1)
    const yMin = Math.min(...data) * 0.95
    const yMax = Math.max(...data) * 1.05
    const yScale = (height - padding * 2) / (yMax - yMin)

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(padding, height - padding - (data[0] - yMin) * yScale)

    for (let i = 1; i < dataPoints; i++) {
      ctx.lineTo(padding + i * xScale, height - padding - (data[i] - yMin) * yScale)
    }

    // Style the line
    ctx.strokeStyle = "#06B6D4" // Teal accent
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + (dataPoints - 1) * xScale, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(6, 182, 212, 0.1)" // Teal with opacity
    ctx.fill()

    // Draw the axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "#6B7280" // Neutral gray for axes
    ctx.lineWidth = 1
    ctx.stroke()

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth * 2
        canvas.height = canvas.offsetHeight * 2
        ctx.scale(2, 2)
        // Redraw chart
        ctx.beginPath()
        ctx.moveTo(padding, height - padding - (data[0] - yMin) * yScale)
        for (let i = 1; i < dataPoints; i++) {
          ctx.lineTo(padding + i * xScale, height - padding - (data[i] - yMin) * yScale)
        }
        ctx.strokeStyle = "#06B6D4"
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.lineTo(padding + (dataPoints - 1) * xScale, height - padding)
        ctx.lineTo(padding, height - padding)
        ctx.closePath()
        ctx.fillStyle = "rgba(6, 182, 212, 0.1)"
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(padding, padding)
        ctx.lineTo(padding, height - padding)
        ctx.lineTo(width - padding, height - padding)
        ctx.strokeStyle = "#6B7280"
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="space-y-8 p-4 md:p-6 bg-white">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">AAPL Overview</h1>
          <p className="text-[#6B7280] mt-1">Apple Inc. - Technology | NASDAQ</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold text-[#1F2937]">$187.32</div>
          <div className="flex items-center gap-1 rounded-full bg-[#10B981]/20 px-2 py-1 text-sm font-medium text-[#10B981]">
            <ArrowUp className="h-3 w-3" />
            1.42%
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-[#6B7280]">Market Cap</div>
              <div className="text-lg font-bold text-[#1F2937]">$2.94T</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-[#6B7280]">P/E Ratio</div>
              <div className="text-lg font-bold text-[#1F2937]">31.24</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-[#6B7280]">52W Range</div>
              <div className="text-lg font-bold text-[#1F2937]">$124.17 - $199.62</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-[#06B6D4]/20 p-2 text-[#06B6D4]">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-[#6B7280]">Dividend Yield</div>
              <div className="text-lg font-bold text-[#1F2937]">0.51%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 bg-white">
          <CardHeader>
            <CardTitle className="text-[#1F2937]">Stock Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} className="h-full w-full" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((period) => (
                <button
                  key={period}
                  className={cn(
                    "rounded-md px-3 py-1 text-xs font-medium",
                    period === "1M"
                      ? "bg-[#06B6D4]/20 text-[#06B6D4]"
                      : "bg-white text-[#6B7280] hover:bg-[#D1D5DB]"
                  )}
                >
                  {period}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#1F2937]">Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-[#6B7280]" />
              <div>
                <div className="text-sm font-medium text-[#1F2937]">Website</div>
                <div className="text-sm text-[#6B7280]">www.apple.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-[#6B7280]" />
              <div>
                <div className="text-sm font-medium text-[#1F2937]">Employees</div>
                <div className="text-sm text-[#6B7280]">164,000</div>
              </div>
            </div>
            <div className="rounded-md bg-white p-3">
              <div className="text-sm font-medium text-[#1F2937]">About</div>
              <p className="mt-1 text-sm text-[#6B7280]">
                Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and
                accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-[#1F2937]">Key Statistics</CardTitle>
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
                  <div className="text-sm text-[#6B7280]">Market Cap</div>
                  <div className="text-lg font-medium text-[#1F2937]">$2.94T</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Enterprise Value</div>
                  <div className="text-lg font-medium text-[#1F2937]">$2.87T</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Trailing P/E</div>
                  <div className="text-lg font-medium text-[#1F2937]">31.24</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Forward P/E</div>
                  <div className="text-lg font-medium text-[#1F2937]">28.76</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">PEG Ratio (5yr)</div>
                  <div className="text-lg font-medium text-[#1F2937]">2.54</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Price/Sales</div>
                  <div className="text-lg font-medium text-[#1F2937]">7.94</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="financial">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Profit Margin</div>
                  <div className="text-lg font-medium text-[#1F2937]">25.31%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Operating Margin</div>
                  <div className="text-lg font-medium text-[#1F2937]">30.42%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">ROA</div>
                  <div className="text-lg font-medium text-[#1F2937]">21.34%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">ROE</div>
                  <div className="text-lg font-medium text-[#1F2937]">160.09%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Revenue</div>
                  <div className="text-lg font-medium text-[#1F2937]">$383.29B</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Revenue Per Share</div>
                  <div className="text-lg font-medium text-[#1F2937]">$24.27</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="trading">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">Beta</div>
                  <div className="text-lg font-medium text-[#1F2937]">1.28</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">52-Week Change</div>
                  <div className="text-lg font-medium text-[#1F2937]">+32.45%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">S&P500 52-Week Change</div>
                  <div className="text-lg font-medium text-[#1F2937]">+24.32%</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">52 Week High</div>
                  <div className="text-lg font-medium text-[#1F2937]">$199.62</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">52 Week Low</div>
                  <div className="text-lg font-medium text-[#1F2937]">$124.17</div>
                </div>
                <div className="rounded-md bg-white p-3">
                  <div className="text-sm text-[#6B7280]">50-Day Moving Average</div>
                  <div className="text-lg font-medium text-[#1F2937]">$182.45</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
