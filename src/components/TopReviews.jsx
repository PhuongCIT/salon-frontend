import React, { useState } from "react";
import StarRating from "./StarRating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiHeart,
  FiMessageCircle,
  FiRefreshCw,
  FiCalendar,
  FiThumbsUp,
} from "react-icons/fi";
import {
  FaHandSparkles,
  FaCrown,
  FaGoogle,
  FaFacebook,
  FaQuoteRight,
} from "react-icons/fa";

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
  >
    <FiChevronLeft className="w-6 h-6" />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
  >
    <FiChevronRight className="w-6 h-6" />
  </button>
);

// Loading Skeleton Component
const ReviewSkeleton = () => (
  <div className="px-3">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse h-80">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
          ></div>
        ))}
      </div>
    </div>
  </div>
);

// Review Card Component
const ReviewCard = ({ review, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    review.customerId?.name || "User"
  )}&background=3B82F6&color=ffffff&size=200&font-size=0.6`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getReviewSource = () => {
    // Simulate different review sources
    const sources = ["Google", "Facebook", "Website"];
    return sources[index % sources.length];
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "Google":
        return <FaGoogle className="w-4 h-4 text-red-500" />;
      case "Facebook":
        return <FaFacebook className="w-4 h-4 text-blue-600" />;
      default:
        return <FiMessageCircle className="w-4 h-4 text-green-500" />;
    }
  };

  return (
    <div className="px-3">
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-96"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 opacity-50"></div>

        {/* Quote Icon */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300">
          <FaQuoteRight className="w-5 h-5 text-blue-500" />
        </div>

        {/* Content */}
        <div className="relative p-6 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-100 dark:ring-blue-900/30">
                <img
                  src={
                    imageError
                      ? defaultAvatar
                      : review.customerId?.image || defaultAvatar
                  }
                  alt={review.customerId?.name || "Customer"}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <FiThumbsUp className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Customer Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                {review.customerId?.name || "Khách hàng"}
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                {getSourceIcon(getReviewSource())}
                <span>{getReviewSource()}</span>
                {review.createdAt && (
                  <>
                    <span>•</span>
                    <span>{formatDate(review.createdAt)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Rating Badge */}
            {review.rating >= 4.5 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium">
                <FaCrown className="w-3 h-3" />
                TOP
              </div>
            )}
          </div>

          {/* Service Info */}
          {review.serviceId?.name && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                <FaHandSparkles className="w-3 h-3" />
                {review.serviceId.name}
              </div>
            </div>
          )}

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={review.rating} size="lg" showNumber={true} />
          </div>

          {/* Comment */}
          <div className="flex-1 mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
              "
              {review.comment ||
                "Dịch vụ rất tốt, tôi rất hài lòng với chất lượng phục vụ."}
              "
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
            {/* Helpful Button */}
            <button className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
              <FiThumbsUp className="w-4 h-4" />
              <span>Hữu ích</span>
              {review.helpfulCount && (
                <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
                  {review.helpfulCount}
                </span>
              )}
            </button>

            {/* Love Button */}
            <button
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                isHovered
                  ? "bg-red-100 dark:bg-red-900/30 text-red-500 scale-110"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-400"
              }`}
            >
              <FiHeart className="w-4 h-4" />
            </button>
          </div>

          {/* Floating Elements */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
            <div
              className="absolute bottom-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            ></div>
          </div>
        </div>

        {/* Decorative Border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

const TopReviews = () => {
  const { reviews, loadingReviews, errorReviews, getReviews } =
    useContext(AppContext);

  // Cấu hình slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  if (loadingReviews) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="w-80 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="w-96 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <ReviewSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (errorReviews) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8  py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <FiRefreshCw className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Có lỗi xảy ra
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6 max-w-md">
            {errorReviews}
          </p>
          <button
            onClick={getReviews}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 py-16 lg:py-24">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Chưa có đánh giá nào
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Hãy trở thành người đầu tiên đánh giá dịch vụ của chúng tôi
          </p>
        </div>
      </section>
    );
  }

  // Calculate review stats
  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const fiveStarCount = reviews.filter((review) => review.rating === 5).length;
  const fiveStarPercentage = (fiveStarCount / reviews.length) * 100;

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 py-16 lg:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 dark:bg-yellow-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiStar className="w-4 h-4" />
            Phản hồi từ khách hàng
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Khách hàng nói gì về{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              chúng tôi
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Những phản hồi chân thực từ khách hàng đã sử dụng dịch vụ của chúng
            tôi
          </p>

          {/* Review Stats */}
          <div className="flex items-center justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center mb-1">
                <StarRating rating={averageRating} size="sm" />
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Trung bình
              </div>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold text-green-500 mb-1">
                {fiveStarPercentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                5 sao
              </div>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-1">
                {reviews.length}+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Đánh giá
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="relative">
          <Slider {...sliderSettings}>
            {reviews.map((review, index) => (
              <ReviewCard
                key={review._id || index}
                review={review}
                index={index}
              />
            ))}
          </Slider>
        </div>

        {/* Call to Action */}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .custom-dots {
          bottom: -60px;
        }
        .custom-dots li button:before {
          color: #f59e0b;
          font-size: 12px;
        }
        .custom-dots li.slick-active button:before {
          color: #d97706;
        }
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default TopReviews;
