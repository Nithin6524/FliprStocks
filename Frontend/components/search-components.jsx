import { useState, useRef } from "react";
import { Search, ChevronRight } from "lucide-react";
import { Input } from "./ui/input"; // Shadcn Input
import { Button } from "./ui/button"; // Shadcn Button
import axios from "axios";
import Link from "next/link"; // Import Next.js Link

const SearchStocks = () => {
    // State for search input and results
    const [searchQuery, setSearchQuery] = useState("");
    const [searchActive, setSearchActive] = useState(false);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchInputRef = useRef(null);

    // Handle search focus (show backdrop)
    const handleSearchFocus = () => {
        setSearchActive(true);
    };

    // Handle backdrop click (clear search)
    const handleBackdropClick = () => {
        setSearchQuery("");
        setSearchActive(false);
        setStocks([]);
        setError(null);
        if (searchInputRef.current) {
            searchInputRef.current.value = "";
        }
    };

    // Fetch stocks on button click
    const handleSearchSubmit = async () => {
        if (!searchQuery.trim()) {
            setError("Please enter a search term");
            setStocks([]);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(
                `http://localhost:5001/stocks/?=${searchQuery.trim()}`,
                {
                    params: { search: searchQuery.trim() },
                }
            );
            const fetchedStocks = response.data.data || [];
            setStocks(fetchedStocks);
            if (fetchedStocks.length === 0) {
                setError("No stocks found for this search");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch stocks");
            setStocks([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl text-center">
            {/* Search Bar */}
            <div
                className={`search-container relative z-20 mx-auto max-w-2xl ${
                    searchActive ? "active" : ""
                }`}
            >
                <div className="relative">
                    <div
                        className={`search-backdrop fixed inset-0 bg-black/50 backdrop-blur-sm ${
                            searchActive ? "active" : ""
                        }`}
                    ></div>

                    <div className="relative rounded-full bg-white/10 p-1 backdrop-blur-md">
                        <div className="flex items-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-white">
                                <Search className="h-5 w-5" />
                            </div>
                            <Input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search by ticker, name, or industry"
                                className="h-12 flex-1 border-none bg-transparent pl-2 text-white placeholder:text-white/50 focus:ring-0"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    // Trigger search immediately on input change
                                    handleSearchSubmit(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div className="mt-8">
                {loading && <p className="text-white/70">Loading stocks...</p>}
                {error && <p className="text-red-400">{error}</p>}

                {/* Display results as they're being typed */}
                {searchQuery && !loading && !error && (
                    <div className="mx-auto max-w-3xl">
                        {stocks.length > 0 ? (
                            <div className="max-h-96 overflow-y-auto rounded-lg border border-white/10 bg-white/5">
                                {stocks.map((stock) => (
                                    <Link
                                        href={`/overview?ticker=${stock.ticker}`}
                                        key={stock.ticker}
                                        passHref
                                        legacyBehavior
                                    >
                                        <a className="flex items-center justify-between border-b border-white/10 p-4 hover:bg-white/10 transition-colors duration-200">
                                            <div className="font-bold text-primary">
                                                {stock.ticker}
                                            </div>
                                            <div className="text-white/90">
                                                {stock.short_name}
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-white/70">
                                No matching stocks found
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchStocks;
