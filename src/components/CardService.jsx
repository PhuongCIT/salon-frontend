import React from "react";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiStar,
  FiHeart,
  FiEye,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";
import { FaHandSparkles } from "react-icons/fa";

const CardService = ({ item, index, viewMode = "grid" }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const formatDuration = (duration) => {
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return minutes > 0 ? `${hours}h ${minutes}p` : `${hours}h`;
    }
    return `${duration}p`;
  };

  // Grid View Component
  const GridView = () => (
    <Link
      to={`/services/${item._id}`}
      key={index}
      className="group block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="relative pt-[75%]">
          <img
            src={item.image || "/api/placeholder/400/300"}
            alt={item.name}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/300";
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {item.isHot && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                <FiTrendingUp className="w-3 h-3" />
                HOT
              </span>
            )}
            {item.averageRating >= 4.5 && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                <FaHandSparkles className="w-3 h-3" />
                TOP
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
            <button className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors duration-200 shadow-lg">
              <FiHeart className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-500 transition-colors duration-200 shadow-lg">
              <FiEye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center justify-between text-white text-sm">
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                <FiClock className="w-3 h-3" />
                <span>{formatDuration(item.duration || 60)}</span>
              </div>
              {item.averageRating > 0 && (
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{item.averageRating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        {item.categoryId?.name && (
          <div className="mb-2">
            <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg text-xs font-medium">
              {item.categoryId.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-gray-900 dark:text-white text-lg font-bold line-clamp-2 min-h-[3.5rem] mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {item.name}
        </h3>

        {/* Description */}
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {item.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{formatDuration(item.duration || 60)}</span>
          </div>
          {item.averageRating > 0 && (
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{item.averageRating.toFixed(1)}</span>
              <span className="text-gray-400">({item.totalRatings || 0})</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Giá từ:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500 dark:text-red-400">
                {formatPrice(item.price)}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  // List View Component
  const ListView = () => (
    <Link
      to={`/services/${item._id}`}
      key={index}
      className="group flex gap-6 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
        <img
          src={item.image || "/api/placeholder/400/300"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = "/api/placeholder/400/300";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            {/* Category */}
            {item.categoryId?.name && (
              <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-lg text-xs font-medium mb-2">
                {item.categoryId.name}
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
              {item.name}
            </h3>
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            {item.isHot && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                <FiTrendingUp className="w-3 h-3" />
                HOT
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{formatDuration(item.duration || 60)}</span>
          </div>
          {item.averageRating > 0 && (
            <div className="flex items-center gap-1">
              <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
              <span>{item.averageRating.toFixed(1)}</span>
              <span className="text-gray-400">
                ({item.totalRatings || 0} đánh giá)
              </span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Giá từ:
            </span>
            <div className="text-2xl font-bold text-red-500 dark:text-red-400">
              {formatPrice(item.price)}đ
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors duration-200">
              <FiHeart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );

  // Return appropriate view based on viewMode
  return viewMode === "list" ? <ListView /> : <GridView />;
};

export default CardService;
