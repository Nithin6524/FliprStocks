"use client"

import { Calendar, ExternalLink, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NewsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Market News</h1>
          <p className="text-muted-foreground">Latest updates and insights for AAPL and the market</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="text" placeholder="Search news..." className="pl-9 md:w-[200px]" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <TabsList>
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="aapl">AAPL News</TabsTrigger>
            <TabsTrigger value="market">Market News</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>
          <Select defaultValue="latest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="relevance">Relevance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Apple's AI Strategy: What to Expect at WWDC 2024",
                source: "TechCrunch",
                date: "2 hours ago",
                image: "/stock.jpg",
                category: "Technology",
                summary:
                  "Apple is expected to unveil its AI strategy at WWDC 2024, potentially introducing new features for iOS 18 and macOS 15.",
              },
              {
                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                source: "Bloomberg",
                date: "5 hours ago",
                image: "/fghj.jpeg",
                category: "Earnings",
                summary:
                  "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
              },
              {
                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                source: "CNBC",
                date: "6 hours ago",
                image: "/asd.jpg",
                category: "Earnings",
                summary:
                  "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
              },
              {
                title: "Apple Supplier TSMC Reports Strong Demand for Advanced Chips",
                source: "Reuters",
                date: "8 hours ago",
                image: "/stock.jpg",
                category: "Supply Chain",
                summary:
                  "TSMC, a key Apple supplier, reported strong demand for advanced chips, potentially benefiting Apple's future products.",
              },
              {
                title: "Apple's iPhone 16 Production Ramps Up Ahead of Fall Launch",
                source: "Wall Street Journal",
                date: "10 hours ago",
                image: "/fghj.jpeg",
                category: "Products",
                summary:
                  "Apple has reportedly started ramping up production of the iPhone 16 series ahead of its expected fall launch.",
              },
              {
                title: "Tech Stocks Rally as Market Anticipates Fed Rate Cut",
                source: "Financial Times",
                date: "12 hours ago",
                image: "/asd.jpg",
                category: "Market",
                summary:
                  "Tech stocks, including Apple, rallied as investors anticipate a potential Federal Reserve interest rate cut.",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border p-4">
                  <span className="text-xs font-medium">{article.source}</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Read More <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline">Load More News</Button>
          </div>
        </TabsContent>

        <TabsContent value="aapl" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Apple's AI Strategy: What to Expect at WWDC 2024",
                source: "TechCrunch",
                date: "2 hours ago",
                image: "/stock.jpg",
                category: "Technology",
                summary:
                  "Apple is expected to unveil its AI strategy at WWDC 2024, potentially introducing new features for iOS 18 and macOS 15.",
              },
              {
                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                source: "Bloomberg",
                date: "5 hours ago",
                image: "/stock.jpg",
                category: "Earnings",
                summary:
                  "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
              },
              {
                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                source: "CNBC",
                date: "6 hours ago",
                image: "/stock.jpg",
                category: "Earnings",
                summary:
                  "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border p-4">
                  <span className="text-xs font-medium">{article.source}</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Read More <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Tech Stocks Rally as Market Anticipates Fed Rate Cut",
                source: "Financial Times",
                date: "12 hours ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Market",
                summary:
                  "Tech stocks, including Apple, rallied as investors anticipate a potential Federal Reserve interest rate cut.",
              },
              {
                title: "S&P 500 Reaches New All-Time High Amid Tech Sector Strength",
                source: "Wall Street Journal",
                date: "1 day ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Market",
                summary:
                  "The S&P 500 reached a new all-time high, driven by strong performance in the technology sector.",
              },
              {
                title: "Market Volatility Increases as Earnings Season Begins",
                source: "Bloomberg",
                date: "2 days ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Market",
                summary:
                  "Market volatility has increased as the Q2 earnings season begins, with investors closely watching tech giants.",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border p-4">
                  <span className="text-xs font-medium">{article.source}</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Read More <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Apple Reports Strong Q2 Earnings, Beats Expectations",
                source: "Bloomberg",
                date: "5 hours ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Earnings",
                summary:
                  "Apple reported Q2 earnings that exceeded analyst expectations, with strong performance in Services and iPhone sales.",
              },
              {
                title: "Apple's Services Revenue Hits All-Time High in Latest Quarter",
                source: "CNBC",
                date: "6 hours ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Earnings",
                summary:
                  "Apple's services segment, including App Store, Apple Music, and Apple TV+, reached a new record in the latest quarter.",
              },
              {
                title: "Tech Earnings Season: What to Expect from Big Tech",
                source: "Reuters",
                date: "1 day ago",
                image: "/placeholder.svg?height=200&width=400",
                category: "Earnings",
                summary: "An overview of what to expect from major tech companies during the current earnings season.",
              },
            ].map((article, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" /> {article.date}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-3 text-sm text-muted-foreground">{article.summary}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-border p-4">
                  <span className="text-xs font-medium">{article.source}</span>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    Read More <ExternalLink className="h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Featured Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Apple's AI Strategy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">Apple's AI Strategy: Implications for Investors</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  An in-depth analysis of Apple's AI strategy and what it means for long-term investors.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">By John Smith</span>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Apple's Services Growth"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">The Growth of Apple's Services Ecosystem</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Examining the rapid growth of Apple's services segment and its impact on the company's valuation.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">By Jane Doe</span>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
