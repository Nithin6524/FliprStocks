"use client"

import { useState } from "react"
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample portfolio data
const portfolioData = [
  { symbol: "AAPL", name: "Apple Inc.", shares: 15, avgPrice: 175.23, currentPrice: 187.32, change: 1.42 },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: 8, avgPrice: 390.45, currentPrice: 415.56, change: 2.78 },
  { symbol: "GOOGL", name: "Alphabet Inc.", shares: 10, avgPrice: 175.89, currentPrice: 172.63, change: -0.87 },
  { symbol: "AMZN", name: "Amazon.com Inc.", shares: 12, avgPrice: 165.34, currentPrice: 178.12, change: 3.25 },
  { symbol: "TSLA", name: "Tesla, Inc.", shares: 20, avgPrice: 245.67, currentPrice: 237.49, change: -3.15 },
]

// Sample watchlist data
const watchlistData = [
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 124.67, change: 5.23 },
  { symbol: "META", name: "Meta Platforms Inc.", price: 478.22, change: 2.15 },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.56, change: 0.87 },
  { symbol: "V", name: "Visa Inc.", price: 276.34, change: -0.54 },
  { symbol: "WMT", name: "Walmart Inc.", price: 67.89, change: 1.23 },
]

// Sample market data
const marketData = [
  { symbol: "SPY", name: "S&P 500 ETF", price: 487.32, change: 0.75 },
  { symbol: "QQQ", name: "Nasdaq 100 ETF", price: 425.67, change: 1.25 },
  { symbol: "DIA", name: "Dow Jones ETF", price: 378.45, change: 0.32 },
  { symbol: "IWM", name: "Russell 2000 ETF", price: 198.76, change: -0.45 },
  { symbol: "VIX", name: "Volatility Index", price: 15.32, change: -3.21 },
]

