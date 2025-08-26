import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { products as mockProducts } from "../data/products";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    brand: searchParams.get("brand") || "all",
    priceRange: {
      min: parseInt(searchParams.get("minPrice")) || 0,
      max: parseInt(searchParams.get("maxPrice")) || 1000,
    },
  });

  // Update URL when filters change
  useEffect(() => {
    const params = {};

    if (filters.category !== "all") params.category = filters.category;
    if (filters.brand !== "all") params.brand = filters.brand;
    if (filters.priceRange.min !== 0) params.minPrice = filters.priceRange.min;
    if (filters.priceRange.max !== 1000)
      params.maxPrice = filters.priceRange.max;

    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Apply filters and search
  useEffect(() => {
    let result = mockProducts;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply brand filter
    if (filters.brand !== "all") {
      result = result.filter(
        (product) => product.brand.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    setFilteredProducts(result);
  }, [filters, searchTerm]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    filteredProducts,
    filters,
    handleFilterChange,
    handleSearchChange,
    searchTerm,
  };
};
