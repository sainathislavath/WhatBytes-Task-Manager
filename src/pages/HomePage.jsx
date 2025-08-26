import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

// Sample product data
const sampleProducts = [
  {
    id: 1,
    name: "Running Shoes",
    price: 99,
    category: "Clothing",
    image: "/shoes.jpg",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129,
    category: "Electronics",
    image: "/headphones.jpg",
  },
  {
    id: 3,
    name: "Backpack",
    price: 129,
    category: "Clothing",
    image: "/backpack.jpg",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 249,
    category: "Electronics",
    image: "/watch.jpg",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 149,
    category: "Clothing",
    image: "/sunglasses.jpg",
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 499,
    category: "Electronics",
    image: "/camera.jpg",
  },
  {
    id: 7,
    name: "T-Shirt",
    price: 29,
    category: "Clothing",
    image: "/tshirt.jpg",
  },
  {
    id: 8,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    image: "/phone.jpg",
  },
];

const categories = ["All", "Electronics", "Clothing", "Home"];

const HomePage = () => {
  const [products, setProducts] = useState(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  // Get filter values from URL
  const categoryFilter = searchParams.get("category") || "All";
  const minPrice = parseInt(searchParams.get("minPrice")) || 0;
  const maxPrice = parseInt(searchParams.get("maxPrice")) || 1000;

  // Apply filters
  useEffect(() => {
    let result = products;

    // Apply search filter
    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
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

    setFilteredProducts(result);
  }, [products, categoryFilter, minPrice, maxPrice, searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCategoryChange = (category) => {
    setSearchParams({
      category,
      minPrice,
      maxPrice,
    });
  };

  const handlePriceChange = (min, max) => {
    setSearchParams({
      category: categoryFilter,
      minPrice: min,
      maxPrice: max,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={handleSearch} />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <Sidebar
            categories={categories}
            selectedCategory={categoryFilter}
            onCategoryChange={handleCategoryChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={handlePriceChange}
          />

          {/* Product Grid */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-6">Products</h1>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No products found. Try changing your filters.
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
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
