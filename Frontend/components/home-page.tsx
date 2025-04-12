"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  ChevronRight,
  Search,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const popularStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.32,
    change: 1.42,
  },
  // ... rest of your stock data
]

export function HomePage() {
  const [isClient, setIsClient] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    
    // Stars animation - client-side only
    if (starsRef.current) {
      const starsContainer = starsRef.current
      starsContainer.innerHTML = ""

      const createStar = () => {
        const star = document.createElement("div")
        star.classList.add("star")
        const size = Math.random() * 2 + 1
        star.style.width = `${size}px`
        star.style.height = `${size}px`
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`
        const duration = Math.random() * 3 + 2
        star.style.setProperty("--duration", `${duration}s`)
        starsContainer.appendChild(star)
      }

      for (let i = 0; i < 100; i++) createStar()
    }
  }, [])

  const handleSearchFocus = () => {
    setSearchActive(true)
    searchInputRef.current?.focus()
  }

  const handleSearchBlur = () => {
    if (!searchQuery) setSearchActive(false)
  }

  const handleBackdropClick = () => {
    setSearchActive(false)
    setSearchQuery("")
    searchInputRef.current?.blur()
  }

  if (!isClient) {
    return (
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white">
              Loading Market Data...
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div ref={starsRef} className="stars fixed inset-0 -z-10" />

      <section className="py-12">
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
              LOREM IPSUM<br />
              <span className="gradient-text">LORUM IPSUM</span>
            </h1>

            <div className="relative z-20 mx-auto max-w-2xl">
              <div className="relative">
                {searchActive && (
                  <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={handleBackdropClick}
                  />
                )}
                
                <div className="relative rounded-full bg-white/10 p-1 backdrop-blur-md transition-all duration-200">
                  <div className="flex items-center">
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for stocks, indices, or cryptocurrencies..."
                      className="h-12 flex-1 border-none bg-transparent pl-4 pr-14 text-white placeholder:text-white/50 focus:ring-0 focus:border-none focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                    />
                    <div 
                      className="absolute right-1 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-white cursor-pointer hover:bg-primary/30 transition-colors"
                      onClick={handleSearchFocus}
                    >
                      <Search className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          <section className="bg-gradient-to-br from-card/50 to-card py-16">
              <div className="container mx-auto px-4">
                  <div className="mx-auto max-w-4xl">
                      <div className="mb-8 text-center">
                          <h2 className="mb-3 text-3xl font-bold">
                              Virtual Trading Simulator
                          </h2>
                          <p className="text-muted-foreground">
                              Learn how to trade without risking real money. Our
                              virtual trading platform simulates real market
                              conditions.
                          </p>
                      </div>

                      <div className="mb-10 grid gap-6 md:grid-cols-3">
                          <Card className="border-none bg-gradient-to-br from-card to-card/50 shadow-lg">
                              <CardContent className="p-6">
                                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                                      <span className="text-xl font-bold text-primary">
                                          1
                                      </span>
                                  </div>
                                  <h3 className="mb-2 text-xl font-bold">
                                      Start with $100,000
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                      Begin your virtual trading journey with
                                      $100,000 in simulated capital to build
                                      your portfolio.
                                  </p>
                              </CardContent>
                          </Card>

                          <Card className="border-none bg-gradient-to-br from-card to-card/50 shadow-lg">
                              <CardContent className="p-6">
                                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                                      <span className="text-xl font-bold text-primary">
                                          2
                                      </span>
                                  </div>
                                  <h3 className="mb-2 text-xl font-bold">
                                      Trade Real-Time Data
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                      Experience real market conditions with
                                      live data, charts, and analysis tools.
                                  </p>
                              </CardContent>
                          </Card>

                          <Card className="border-none bg-gradient-to-br from-card to-card/50 shadow-lg">
                              <CardContent className="p-6">
                                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                                      <span className="text-xl font-bold text-primary">
                                          3
                                      </span>
                                  </div>
                                  <h3 className="mb-2 text-xl font-bold">
                                      Track Performance
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                      Monitor your trading performance with
                                      detailed analytics and performance
                                      metrics.
                                  </p>
                              </CardContent>
                          </Card>
                      </div>

                      <div className="flex justify-center">
                          <Link href="/virtual-trading">
                              <Button size="lg" className="group">
                                  Start Virtual Trading
                                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                              </Button>
                          </Link>
                      </div>
                  </div>
              </div>
          </section>

          {/* Market insights section */}
          <section className="py-16">
              <div className="container mx-auto px-4">
                  <div className="mb-8 flex items-center justify-between">
                      <h2 className="text-2xl font-bold">
                          Latest Market Insights
                      </h2>
                      <Link href="/news">
                          <Button variant="outline" size="sm">
                              View All <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                      </Link>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                      {[
                          {
                              title: "Fed Signals Potential Rate Cuts in Coming Months",
                              category: "Economy",
                              time: "2 hours ago",
                              image: "/placeholder.svg?height=200&width=400",
                          },
                          {
                              title: "Tech Stocks Rally on Strong Earnings Reports",
                              category: "Markets",
                              time: "4 hours ago",
                              image: "/placeholder.svg?height=200&width=400",
                          },
                          {
                              title: "Oil Prices Stabilize After Recent Volatility",
                              category: "Commodities",
                              time: "6 hours ago",
                              image: "/placeholder.svg?height=200&width=400",
                          },
                      ].map((article, index) => (
                          <Card
                              key={index}
                              className="overflow-hidden border-none shadow-lg"
                          >
                              <div className="aspect-video overflow-hidden">
                                  <img
                                      src={article.image || "/placeholder.svg"}
                                      alt={article.title}
                                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                  />
                              </div>
                              <CardContent className="p-4">
                                  <div className="mb-2 flex items-center justify-between">
                                      <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                                          {article.category}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                          {article.time}
                                      </span>
                                  </div>
                                  <h3 className="mb-2 text-lg font-bold">
                                      {article.title}
                                  </h3>
                                  <Link href="/news">
                                      <Button
                                          variant="ghost"
                                          size="sm"
                                          className="px-0 text-primary hover:bg-transparent hover:text-primary/80"
                                      >
                                          Read More{" "}
                                          <ChevronRight className="ml-1 h-4 w-4" />
                                      </Button>
                                  </Link>
                              </CardContent>
                          </Card>
                      ))}
                  </div>
              </div>
          </section>
      </div>
  );
}
