import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Heart,
  Share2,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
} from "lucide-react";

// Sample product data with real image URLs
const productData = {
  1: {
    id: 1,
    name: "Running Shoes",
    price: 99,
    category: "Clothing",
    description:
      "Comfortable running shoes with extra cushioning for long-distance running. Designed for athletes and casual runners alike, these shoes provide exceptional comfort and support.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "Extra cushioning for comfort",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Available in multiple colors",
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue", "Red"],
  },
  2: {
    id: 2,
    name: "Wireless Headphones",
    price: 129,
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and 30-hour battery life. Experience immersive sound quality with these premium headphones.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "Active noise cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Comfortable over-ear design",
    ],
    colors: ["Black", "White", "Blue"],
  },
  3: {
    id: 3,
    name: "Backpack",
    price: 129,
    category: "Clothing",
    description:
      "Durable backpack with multiple compartments and laptop sleeve. Perfect for daily commute, travel, or outdoor adventures.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "Multiple compartments",
      "Padded laptop sleeve",
      "Water-resistant material",
      "Ergonomic design",
    ],
    colors: ["Black", "Gray", "Navy", "Green"],
  },
  4: {
    id: 4,
    name: "Smart Watch",
    price: 249,
    category: "Electronics",
    description:
      "Feature-rich smartwatch with health monitoring and notifications. Stay connected and track your fitness goals with this advanced smartwatch.",
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "Heart rate monitoring",
      "Sleep tracking",
      "Water resistant",
      "5-day battery life",
    ],
    colors: ["Black", "Silver", "Rose Gold"],
  },
  5: {
    id: 5,
    name: "Sunglasses",
    price: 149,
    category: "Clothing",
    description:
      "Stylish sunglasses with UV protection and polarized lenses. Protect your eyes while making a fashion statement.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "100% UV protection",
      "Polarized lenses",
      "Lightweight frame",
      "Scratch-resistant coating",
    ],
    colors: ["Black", "Tortoise", "Silver"],
  },
  6: {
    id: 6,
    name: "Digital Camera",
    price: 499,
    category: "Electronics",
    description:
      "Professional digital camera with 4K video recording and image stabilization. Capture your memories in stunning detail with this high-quality camera.",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "24MP sensor",
      "4K video recording",
      "Image stabilization",
      "Wi-Fi connectivity",
    ],
    colors: ["Black"],
  },
  7: {
    id: 7,
    name: "T-Shirt",
    price: 29,
    category: "Clothing",
    description:
      "Comfortable cotton t-shirt available in multiple colors and sizes. A wardrobe essential for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "100% cotton",
      "Comfortable fit",
      "Machine washable",
      "Available in multiple colors",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Gray", "Blue", "Red", "Green"],
  },
  8: {
    id: 8,
    name: "Smartphone",
    price: 699,
    category: "Electronics",
    description:
      "Latest smartphone with powerful processor and high-resolution camera. Experience cutting-edge technology with this premium device.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      '6.5" OLED display',
      "Triple camera system",
      "5G connectivity",
      "All-day battery life",
    ],
    colors: ["Black", "White", "Blue", "Purple"],
  },

  101: {
    id: 101,
    name: "Wireless Mouse",
    price: 29.99,
    category: "Electronics",
    description: "Ergonomic wireless mouse with long battery life",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    features: [
      "Ergonomic design",
      "Long battery life",
      "Wireless connectivity",
      "Precision tracking",
    ],
    rating: 4.5,
  },
  102: {
    id: 102,
    name: "Phone Case",
    price: 19.99,
    category: "Accessories",
    description: "Durable protective case with premium materials",
    image:
      "https://fullyfilmy.in/cdn/shop/files/Man-With-A-Plan-Phone-Case-Master.png?v=1717225594&auto=format&fit=crop&w=600&q=80",
    features: [
      "Shock absorbent",
      "Premium materials",
      "Easy installation",
      "Access to all ports",
    ],
    rating: 4.2,
  },
  103: {
    id: 103,
    name: "Desk Lamp",
    price: 39.99,
    category: "Home",
    description: "Adjustable LED desk lamp with touch controls",
    image:
      "https://www.jainsonsemporio.com/cdn/shop/files/HT904-T_Lamp.1.jpg?v=1755373271&auto=format&fit=crop&w=600&q=80",
    features: [
      "Adjustable arm",
      "Touch controls",
      "USB charging port",
      "Energy efficient",
    ],
    rating: 4.7,
  },
  104: {
    id: 104,
    name: "Water Bottle",
    price: 24.99,
    category: "Lifestyle",
    description: "Insulated stainless steel water bottle",
    image:
      "https://www.brandkiosk.in/cdn/shop/products/8525550893.jpg?v=1705677018&auto=format&fit=crop&w=600&q=80",
    features: [
      "Insulated design",
      "Leak-proof cap",
      "24-hour temperature retention",
      "BPA-free materials",
    ],
    rating: 4.3,
  },
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const product = productData[id];

  if (!product) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-amber-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-amber-50 mb-4">
            Product Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-amber-50 rounded-lg hover:bg-amber-700 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Generate random rating for demo purposes
  const rating = (Math.random() * 2 + 3).toFixed(1);
  const reviewCount = Math.floor(Math.random() * 100) + 10;

  // Calculate discount percentage for demo
  const discountPercentage = Math.floor(Math.random() * 30 + 10);
  const originalPrice = Math.floor(
    (product.price * (100 + discountPercentage)) / 100
  );

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedSize: product.sizes ? selectedSize : null,
      selectedColor: selectedColor,
    });
  };

  const handleQuantityChange = (type) => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    } else if (type === "increase") {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 min-h-screen text-amber-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-amber-100 mb-6">
          <Link to="/" className="hover:text-amber-50 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/products"
            className="hover:text-amber-50 transition-colors"
          >
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-amber-50">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-amber-100 mb-8 hover:text-amber-50 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" /> Back to Products
        </Link>

        <div className="bg-gray-700 rounded-xl shadow-xl overflow-hidden border border-gray-600">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:w-1/2 p-8 flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-800">
              <div className="w-full rounded-xl overflow-hidden relative">
                {/* Real Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 bg-amber-600 text-amber-50 text-sm font-bold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-8">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-800 text-amber-100 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-amber-50 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center mb-6">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(rating) ? "currentColor" : "none"}
                      className={
                        i < Math.floor(rating)
                          ? "text-amber-400"
                          : "text-gray-500"
                      }
                    />
                  ))}
                </div>
                <span className="text-amber-100">
                  {rating} · {reviewCount} reviews
                </span>
              </div>

              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-amber-50">
                    ${product.price}
                  </span>
                  <span className="text-lg text-amber-800 line-through ml-3">
                    ${originalPrice}
                  </span>
                  <span className="ml-3 text-sm bg-amber-900 text-amber-100 px-2 py-1 rounded">
                    Save ${originalPrice - product.price}
                  </span>
                </div>
              </div>

              <p className="text-amber-100 mb-8">{product.description}</p>

              {/* Product Features */}
              <div className="mb-8">
                <h3 className="font-semibold text-lg text-amber-50 mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        size={16}
                        className="text-amber-400 mr-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-amber-100">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Selector */}
              {product.sizes && (
                <div className="mb-6">
                  <h3 className="font-medium text-amber-50 mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSize === size
                            ? "bg-amber-600 border-amber-500 text-amber-50"
                            : "bg-gray-600 border-gray-500 text-amber-100 hover:bg-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && (
                <div className="mb-8">
                  <h3 className="font-medium text-amber-50 mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedColor === color
                            ? "bg-amber-600 border-amber-500 text-amber-50"
                            : "bg-gray-600 border-gray-500 text-amber-100 hover:bg-gray-500"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center bg-gray-600 rounded-lg border border-gray-500">
                  <span className="px-4 text-amber-100">Quantity:</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="px-3 py-3 text-amber-100 hover:bg-gray-500"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-3 py-3 text-amber-50 w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="px-3 py-3 text-amber-100 hover:bg-gray-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-700 py-3 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all shadow-md"
                >
                  <ShoppingCart size={20} className="mr-2 text-amber-50" />
                  <span className="font-medium text-amber-50">Add to Cart</span>
                </button>
              </div>

              {/* Product Guarantees */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-600 rounded-lg border border-gray-500">
                  <Truck size={24} className="text-amber-400 mb-2" />
                  <span className="text-xs text-amber-100 text-center">
                    Free Shipping
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-600 rounded-lg border border-gray-500">
                  <Shield size={24} className="text-amber-400 mb-2" />
                  <span className="text-xs text-amber-100 text-center">
                    2 Year Warranty
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-600 rounded-lg border border-gray-500">
                  <RotateCcw size={24} className="text-amber-400 mb-2" />
                  <span className="text-xs text-amber-100 text-center">
                    30 Day Returns
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t border-gray-600">
            <div className="flex border-b border-gray-600 gap-4">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "description"
                    ? "text-amber-50 border-b-2 border-amber-500"
                    : "text-amber-100 hover:text-amber-50"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "specifications"
                    ? "text-amber-50 border-b-2 border-amber-500"
                    : "text-amber-100 hover:text-amber-50"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-medium ${
                  activeTab === "reviews"
                    ? "text-amber-50 border-b-2 border-amber-500"
                    : "text-amber-100 hover:text-amber-50"
                }`}
              >
                Reviews ({reviewCount})
              </button>
            </div>

            <div className="p-8">
              {activeTab === "description" && (
                <div>
                  <h3 className="text-xl font-bold text-amber-50 mb-4">
                    Product Description
                  </h3>
                  <p className="text-amber-100 mb-4">
                    {product.description} This product is designed with the
                    highest quality materials and craftsmanship to ensure
                    durability and comfort. It's perfect for everyday use and
                    special occasions.
                  </p>
                  <p className="text-amber-100">
                    Our commitment to quality means you can trust this product
                    to meet your needs and exceed your expectations. Experience
                    the difference today.
                  </p>
                </div>
              )}

              {activeTab === "specifications" && (
                <div>
                  <h3 className="text-xl font-bold text-amber-50 mb-4">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
                      <h4 className="font-medium text-amber-50 mb-2">
                        Material
                      </h4>
                      <p className="text-amber-100">
                        Premium quality materials
                      </p>
                    </div>
                    <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
                      <h4 className="font-medium text-amber-50 mb-2">
                        Dimensions
                      </h4>
                      <p className="text-amber-100">Varies by size selection</p>
                    </div>
                    <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
                      <h4 className="font-medium text-amber-50 mb-2">Weight</h4>
                      <p className="text-amber-100">Lightweight design</p>
                    </div>
                    <div className="bg-gray-600 p-4 rounded-lg border border-gray-500">
                      <h4 className="font-medium text-amber-50 mb-2">Origin</h4>
                      <p className="text-amber-100">Designed in-house</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div>
                  <h3 className="text-xl font-bold text-amber-50 mb-4">
                    Customer Reviews
                  </h3>

                  {/* Review Summary */}
                  <div className="bg-gray-600 p-6 rounded-lg border border-gray-500 mb-8">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl font-bold text-amber-50 mr-4">
                        {rating}
                      </div>
                      <div>
                        <div className="flex text-amber-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={
                                i < Math.floor(rating) ? "currentColor" : "none"
                              }
                              className={
                                i < Math.floor(rating)
                                  ? "text-amber-400"
                                  : "text-gray-500"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-amber-100">
                          Based on {reviewCount} reviews
                        </p>
                      </div>
                    </div>

                    <button className="px-4 py-2 bg-amber-600 text-amber-50 rounded-lg hover:bg-amber-700 transition-colors">
                      Write a Review
                    </button>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="bg-gray-600 p-6 rounded-lg border border-gray-500"
                      >
                        <div className="flex justify-between mb-3">
                          <div>
                            <span className="font-medium text-amber-50">
                              Customer {review}
                            </span>
                            <p className="text-sm text-amber-100">
                              Verified Purchase
                            </p>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                fill={
                                  i < (review === 1 ? 5 : review === 2 ? 4 : 3)
                                    ? "currentColor"
                                    : "none"
                                }
                                className={
                                  i < (review === 1 ? 5 : review === 2 ? 4 : 3)
                                    ? "text-amber-400"
                                    : "text-gray-500"
                                }
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-amber-100 mb-3">
                          This {product.name} exceeded my expectations. The
                          quality is outstanding and it's exactly what I was
                          looking for. I would definitely recommend this to
                          others.
                        </p>
                        <p className="text-sm text-amber-800">
                          Posted on{" "}
                          {new Date(
                            Date.now() - review * 7 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
