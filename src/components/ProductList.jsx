import React from "react";
import ProductCard from "./ProductCard";
import Sidebar from "./Sidebar";
import { useFilters } from "../hooks/useFilters";

const ProductList = () => {
  const {
    filteredProducts,
    filters,
    handleFilterChange,
    // handleSearchChange,
    // searchTerm,
  } = useFilters();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/4">
            <Sidebar filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Product Listing</h1>
              <div className="text-sm text-gray-600">
                Showing {filteredProducts.length} products
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-2">
                  No products found
                </h2>
                <p className="text-gray-600">
                  Try adjusting your filters or search term
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
