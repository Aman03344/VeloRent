"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Search, SlidersHorizontal, X } from "lucide-react"
import CarCard from "./CarCard"
import Loading from "../components/Loading"

const SearchResult = () => {
    const location = useLocation()
    const { cars, isLoading } = useSelector((state) => state.car)
    const [filteredCars, setFilteredCars] = useState([])
    const [searchParams, setSearchParams] = useState({
        query: "",
        category: "",
        priceRange: [0, 10000],
        fuelType: "",
        transmission: "",
        availability: "all",
    })
    const [showFilters, setShowFilters] = useState(false)

    // Parse query parameters on page load
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const query = params.get("query") || ""
        const category = params.get("category") || ""

        setSearchParams((prev) => ({
            ...prev,
            query,
            category,
        }))
    }, [location.search])

    // Filter cars based on search parameters
    useEffect(() => {
        if (!cars || cars.length === 0) return

        let results = [...cars]

        // Filter by search query
        if (searchParams.query) {
            const searchTerms = searchParams.query.toLowerCase().split(" ")
            results = results.filter((car) =>
                searchTerms.some(
                    (term) =>
                        car.name.toLowerCase().includes(term) ||
                        car.company.toLowerCase().includes(term) ||
                        car.category.toLowerCase().includes(term),
                ),
            )
        }

        // Filter by category
        if (searchParams.category) {
            results = results.filter((car) => car.category.toLowerCase() === searchParams.category.toLowerCase())
        }

        // Filter by price range
        results = results.filter((car) => car.rate >= searchParams.priceRange[0] && car.rate <= searchParams.priceRange[1])

        // Filter by fuel type
        if (searchParams.fuelType) {
            results = results.filter((car) => car.fuelType.toLowerCase() === searchParams.fuelType.toLowerCase())
        }

        // Filter by transmission
        if (searchParams.transmission) {
            results = results.filter((car) => car.transmission.toLowerCase() === searchParams.transmission.toLowerCase())
        }

        // Filter by availability
        if (searchParams.availability !== "all") {
            const isAvailable = searchParams.availability === "available"
            results = results.filter((car) => car.isBooked !== isAvailable)
        }

        setFilteredCars(results)
    }, [cars, searchParams])

    const handleSearchChange = (e) => {
        setSearchParams((prev) => ({
            ...prev,
            query: e.target.value,
        }))
    }

    const handleFilterChange = (filterType, value) => {
        setSearchParams((prev) => ({
            ...prev,
            [filterType]: value,
        }))
    }

    const clearFilters = () => {
        setSearchParams({
            query: "",
            category: "",
            priceRange: [0, 10000],
            fuelType: "",
            transmission: "",
            availability: "all",
        })
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className="pt-20 pb-10 px-4 md:px-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Search Results</h1>

                    <div className="flex gap-2">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                value={searchParams.query}
                                onChange={handleSearchChange}
                                placeholder="Search cars..."
                                className="pl-9 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:outline-none"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="bg-white border border-gray-300 rounded-lg p-2 flex items-center gap-2 hover:bg-gray-50"
                        >
                            <SlidersHorizontal size={18} className="text-gray-600" />
                            <span className="hidden md:inline">Filters</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Panel - Desktop */}
                    <div className="hidden lg:block bg-white rounded-xl shadow-sm p-5 h-fit">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Filters</h2>
                            <button onClick={clearFilters} className="text-sm text-orange-500 hover:text-orange-600">
                                Clear all
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Category</h3>
                            <div className="space-y-2">
                                {["sedan", "suv", "hatchback", "coupe", "jeep"].map((category) => (
                                    <div key={category} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`category-${category}`}
                                            name="category"
                                            checked={searchParams.category.toLowerCase() === category}
                                            onChange={() => handleFilterChange("category", category)}
                                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                        />
                                        <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Price Range (₹/day)</h3>
                            <div className="px-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="10000"
                                    step="100"
                                    value={searchParams.priceRange[1]}
                                    onChange={(e) => handleFilterChange("priceRange", [0, Number.parseInt(e.target.value)])}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-xs text-gray-500">₹0</span>
                                    <span className="text-xs text-gray-500">₹{searchParams.priceRange[1]}</span>
                                </div>
                            </div>
                        </div>

                        {/* Fuel Type Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Fuel Type</h3>
                            <div className="space-y-2">
                                {["petrol", "diesel", "cng", "ev"].map((fuel) => (
                                    <div key={fuel} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`fuel-${fuel}`}
                                            name="fuelType"
                                            checked={searchParams.fuelType.toLowerCase() === fuel}
                                            onChange={() => handleFilterChange("fuelType", fuel)}
                                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                        />
                                        <label htmlFor={`fuel-${fuel}`} className="ml-2 text-sm text-gray-700 capitalize">
                                            {fuel === "ev" ? "Electric" : fuel}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Transmission Filter */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium mb-3">Transmission</h3>
                            <div className="space-y-2">
                                {["manual", "automatic"].map((transmission) => (
                                    <div key={transmission} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`transmission-${transmission}`}
                                            name="transmission"
                                            checked={searchParams.transmission.toLowerCase() === transmission}
                                            onChange={() => handleFilterChange("transmission", transmission)}
                                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                        />
                                        <label htmlFor={`transmission-${transmission}`} className="ml-2 text-sm text-gray-700 capitalize">
                                            {transmission}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability Filter */}
                        <div>
                            <h3 className="text-sm font-medium mb-3">Availability</h3>
                            <div className="space-y-2">
                                {[
                                    { value: "all", label: "All Cars" },
                                    { value: "available", label: "Available Only" },
                                    { value: "unavailable", label: "Unavailable" },
                                ].map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`availability-${option.value}`}
                                            name="availability"
                                            checked={searchParams.availability === option.value}
                                            onChange={() => handleFilterChange("availability", option.value)}
                                            className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                        />
                                        <label htmlFor={`availability-${option.value}`} className="ml-2 text-sm text-gray-700">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Filters Panel */}
                    {showFilters && (
                        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
                            <div className="bg-white w-4/5 h-full overflow-y-auto p-5">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold">Filters</h2>
                                    <button onClick={() => setShowFilters(false)}>
                                        <X size={20} className="text-gray-500" />
                                    </button>
                                </div>

                                {/* Mobile filters content - same as desktop but in a slide-out panel */}
                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">Category</h3>
                                    <div className="space-y-2">
                                        {["sedan", "suv", "hatchback", "coupe", "jeep"].map((category) => (
                                            <div key={category} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`mobile-category-${category}`}
                                                    name="category"
                                                    checked={searchParams.category.toLowerCase() === category}
                                                    onChange={() => handleFilterChange("category", category)}
                                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                />
                                                <label
                                                    htmlFor={`mobile-category-${category}`}
                                                    className="ml-2 text-sm text-gray-700 capitalize"
                                                >
                                                    {category}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Range Filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">Price Range (₹/day)</h3>
                                    <div className="px-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="10000"
                                            step="100"
                                            value={searchParams.priceRange[1]}
                                            onChange={(e) => handleFilterChange("priceRange", [0, Number.parseInt(e.target.value)])}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <div className="flex justify-between mt-2">
                                            <span className="text-xs text-gray-500">₹0</span>
                                            <span className="text-xs text-gray-500">₹{searchParams.priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Fuel Type Filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">Fuel Type</h3>
                                    <div className="space-y-2">
                                        {["petrol", "diesel", "cng", "ev"].map((fuel) => (
                                            <div key={fuel} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`mobile-fuel-${fuel}`}
                                                    name="fuelType"
                                                    checked={searchParams.fuelType.toLowerCase() === fuel}
                                                    onChange={() => handleFilterChange("fuelType", fuel)}
                                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                />
                                                <label htmlFor={`mobile-fuel-${fuel}`} className="ml-2 text-sm text-gray-700 capitalize">
                                                    {fuel === "ev" ? "Electric" : fuel}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Transmission Filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">Transmission</h3>
                                    <div className="space-y-2">
                                        {["manual", "automatic"].map((transmission) => (
                                            <div key={transmission} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`mobile-transmission-${transmission}`}
                                                    name="transmission"
                                                    checked={searchParams.transmission.toLowerCase() === transmission}
                                                    onChange={() => handleFilterChange("transmission", transmission)}
                                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                />
                                                <label
                                                    htmlFor={`mobile-transmission-${transmission}`}
                                                    className="ml-2 text-sm text-gray-700 capitalize"
                                                >
                                                    {transmission}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Availability Filter */}
                                <div className="mb-6">
                                    <h3 className="text-sm font-medium mb-3">Availability</h3>
                                    <div className="space-y-2">
                                        {[
                                            { value: "all", label: "All Cars" },
                                            { value: "available", label: "Available Only" },
                                            { value: "unavailable", label: "Unavailable" },
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`mobile-availability-${option.value}`}
                                                    name="availability"
                                                    checked={searchParams.availability === option.value}
                                                    onChange={() => handleFilterChange("availability", option.value)}
                                                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                                                />
                                                <label htmlFor={`mobile-availability-${option.value}`} className="ml-2 text-sm text-gray-700">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <button
                                        onClick={clearFilters}
                                        className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700"
                                    >
                                        Clear All
                                    </button>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="flex-1 py-2 bg-orange-500 text-white rounded-lg"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Results */}
                    <div className="lg:col-span-3">
                        {/* Active Filters */}
                        {(searchParams.category ||
                            searchParams.fuelType ||
                            searchParams.transmission ||
                            searchParams.availability !== "all") && (
                                <div className="bg-white rounded-xl p-3 mb-4 flex flex-wrap gap-2 items-center">
                                    <span className="text-sm text-gray-500 mr-2">Active filters:</span>

                                    {searchParams.category && (
                                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                            <span className="capitalize">{searchParams.category}</span>
                                            <button onClick={() => handleFilterChange("category", "")}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {searchParams.fuelType && (
                                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                            <span className="capitalize">
                                                {searchParams.fuelType === "ev" ? "Electric" : searchParams.fuelType}
                                            </span>
                                            <button onClick={() => handleFilterChange("fuelType", "")}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {searchParams.transmission && (
                                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                            <span className="capitalize">{searchParams.transmission}</span>
                                            <button onClick={() => handleFilterChange("transmission", "")}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {searchParams.availability !== "all" && (
                                        <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                            <span>{searchParams.availability === "available" ? "Available Only" : "Unavailable"}</span>
                                            <button onClick={() => handleFilterChange("availability", "all")}>
                                                <X size={14} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                        {/* Results Count */}
                        <div className="mb-4">
                            <p className="text-gray-600">
                                {filteredCars.length} {filteredCars.length === 1 ? "car" : "cars"} found
                            </p>
                        </div>

                        {filteredCars.length === 0 ? (
                            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <X size={24} className="text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">No cars found</h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn't find any cars matching your search criteria. Try adjusting your filters.
                                </p>
                                <button onClick={clearFilters} className="text-orange-500 font-medium hover:text-orange-600">
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredCars.map((car) => (
                                    <CarCard key={car._id} car={car} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResult
