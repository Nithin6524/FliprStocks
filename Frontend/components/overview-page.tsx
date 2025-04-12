"use client"

import { useEffect, useRef } from "react"
import { ArrowUp, BarChart3, Calendar, DollarSign, Globe, TrendingUp, Users } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    ctx.strokeStyle = "#22d3ee" // Primary color
    ctx.lineWidth = 2
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding + (dataPoints - 1) * xScale, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = "rgba(34, 211, 238, 0.1)" // Primary color with opacity
    ctx.fill()

    // Draw the axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
    ctx.lineWidth = 1
    ctx.stroke()

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = canvas.offsetWidth * 2
        canvas.height = canvas.offsetHeight * 2
        ctx.scale(2, 2)
        // Redraw chart...
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">AAPL Overview</h1>
          <p className="text-muted-foreground">Apple Inc. - Technology | NASDAQ</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl font-bold">$187.32</div>
          <div className="flex items-center gap-1 rounded-full bg-green-500/20 px-2 py-1 text-sm font-medium text-green-500">
            <ArrowUp className="h-3 w-3" />
            1.42%
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Market Cap</div>
              <div className="text-lg font-bold">$2.94T</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">P/E Ratio</div>
              <div className="text-lg font-bold">31.24</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">52W Range</div>
              <div className="text-lg font-bold">$124.17 - $199.62</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="rounded-full bg-primary/20 p-2 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Dividend Yield</div>
              <div className="text-lg font-bold">0.51%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Stock Price History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <canvas ref={chartRef} className="h-full w-full" style={{ width: "100%", height: "100%" }} />
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button className="rounded-md bg-muted px-3 py-1 text-xs font-medium">1D</button>
              <button className="rounded-md bg-muted px-3 py-1 text-xs font-medium">1W</button>
              <button className="rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary">1M</button>
              <button className="rounded-md bg-muted px-3 py-1 text-xs font-medium">3M</button>

              <button className="rounded-md bg-muted px-3 py-1 text-xs font-medium">1Y</button>
              <button className="rounded-md bg-muted px-3 py-1 text-xs font-medium">5Y</button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Website</div>
                <div className="text-sm text-muted-foreground">www.apple.com</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="text-sm font-medium">Employees</div>
                <div className="text-sm text-muted-foreground">164,000</div>
              </div>
            </div>
            <div className="rounded-md bg-muted p-3">
              <div className="text-sm font-medium">About</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and
                accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home, and accessories.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="valuation">
            <TabsList className="mb-4">
              <TabsTrigger value="valuation">Valuation</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="trading">Trading Info</TabsTrigger>
            </TabsList>
            <TabsContent value="valuation">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-lg font-medium">$2.94T</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Enterprise Value</div>
                  <div className="text-lg font-medium">$2.87T</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Trailing P/E</div>
                  <div className="text-lg font-medium">31.24</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Forward P/E</div>
                  <div className="text-lg font-medium">28.76</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">PEG Ratio (5yr)</div>
                  <div className="text-lg font-medium">2.54</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Price/Sales</div>
                  <div className="text-lg font-medium">7.94</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="financial">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Profit Margin</div>
                  <div className="text-lg font-medium">25.31%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Operating Margin</div>
                  <div className="text-lg font-medium">30.42%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">ROA</div>
                  <div className="text-lg font-medium">21.34%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">ROE</div>
                  <div className="text-lg font-medium">160.09%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Revenue</div>
                  <div className="text-lg font-medium">$383.29B</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Revenue Per Share</div>
                  <div className="text-lg font-medium">$24.27</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="trading">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">Beta</div>
                  <div className="text-lg font-medium">1.28</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">52-Week Change</div>
                  <div className="text-lg font-medium">+32.45%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">S&P500 52-Week Change</div>
                  <div className="text-lg font-medium">+24.32%</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">52 Week High</div>
                  <div className="text-lg font-medium">$199.62</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">52 Week Low</div>
                  <div className="text-lg font-medium">$124.17</div>
                </div>
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm text-muted-foreground">50-Day Moving Average</div>
                  <div className="text-lg font-medium">$182.45</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
