import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Shield,
  CreditCard,
  Star,
} from "lucide-react";

// Sample recommended products data
const recommendedProducts = [
  {
    id: 101,
    name: "Wireless Mouse",
    price: 29.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Ergonomic wireless mouse with long battery life",
    rating: 4.5,
  },
  {
    id: 102,
    name: "Phone Case",
    price: 19.99,
    category: "Accessories",
    image:
      "https://fullyfilmy.in/cdn/shop/files/Man-With-A-Plan-Phone-Case-Master.png?v=1717225594&auto=format&fit=crop&w=600&q=80",
    description: "Durable protective case with premium materials",
    rating: 4.2,
  },
  {
    id: 103,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    image:
      "https://www.jainsonsemporio.com/cdn/shop/files/HT904-T_Lamp.1.jpg?v=1755373271&auto=format&fit=crop&w=600&q=80",
    description: "Adjustable LED desk lamp with touch controls",
    rating: 4.7,
  },
  {
    id: 104,
    name: "Water Bottle",
    price: 24.99,
    category: "Lifestyle",
    image:
      "https://www.brandkiosk.in/cdn/shop/products/8525550893.jpg?v=1705677018&auto=format&fit=crop&w=600&q=80",
    description: "Insulated stainless steel water bottle",
    rating: 4.3,
  },
];

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    addToCart,
  } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toUpperCase() === "FREESHIP") {
      setDiscount(shipping);
    } else {
      setDiscount(0);
      alert("Invalid promo code. Try 'SAVE10' or 'FREESHIP'");
    }
  };

  const handleAddRecommended = (product) => {
    addToCart(product);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-amber-400 mb-6">
              <ShoppingBag size={64} className="mx-auto" />
            </div>
            <h1 className="text-3xl font-bold text-amber-50 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-amber-100 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-amber-600 text-amber-50 rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-amber-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-50 mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-amber-100">
            {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in
            your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-gray-700 rounded-xl shadow-lg overflow-hidden border border-gray-600">
              <div className="divide-y divide-gray-600">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                    <div className="sm:w-1/4 mb-4 sm:mb-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-md flex items-center justify-center overflow-hidden">
                        {/* Real Product Image */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="sm:w-1/2 px-4">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-lg font-medium text-amber-50 hover:text-amber-200 transition"
                      >
                        {item.name}
                      </Link>
                      <p className="text-amber-100 mt-1">${item.price}</p>
                      {item.selectedColor && (
                        <p className="text-amber-100 text-sm mt-1">
                          Color: {item.selectedColor}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-amber-100 text-sm mt-1">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>
                    <div className="sm:w-1/4 flex flex-col items-end justify-between">
                      <div className="flex items-center bg-gray-600 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 text-amber-100 hover:bg-gray-500 rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-2 w-8 text-center text-amber-50">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 text-amber-100 hover:bg-gray-500 rounded-r-lg"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-amber-50 mr-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center text-amber-100 hover:text-amber-50 transition-colors"
              >
                <ArrowLeft size={18} className="mr-2" /> Continue Shopping
              </Link>

              <div className="flex items-center space-x-2">
                <span className="text-amber-100">Need help?</span>
                <Link
                  to="/contact"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-700 rounded-xl shadow-lg p-6 sticky top-6 border border-gray-600">
              <h2 className="text-xl font-bold text-amber-50 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-amber-100">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-amber-100">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-600 pt-3 mt-3">
                  <div className="flex justify-between font-bold text-amber-50">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-amber-100 mb-2">Promo Code</label>
                <div className="flex">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-gray-600 border border-gray-500 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-amber-50 placeholder-amber-200"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-amber-600 text-amber-50 rounded-r-lg hover:bg-amber-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-amber-100 mt-1">
                  Try "SAVE10" or "FREESHIP"
                </p>
              </div>

              <button className="w-full bg-gradient-to-r from-amber-600 to-amber-700 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-md mb-4">
                Proceed to Checkout
              </button>

              {/* Security Features */}
              <div className="space-y-3 mt-6">
                <div className="flex items-center text-amber-100">
                  <Truck size={16} className="mr-2 text-amber-400" />
                  <span className="text-sm">
                    Free shipping on orders over $100
                  </span>
                </div>
                <div className="flex items-center text-amber-100">
                  <Shield size={16} className="mr-2 text-amber-400" />
                  <span className="text-sm">Secure payment processing</span>
                </div>
                <div className="flex items-center text-amber-100">
                  <CreditCard size={16} className="mr-2 text-amber-400" />
                  <span className="text-sm">Multiple payment options</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-amber-50">
              You May Also Like
            </h2>
            <Link
              to="/products"
              className="text-amber-400 hover:text-amber-300 transition-colors text-sm"
            >
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-700 rounded-xl overflow-hidden border border-gray-600 transition-all hover:shadow-lg"
              >
                {/* Product Image */}
                <div className="h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-xs px-2 py-1 bg-gray-600 text-amber-100 rounded">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="font-medium text-amber-50 mb-1 line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-amber-100 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={
                            i < Math.floor(product.rating)
                              ? "currentColor"
                              : "none"
                          }
                          className={
                            i < Math.floor(product.rating)
                              ? "text-amber-400"
                              : "text-gray-500"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-amber-100 ml-1">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-50">
                      ${product.price}
                    </span>
                    <button
                      onClick={() => handleAddRecommended(product)}
                      className="px-3 py-1 bg-amber-600 text-amber-50 text-sm rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
