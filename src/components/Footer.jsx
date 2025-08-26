import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  CreditCard,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-amber-50 py-12 border-t border-amber-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
                <CreditCard size={24} className="text-amber-50" />
              </div>
              <h3 className="text-2xl font-bold text-amber-50">ShopEasy</h3>
            </div>
            <p className="text-amber-100 mb-6">
              Your one-stop shop for all your needs. Quality products,
              exceptional service.
            </p>
            <div className="flex items-center space-x-3 text-amber-100">
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-amber-400" />
                <span className="text-sm">123 Commerce St, Market City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-amber-50 mb-4 pb-2 border-b border-amber-800 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Special Offers
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold text-amber-50 mb-4 pb-2 border-b border-amber-800 inline-block">
              Customer Service
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Shipping Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-100 hover:text-amber-50 transition-colors flex items-center"
                >
                  <span className="w-1 h-1 bg-amber-500 rounded-full mr-2"></span>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-bold text-amber-50 mb-4 pb-2 border-b border-amber-800 inline-block">
              Connect With Us
            </h4>
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <Phone size={18} className="text-amber-400" />
                <span className="text-amber-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 mb-6">
                <Mail size={18} className="text-amber-400" />
                <span className="text-amber-100">support@shopeasy.com</span>
              </div>

              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-amber-100 hover:bg-amber-700 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-amber-100 hover:bg-amber-700 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-amber-100 hover:bg-amber-700 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-amber-100 hover:bg-amber-700 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={18} />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-amber-50 mb-2">
                Subscribe to our newsletter
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-amber-50 placeholder-amber-200 w-full"
                />
                <button className="bg-amber-600 hover:bg-amber-700 text-amber-50 px-4 py-2 rounded-r-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-amber-100 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-amber-100 text-sm">
              <a href="#" className="hover:text-amber-50 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-50 transition-colors">
                Terms of Use
              </a>
              <a href="#" className="hover:text-amber-50 transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
