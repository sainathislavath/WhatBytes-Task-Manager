import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          {/* In a real app, this would be an actual image */}
          <div className="text-gray-500">Product Image</div>
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill="currentColor" />
            <Star size={16} fill={rating >= 4 ? "currentColor" : "none"} />
          </div>
          <span className="text-sm text-gray-600 ml-1">({rating})</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
            aria-label="Add to cart"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
