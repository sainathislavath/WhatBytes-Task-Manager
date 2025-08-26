import React, { useState } from "react";

const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
}) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

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

  return (
    <aside className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full text-left px-3 py-2 rounded-md ${
                selectedCategory === category
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Price Range</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Min: ${priceRange[0]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Max: ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={handlePriceChangeMax}
              className="w-full"
            />
          </div>
          <button
            onClick={applyPriceFilter}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Apply Price Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
