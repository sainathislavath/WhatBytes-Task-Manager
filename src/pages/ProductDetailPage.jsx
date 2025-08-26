import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";

// Sample product data (in a real app, this would come from an API)
const productData = {
  1: {
    id: 1,
    name: "Running Shoes",
    price: 99,
    category: "Clothing",
    description:
      "Comfortable running shoes with extra cushioning for long-distance running.",
    image: "/shoes.jpg",
  },
  2: {
    id: 2,
    name: "Wireless Headphones",
    price: 129,
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    image: "/headphones.jpg",
  },
  3: {
    id: 3,
    name: "Backpack",
    price: 129,
    category: "Clothing",
    description:
      "Durable backpack with multiple compartments and laptop sleeve.",
    image: "/backpack.jpg",
  },
  4: {
    id: 4,
    name: "Smart Watch",
    price: 249,
    category: "Electronics",
    description:
      "Feature-rich smartwatch with health monitoring and notifications.",
    image: "/watch.jpg",
  },
  5: {
    id: 5,
    name: "Sunglasses",
    price: 149,
    category: "Clothing",
    description: "Stylish sunglasses with UV protection and polarized lenses.",
    image: "/sunglasses.jpg",
  },
  6: {
    id: 6,
    name: "Digital Camera",
    price: 499,
    category: "Electronics",
    description:
      "Professional digital camera with 4K video recording and image stabilization.",
    image: "/camera.jpg",
  },
  7: {
    id: 7,
    name: "T-Shirt",
    price: 29,
    category: "Clothing",
    description:
      "Comfortable cotton t-shirt available in multiple colors and sizes.",
    image: "/tshirt.jpg",
  },
  8: {
    id: 8,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    description:
      "Latest smartphone with powerful processor and high-resolution camera.",
    image: "/phone.jpg",
  },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = productData[id];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/" className="text-indigo-600 hover:underline">
          Back to Products
        </Link>
      </div>
    );
  }

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="flex items-center text-indigo-600 mb-6 hover:underline"
      >
        <ArrowLeft size={16} className="mr-1" /> Back to Products
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-8 flex items-center justify-center bg-gray-100">
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              {/* In a real app, this would be an actual image */}
              <div className="text-gray-500 text-center">
                <div className="text-4xl mb-2">📷</div>
                <p>Product Image</p>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill={rating >= 4 ? "currentColor" : "none"} />
              </div>
              <span className="text-sm text-gray-600 ml-1">
                ({rating} · {reviewCount} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold mb-4">${product.price}</p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-sm text-gray-600">Category:</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded-md text-sm">
                {product.category}
              </span>
            </div>

            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 p-8">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>

          {/* Sample Reviews */}
          <div className="space-y-6">
            {[1, 2, 3].map((review) => (
              <div key={review} className="border-b border-gray-200 pb-6">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Customer {review}</span>
                  <div className="flex text-yellow-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star
                      size={14}
                      fill={Math.random() > 0.3 ? "currentColor" : "none"}
                    />
                  </div>
                </div>
                <p className="text-gray-600">
                  This is a sample review for the {product.name}. The product is
                  great and I would recommend it to others.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
