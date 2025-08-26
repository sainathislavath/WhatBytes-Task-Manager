import React, { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);

  // Update price range when props change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  const handlePriceChange = (e) => {
    const newMin = parseInt(e.target.value);
    const newMax = priceRange[1];
    setPriceRange([newMin, newMax]);
  };

  const handlePriceChangeMax = (e) => {
    const newMin = priceRange[0];
    const newMax = parseInt(e.target.value);
    setPriceRange([newMin, newMax]);
  };

  const applyPriceFilter = () => {
    onPriceChange(priceRange[0], priceRange[1]);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    onCategoryChange("All");
    onPriceChange(0, 1000);
  };

  return (
    <aside className="w-full bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-600">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-amber-50 flex items-center">
          <Filter size={20} className="mr-2 text-amber-400" />
          Filters
        </h2>
        <button
          onClick={resetFilters}
          className="text-sm text-amber-100 hover:text-amber-50 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <h3 className="font-semibold text-amber-50">Category</h3>
          {isCategoryOpen ? (
            <ChevronUp size={18} className="text-amber-400" />
          ) : (
            <ChevronDown size={18} className="text-amber-400" />
          )}
        </div>

        {isCategoryOpen && (
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-amber-600 to-amber-700 text-amber-50 font-medium shadow-sm"
                    : "bg-gray-600 text-amber-100 hover:bg-gray-500"
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <div className="flex items-center">
                  <span className="flex-1">{category}</span>
                  {selectedCategory === category && (
                    <span className="w-2 h-2 rounded-full bg-amber-50"></span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <div
          className="flex items-center justify-between cursor-pointer mb-3"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
        >
          <h3 className="font-semibold text-amber-50">Price Range</h3>
          {isPriceOpen ? (
            <ChevronUp size={18} className="text-amber-400" />
          ) : (
            <ChevronDown size={18} className="text-amber-400" />
          )}
        </div>

        {isPriceOpen && (
          <div className="space-y-6">
            <div className="bg-gray-600 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-amber-100 font-medium">
                  ${priceRange[0]}
                </span>
                <span className="text-amber-100 font-medium">
                  ${priceRange[1]}
                </span>
              </div>

              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
              </div>

              <div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={handlePriceChangeMax}
                  className="w-full h-2 bg-gray-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-500"
                />
              </div>
            </div>

            <button
              onClick={applyPriceFilter}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-md font-medium text-amber-50"
            >
              Apply Price Filter
            </button>
          </div>
        )}
      </div>

      {/* Additional Filters Section */}
      <div>
        <h3 className="font-semibold text-amber-50 mb-3">Popular Filters</h3>
        <div className="space-y-3">
          <button className="flex items-center w-full text-left px-4 py-3 bg-gray-600 rounded-lg text-amber-100 hover:bg-gray-500 transition-colors">
            <span className="w-3 h-3 rounded-full border border-amber-400 mr-3"></span>
            On Sale
          </button>
          <button className="flex items-center w-full text-left px-4 py-3 bg-gray-600 rounded-lg text-amber-100 hover:bg-gray-500 transition-colors">
            <span className="w-3 h-3 rounded-full border border-amber-400 mr-3"></span>
            In Stock
          </button>
          <button className="flex items-center w-full text-left px-4 py-3 bg-gray-600 rounded-lg text-amber-100 hover:bg-gray-500 transition-colors">
            <span className="w-3 h-3 rounded-full border border-amber-400 mr-3"></span>
            Free Shipping
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
