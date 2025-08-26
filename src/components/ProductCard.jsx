import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star, Heart, Eye, Check } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1);

  // Calculate discount percentage for demo
  const discountPercentage = Math.floor(Math.random() * 30 + 10);
  const originalPrice = Math.floor(
    (product.price * (100 + discountPercentage)) / 100
  );

  return (
    <div
      className="bg-gray-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl border border-gray-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Discount Badge */}
      <div className="relative">
        <Link to={`/product/${product.id}`} className="block">
          <div className="h-56 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center overflow-hidden">
            {/* Real Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-amber-600 text-amber-50 text-xs font-bold px-2.5 py-1 rounded-full">
          -{discountPercentage}%
        </div>

        {/* Action Buttons on Hover */}
        <div
          className={`absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-amber-100 hover:bg-amber-700 transition-colors"
            aria-label="Quick view"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Add to Cart Confirmation */}
        {isAdded && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="bg-amber-600 text-amber-50 px-4 py-2 rounded-lg flex items-center">
              <Check size={18} className="mr-2" />
              Added to Cart!
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-800 text-amber-100 rounded">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-lg text-amber-50 mb-2 hover:text-amber-200 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Product Description */}
        <p className="text-amber-100 text-sm mb-3 line-clamp-2">
          {product.description ||
            "High-quality product with excellent features and durability."}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
                className={
                  i < Math.floor(rating) ? "text-amber-400" : "text-gray-500"
                }
              />
            ))}
          </div>
          <span className="text-amber-100 text-sm ml-2">({rating})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-xl text-amber-50">
                ${product.price}
              </span>
              <span className="text-sm text-amber-800 line-through">
                ${originalPrice}
              </span>
            </div>
            <div className="text-xs text-amber-100">Inclusive of all taxes</div>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-amber-600 to-amber-700 p-3 rounded-full hover:from-amber-500 hover:to-amber-600 transition-all shadow-md hover:shadow-lg"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} className="text-amber-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
