import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <Link
          to="/"
          className="text-indigo-600 hover:underline flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                  <div className="sm:w-1/4 mb-4 sm:mb-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                      {/* In a real app, this would be an actual image */}
                      <div className="text-gray-500 text-center">
                        <div className="text-2xl mb-1">📦</div>
                        <p className="text-xs">Image</p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:w-1/2 px-4">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-lg font-medium hover:text-indigo-600 transition"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">${item.price}</p>
                  </div>

                  <div className="sm:w-1/4 flex flex-col items-end justify-between">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex items-center">
                      <span className="font-medium mr-4">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
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

          <div className="mt-6">
            <Link
              to="/"
              className="flex items-center text-indigo-600 hover:underline"
            >
              <ArrowLeft size={16} className="mr-1" /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    $
                    {(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(
                      2
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
