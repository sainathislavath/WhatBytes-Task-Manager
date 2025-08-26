import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { useFilters } from "../hooks/useFilters";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SortAsc, Grid, List } from "lucide-react";

const ProductList = () => {
  const { filteredProducts, filters, handleFilterChange } = useFilters();

  const [sortOption, setSortOption] = useState("default");
  const [viewMode, setViewMode] = useState("grid");

  // Sort products based on selected option
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];

    switch (sortOption) {
      case "price-low-high":
        return products.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return products.sort((a, b) => b.price - a.price);
      case "name":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [filteredProducts, sortOption]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 to-gray-900 text-amber-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-50 mb-3">
            Our Product Collection
          </h1>
          <p className="text-amber-100 max-w-3xl">
            Discover our carefully curated selection of premium products
            designed to enhance your lifestyle.
          </p>
        </div>

        {/* Controls Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-amber-400" />
            <span className="text-amber-100">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "Product" : "Products"} Found
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-4 py-2 border border-gray-600">
              <SortAsc size={18} className="text-amber-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-amber-50 focus:outline-none"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1 border border-gray-600">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-amber-600 text-amber-50"
                    : "text-amber-100"
                }`}
                aria-label="Grid view"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-amber-600 text-amber-50"
                    : "text-amber-100"
                }`}
                aria-label="List view"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 sticky top-6 border border-gray-600">
              <h2 className="text-lg font-semibold text-amber-50 mb-4 flex items-center">
                <Filter size={18} className="mr-2 text-amber-400" />
                Filters
              </h2>
              <Sidebar filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            {filteredProducts.length === 0 ? (
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
                    onClick={() => handleFilterChange({})}
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
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "space-y-6"
                  }
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

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-amber-700 to-amber-800 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-50 mb-4">
              Stay Updated with Our Latest Offers
            </h2>
            <p className="text-amber-100 mb-6">
              Subscribe to our newsletter and be the first to know about new
              products and exclusive deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-amber-900 border border-amber-700 text-amber-50 placeholder-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="px-6 py-3 bg-gray-900 text-amber-50 font-medium rounded-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
