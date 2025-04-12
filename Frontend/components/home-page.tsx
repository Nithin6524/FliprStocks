"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  DollarSign,
  LineChart,
  Search,
  Timer,    
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

import SearchStocks from "@/components/search-components"

// Stock data
const popularStocks = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.32,
    change: 1.42,
    color: "from-blue-500 to-cyan-400",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 415.56,
    change: 2.78,
    color: "from-indigo-500 to-purple-400",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 172.63,
    change: -0.87,
    color: "from-red-500 to-pink-400",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.12,
    change: 3.25,
    color: "from-amber-500 to-yellow-400",
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 237.49,
    change: -3.15,
    color: "from-emerald-500 to-teal-400",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 124.67,
    change: 5.23,
    color: "from-violet-500 to-purple-400",
  },
]

export function HomePage() {
  const [searchActive, setSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)

  // Create animated stars background
  useEffect(() => {
    if (!starsRef.current) return

    const starsContainer = starsRef.current
    starsContainer.innerHTML = ""

    const createStar = () => {
      const star = document.createElement("div")
      star.classList.add("star")

      // Random size between 1-3px
      const size = Math.random() * 2 + 1
      star.style.width = `${size}px`
      star.style.height = `${size}px`

      // Random position
      star.style.left = `${Math.random() * 100}%`
      star.style.top = `${Math.random() * 100}%`

      // Random animation duration
      const duration = Math.random() * 3 + 2
      star.style.setProperty("--duration", `${duration}s`)

      starsContainer.appendChild(star)
    }

    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      createStar()
    }
  }, [])

  // Handle search focus
  const handleSearchFocus = () => {
    setSearchActive(true)
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  // Handle search blur
  const handleSearchBlur = () => {
    if (!searchQuery) {
      setSearchActive(false)
    }
  }

  // Handle search backdrop click
  const handleBackdropClick = () => {
    setSearchActive(false)
    setSearchQuery("")
    if (searchInputRef.current) {
      searchInputRef.current.blur()
    }
  }

  return (
      <div className="relative">
          <section className="py-12">
              <div className="container relative z-10 mx-auto px-4">
                  {/* Main heading */}
                  <div className="mx-auto max-w-4xl text-center">
                      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
                          Lorem Ipsum dolor <br />
                          <span className="gradient-text">Lorem Ipsum</span>
                      </h1>

                  <SearchStocks/>
                  </div>
              </div>
          </section>

          <section className="py-12">
              <div className="container mx-auto px-4">
                  <h2 className="mb-6 text-2xl font-bold">Popular Stocks</h2>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                      {popularStocks.map((stock) => (
                          <Link href="/overview" key={stock.symbol}>
                              <Card className="stock-card overflow-hidden border-none bg-gradient-to-br from-card/50 to-card shadow-lg">
                                  <CardContent className="p-4">
                                      <div className="mb-2 flex items-center justify-between">
                                          <div className="rounded-md bg-gradient-to-r from-primary/20 to-secondary/20 px-2 py-1">
                                              <span className="text-sm font-bold">
                                                  {stock.symbol}
                                              </span>
                                          </div>
                                          {stock.change > 0 ? (
                                              <div className="flex items-center text-green-500">
                                                  <TrendingUp className="mr-1 h-3 w-3" />
                                                  <span className="text-xs font-medium">
                                                      +{stock.change}%
                                                  </span>
                                              </div>
                                          ) : (
                                              <div className="flex items-center text-red-500">
                                                  <TrendingDown className="mr-1 h-3 w-3" />
                                                  <span className="text-xs font-medium">
                                                      {stock.change}%
                                                  </span>
                                              </div>
                                          )}
                                      </div>
                                      <div className="mb-1 truncate text-sm text-muted-foreground">
                                          {stock.name}
                                      </div>
                                      <div className="text-lg font-bold">
                                          ${stock.price.toFixed(2)}
                                      </div>
                                  </CardContent>
                              </Card>
                          </Link>
                      ))}
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
