import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced product data with real image URLs and descriptions
const sampleProducts = [
  {
    id: 1,
    name: "Running Shoes",
    price: 99,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description:
      "Comfortable running shoes for all terrains with extra cushioning",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description:
      "High-quality sound with noise cancellation and 30-hour battery life",
  },
  {
    id: 3,
    name: "Backpack",
    price: 129,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description:
      "Durable backpack with multiple compartments and laptop sleeve",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Track your fitness and stay connected with health monitoring",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 149,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Stylish UV protection sunglasses with polarized lenses",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 499,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Capture high-quality photos and videos with 4K recording",
  },
  {
    id: 7,
    name: "T-Shirt",
    price: 29,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Comfortable cotton t-shirt in various colors and sizes",
  },
  {
    id: 8,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description:
      "Latest smartphone with advanced features and high-resolution camera",
  },
];

const categories = ["All", "Electronics", "Clothing", "Home"];

// Custom hook for filtering products
const useProductFilters = (products, searchParams, searchTerm) => {
  const categoryFilter = searchParams.get("category") || "All";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 1000;

  const filteredProducts = useMemo(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      result = result.filter((product) => product.category === categoryFilter);
    }

    // Apply price filter
    result = result.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    return result;
  }, [products, categoryFilter, minPrice, maxPrice, searchTerm]);

  return {
    filteredProducts,
    categoryFilter,
    minPrice,
    maxPrice,
  };
};

const HomePage = () => {
  const [products] = useState(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSort, setActiveSort] = useState("default");

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const { filteredProducts, categoryFilter, minPrice, maxPrice } =
    useProductFilters(products, searchParams, searchTerm);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleCategoryChange = useCallback(
    (category) => {
      setSearchParams({
        category,
        minPrice,
        maxPrice,
      });
    },
    [minPrice, maxPrice, setSearchParams]
  );

  const handlePriceChange = useCallback(
    (min, max) => {
      setSearchParams({
        category: categoryFilter,
        minPrice: min,
        maxPrice: max,
      });
    },
    [categoryFilter, setSearchParams]
  );

  const handleSortChange = (sortType) => {
    setActiveSort(sortType);
  };

  // Sort products based on active sort
  const sortedProducts = useMemo(() => {
    const productsToSort = [...filteredProducts];

    switch (activeSort) {
      case "price-low-high":
        return productsToSort.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return productsToSort.sort((a, b) => b.price - a.price);
      case "name":
        return productsToSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return productsToSort;
    }
  }, [filteredProducts, activeSort]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
      <Header onSearch={handleSearch} />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 sticky top-6 border border-gray-600">
              <h2 className="text-lg font-semibold text-amber-50 mb-4">
                Filters
              </h2>
              <Sidebar
                categories={categories}
                selectedCategory={categoryFilter}
                onCategoryChange={handleCategoryChange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-amber-50 mb-4">
                Our Premium Collection
              </h1>
              <p className="text-xl text-amber-100 max-w-3xl mx-auto">
                Discover our wide range of high-quality products curated just
                for you
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-amber-50 mb-1">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "Product" : "Products"}
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {categoryFilter !== "All" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-900 text-amber-100">
                      {categoryFilter}
                      <button
                        onClick={() => handleCategoryChange("All")}
                        className="ml-2 text-amber-200 hover:text-amber-50"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {(minPrice > 0 || maxPrice < 1000) && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-900 text-emerald-100">
                      ${minPrice} - ${maxPrice}
                      <button
                        onClick={() => handlePriceChange(0, 1000)}
                        className="ml-2 text-emerald-200 hover:text-emerald-50"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-100">
                      Search: {searchTerm}
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 text-blue-200 hover:text-blue-50"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="mt-4 sm:mt-0">
                <select
                  value={activeSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-amber-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="default">Sort by: Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse border border-gray-600"
                  >
                    <div className="h-48 bg-gray-600"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-600 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-600 rounded w-1/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-gray-700 rounded-xl shadow-sm p-12 text-center border border-gray-600">
                <div className="max-w-md mx-auto">
                  <div className="text-amber-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-amber-50 mb-2">
                    No products found
                  </h3>
                  <p className="text-amber-100 mb-6">
                    We couldn't find any products matching your filters. Try
                    adjusting your search criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setSearchTerm("");
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-amber-50 bg-amber-700 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {sortedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default React.memo(HomePage);