export function VirtualTradingPage() {
  const [orderType, setOrderType] = useState("market")
  const [searchQuery, setSearchQuery] = useState("")

  // Calculate portfolio value
  const portfolioValue = portfolioData.reduce((total, stock) => total + stock.shares * stock.currentPrice, 0)

  // Calculate portfolio gain/loss
  const portfolioCost = portfolioData.reduce((total, stock) => total + stock.shares * stock.avgPrice, 0)
  const portfolioGain = portfolioValue - portfolioCost
  const portfolioGainPercent = (portfolioGain / portfolioCost) * 100

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Virtual Trading</h1>
          <p className="text-muted-foreground">Learn to trade with $100,000 in virtual cash</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-card p-3">
            <div className="text-sm text-muted-foreground">Virtual Balance</div>
            <div className="text-xl font-bold">${(100000 - portfolioCost + portfolioGain).toFixed(2)}</div>
          </div>

          <Button>
            <RefreshCw className="mr-2 h-4 w-4" /> Reset Account
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Portfolio Summary */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Portfolio Summary</CardTitle>
            <CardDescription>Your virtual trading portfolio performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-card p-3">
                <div className="text-sm text-muted-foreground">Portfolio Value</div>
                <div className="text-xl font-bold">${portfolioValue.toFixed(2)}</div>
              </div>
              <div className="rounded-lg bg-card p-3">
                <div className="text-sm text-muted-foreground">Total Gain/Loss</div>
                <div className={`text-xl font-bold ${portfolioGain >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ${portfolioGain.toFixed(2)} ({portfolioGainPercent.toFixed(2)}%)
                </div>
              </div>
              <div className="rounded-lg bg-card p-3">
                <div className="text-sm text-muted-foreground">Day Change</div>
                <div className="text-xl font-bold text-green-500">+$487.32 (+0.75%)</div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Avg Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Change</TableHead>
                  <TableHead>Market Value</TableHead>
                  <TableHead>Gain/Loss</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portfolioData.map((stock) => {
                  const marketValue = stock.shares * stock.currentPrice
                  const gainLoss = marketValue - stock.shares * stock.avgPrice
                  const gainLossPercent = (gainLoss / (stock.shares * stock.avgPrice)) * 100

                  return (
                    <TableRow key={stock.symbol}>
                      <TableCell className="font-medium">
                        <div className="font-bold">{stock.symbol}</div>
                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                      </TableCell>
                      <TableCell>{stock.shares}</TableCell>
                      <TableCell>${stock.avgPrice.toFixed(2)}</TableCell>
                      <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`flex items-center ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          {stock.change >= 0 ? "+" : ""}
                          {stock.change}%
                        </div>
                      </TableCell>
                      <TableCell>${marketValue.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={gainLoss >= 0 ? "text-green-500" : "text-red-500"}>
                          ${gainLoss.toFixed(2)} ({gainLossPercent.toFixed(2)}%)
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Trade
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Trade Form */}
        <Card>
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
            <CardDescription>Execute a virtual trade</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Symbol</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter stock symbol"
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Action</label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                  Buy
                </Button>
                <Button variant="outline" className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
                  Sell
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Order Type</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select order type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <Input type="number" placeholder="Enter number of shares" min="1" />
            </div>

            {orderType !== "market" && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Input type="number" placeholder="Enter price" min="0.01" step="0.01" />
              </div>
            )}

            <div className="rounded-lg bg-card p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Estimated Cost:</span>
                <span className="font-bold">$0.00</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Place Order</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Market Data & Watchlist */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="indices">
              <TabsList className="mb-4">
                <TabsTrigger value="indices">Indices</TabsTrigger>
                <TabsTrigger value="sectors">Sectors</TabsTrigger>
                <TabsTrigger value="commodities">Commodities</TabsTrigger>
              </TabsList>
              <TabsContent value="indices">
                <div className="grid gap-4 md:grid-cols-3">
                  {marketData.map((item) => (
                    <div key={item.symbol} className="rounded-lg bg-card p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-bold">{item.symbol}</div>
                        <div className={`flex items-center ${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {item.change >= 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          {item.change >= 0 ? "+" : ""}
                          {item.change}%
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{item.name}</div>
                      <div className="mt-2 text-lg font-bold">${item.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sectors">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { name: "Technology", change: 1.25, icon: <LineChart className="h-4 w-4" /> },
                    { name: "Healthcare", change: 0.75, icon: <LineChart className="h-4 w-4" /> },
                    { name: "Financials", change: 0.32, icon: <LineChart className="h-4 w-4" /> },
                    { name: "Consumer Discretionary", change: -0.45, icon: <LineChart className="h-4 w-4" /> },
                    { name: "Energy", change: -1.21, icon: <LineChart className="h-4 w-4" /> },
                    { name: "Utilities", change: 0.15, icon: <LineChart className="h-4 w-4" /> },
                  ].map((sector) => (
                    <div key={sector.name} className="rounded-lg bg-card p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-bold">{sector.name}</div>
                        <div className={`flex items-center ${sector.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {sector.change >= 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          {sector.change >= 0 ? "+" : ""}
                          {sector.change}%
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                          {sector.icon}
                        </div>
                        <Button variant="ghost" size="sm">
                          View Stocks
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="commodities">
                <div className="grid gap-4 md:grid-cols-3">
                  {[
                    { name: "Gold", symbol: "GC=F", price: 2345.67, change: 0.45 },
                    { name: "Silver", symbol: "SI=F", price: 27.89, change: 0.32 },
                    { name: "Crude Oil", symbol: "CL=F", price: 78.45, change: -1.25 },
                    { name: "Natural Gas", symbol: "NG=F", price: 2.34, change: -2.15 },
                    { name: "Copper", symbol: "HG=F", price: 4.56, change: 0.87 },
                    { name: "Wheat", symbol: "ZW=F", price: 645.75, change: 1.23 },
                  ].map((commodity) => (
                    <div key={commodity.name} className="rounded-lg bg-card p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="font-bold">{commodity.name}</div>
                        <div
                          className={`flex items-center ${commodity.change >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {commodity.change >= 0 ? (
                            <TrendingUp className="mr-1 h-4 w-4" />
                          ) : (
                            <TrendingDown className="mr-1 h-4 w-4" />
                          )}
                          {commodity.change >= 0 ? "+" : ""}
                          {commodity.change}%
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">{commodity.symbol}</div>
                      <div className="mt-2 text-lg font-bold">${commodity.price.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Watchlist</CardTitle>
            <Button variant="ghost" size="sm">
              <PieChart className="mr-2 h-4 w-4" /> Edit
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {watchlistData.map((stock) => (
                <div key={stock.symbol} className="flex items-center justify-between rounded-lg bg-card p-3">
                  <div>
                    <div className="font-bold">{stock.symbol}</div>
                    <div className="text-xs text-muted-foreground">{stock.name}</div>
                  </div>
                  <div>
                    <div className="text-right font-bold">${stock.price.toFixed(2)}</div>
                    <div className={`text-right text-xs ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              <BarChart3 className="mr-2 h-4 w-4" /> Add Symbol
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Learning Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Education</CardTitle>
          <CardDescription>Learn the fundamentals of trading and investing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Stock Market Basics",
                description: "Learn the fundamentals of how the stock market works",
                icon: <LineChart className="h-5 w-5" />,
              },
              {
                title: "Technical Analysis",
                description: "Master chart patterns and technical indicators",
                icon: <BarChart3 className="h-5 w-5" />,
              },
              {
                title: "Risk Management",
                description: "Strategies to protect your capital and manage risk",
                icon: <DollarSign className="h-5 w-5" />,
              },
            ].map((resource, index) => (
              <div key={index} className="rounded-lg bg-card p-4">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  {resource.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold">{resource.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground">{resource.description}</p>
                <Button variant="link" className="h-auto p-0">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
