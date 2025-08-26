import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative">
      <div className="h-96 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, slideIndex) => (
              <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`h-2 w-2 rounded-full ${
                  currentIndex === slideIndex ? "bg-primary-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductImageCarousel;
