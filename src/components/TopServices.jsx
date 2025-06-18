import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import CardService from "./CardService";
import {
  FiArrowRight,
  FiRefreshCw,
  FiGrid,
  FiStar,
  FiTrendingUp,
  FiZap,
  FiHeart,
  FiEye,
} from "react-icons/fi";
import { FaHandSparkles, FaCrown, FaFire } from "react-icons/fa";

// Loading Skeleton Component
const ServiceSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg animate-pulse">
    <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
    <div className="p-4">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
      </div>
    </div>
  </div>
);

// Featured Badge Component
const FeaturedBadge = ({ type }) => {
  const badges = {
    hot: {
      icon: FaFire,
      text: "HOT",
      gradient: "from-red-500 to-orange-500",
      bg: "bg-red-100 dark:bg-red-900/30",
      textColor: "text-red-600 dark:text-red-400",
    },
    new: {
      icon: FaHandSparkles,
      text: "MỚI",
      gradient: "from-green-500 to-emerald-500",
      bg: "bg-green-100 dark:bg-green-900/30",
      textColor: "text-green-600 dark:text-green-400",
    },
    trending: {
      icon: FiTrendingUp,
      text: "TREND",
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    premium: {
      icon: FaCrown,
      text: "VIP",
      gradient: "from-yellow-500 to-orange-500",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      textColor: "text-yellow-600 dark:text-yellow-400",
    },
  };

  const badge = badges[type];
  if (!badge) return null;

  const Icon = badge.icon;

  return (
    <div
      className={`inline-flex items-center gap-1 ${badge.bg} ${badge.textColor} px-2 py-1 rounded-full text-xs font-medium`}
    >
      <Icon className="w-3 h-3" />
      {badge.text}
    </div>
  );
};

const TopServices = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const { services, errorService, loadingService, getAllServices } =
    useContext(AppContext);

  // Mock data for demonstration - replace with real data
  const serviceStats = {
    total: services?.length || 0,
    popular: services?.filter((s) => s.isPopular)?.length || 0,
    new: services?.filter((s) => s.isNew)?.length || 0,
    rating:
      services?.length > 0
        ? (
            services.reduce((sum, s) => sum + (s.rating || 4.5), 0) /
            services.length
          ).toFixed(1)
        : "4.8",
  };

  if (loadingService) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="relative">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="w-64 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>

          {/* Services Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, index) => (
              <ServiceSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (errorService) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <FiRefreshCw className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Oops! Có lỗi xảy ra
          </h3>
          <p className="text-red-600 dark:text-red-400 mb-6 max-w-md">
            {errorService}
          </p>
          <button
            onClick={getAllServices}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiGrid className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Chưa có dịch vụ nào
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Các dịch vụ của chúng tôi đang được cập nhật
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative  bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8  py-16 lg:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-20"></div>
        <div
          className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-20"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-5 h-5 bg-pink-400 rounded-full animate-bounce opacity-20"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative ">
        {/* Header */}
        <div className="text-center mb-16 ">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Khám phá{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dịch vụ
            </span>{" "}
            của chúng tôi
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Trải nghiệm những dịch vụ tốt nhất với chất lượng đẳng cấp quốc tế,
            được thiết kế đặc biệt cho nhu cầu của bạn
          </p>
        </div>

        {/* Featured Services Section */}
        <div className="mb-12 ">
          <div className="flex items-center justify-between mb-8 ">
            <div className="flex items-center gap-3  ">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dịch vụ nổi bật
              </h3>
            </div>

            <div className="flex gap-2">
              <FeaturedBadge type="hot" />
              <FeaturedBadge type="new" />
              <FeaturedBadge type="trending" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {services.slice(0, 5).map((item, index) => (
              <div
                key={item._id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Service Badge */}
                <div className="absolute top-4 left-4 z-10">
                  {index === 0 && <FeaturedBadge type="hot" />}
                  {index === 1 && <FeaturedBadge type="new" />}
                  {index === 2 && <FeaturedBadge type="trending" />}
                  {index === 3 && <FeaturedBadge type="premium" />}
                </div>

                {/* Hover Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transition-opacity duration-300 ${
                    hoveredCard === index ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                <CardService item={item} />

                {/* Quick Actions */}
                <div
                  className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-300 ${
                    hoveredCard === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200">
                    <FiHeart className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200">
                    <FiEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiZap className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Khám phá thêm nhiều dịch vụ tuyệt vời
            </h3>

            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Chúng tôi có hơn {serviceStats.total} dịch vụ chất lượng cao đang
              chờ bạn khám phá
            </p>

            <button
              onClick={() => {
                navigate(`/services`);
                scrollTo(0, 0);
              }}
              className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
            >
              <span>Xem tất cả dịch vụ</span>
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-16 flex justify-center">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopServices;
