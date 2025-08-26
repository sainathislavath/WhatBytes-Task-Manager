import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const Header = ({ onSearch }) => {
  const { cartItems } = useCart();
  const [searchValue, setSearchValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 shadow-xl border-b border-amber-900/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold text-amber-50 hidden sm:block">
              ShopEasy
            </span>
            <span className="text-2xl font-bold text-amber-50 sm:hidden">
              SE
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-50 p-2 rounded-lg hover:bg-gray-700 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-xl text-amber-50 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all group-hover:border-amber-500/50"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Cart and Profile */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative p-2 rounded-xl hover:bg-gray-700/50 transition-colors group"
            >
              <ShoppingCart
                size={24}
                className="text-amber-50 group-hover:text-amber-300 transition-colors"
              />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-700 text-xs rounded-full h-6 w-6 flex items-center justify-center text-white font-bold shadow-lg">
                  {totalItems}
                </span>
              )}
              <span className="sr-only">Shopping cart</span>
            </Link>

            <span
              className="flex items-center space-x-2 p-2 rounded-xl transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center border-2 border-amber-500/30 group-hover:border-amber-400/50 transition-colors">
                <User size={20} className="text-amber-50" />
              </div>
            </span>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 bg-gray-700/70 backdrop-blur-sm border border-gray-600 rounded-xl text-amber-50 placeholder-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400"
                >
                  <Search size={20} />
                </button>
              </div>
            </form>

            <div className="flex justify-around pt-2">
              <Link
                to="/cart"
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="relative">
                  <ShoppingCart size={24} className="text-amber-50" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-amber-700 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-bold">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="text-amber-50 mt-1 text-sm">Cart</span>
              </Link>

              <Link
                to="/profile"
                className="flex flex-col items-center p-3 rounded-xl hover:bg-gray-700/50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                  <User size={18} className="text-amber-50" />
                </div>
                <span className="text-amber-50 mt-1 text-sm">Account</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
