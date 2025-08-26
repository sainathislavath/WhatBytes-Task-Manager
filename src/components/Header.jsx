import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header = ({ onSearch }) => {
  const { cartItems } = useCart();
  const [searchValue, setSearchValue] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            ShopEasy
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Cart and Profile */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
