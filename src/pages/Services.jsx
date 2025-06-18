import { useContext, useEffect, useState } from "react";
import CardService from "../components/CardService";
import { AppContext } from "../context/AppContext";
import {
  FiSearch,
  FiGrid,
  FiList,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiAlertCircle,
  FiHeart,
} from "react-icons/fi";
import { FaCut, FaPalette, FaHandSparkles } from "react-icons/fa";

const Services = () => {
  //tilte
  useEffect(() => {
    document.title = "SalonHair - Trang tất cả dịch vụ";
  }, []);

  const { errorService, loadingService, loadServices, services } =
    useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [priceRange, setPriceRange] = useState("all");
  const itemsPerPage = 12;

  // Helper function to extract price as number
  const extractPrice = (priceValue) => {
    if (!priceValue) return 0;

    // If it's already a number
    if (typeof priceValue === "number") return priceValue;

    // If it's a string, extract numbers
    if (typeof priceValue === "string") {
      const numericValue = priceValue.replace(/[^\d]/g, "");
      return parseInt(numericValue) || 0;
    }

    return 0;
  };

  // Helper function to format price for display
  // const formatPrice = (priceValue) => {
  //   const price = extractPrice(priceValue);
  //   return price.toLocaleString("vi-VN") + "đ";
  // };

  // Categories for filtering
  const categories = [
    {
      id: "all",
      name: "Tất cả",
      icon: <FiGrid className="w-4 h-4" />,
      count: services.length,
    },
    {
      id: "cut",
      name: "Cắt tóc",
      icon: <FaCut className="w-4 h-4" />,
      count: 0,
    },
    {
      id: "color",
      name: "Nhuộm tóc",
      icon: <FaPalette className="w-4 h-4" />,
      count: 0,
    },
    {
      id: "style",
      name: "Tạo kiểu",
      icon: <FaHandSparkles className="w-4 h-4" />,
      count: 0,
    },
    {
      id: "treatment",
      name: "Chăm sóc",
      icon: <FiHeart className="w-4 h-4" />,
      count: 0,
    },
  ];

  // Price ranges
  const priceRanges = [
    { id: "all", name: "Tất cả mức giá" },
    { id: "under-200k", name: "Dưới 200k" },
    { id: "200k-500k", name: "200k - 500k" },
    { id: "500k-1m", name: "500k - 1M" },
    { id: "over-1m", name: "Trên 1M" },
  ];

  // Filter and sort services
  const filteredServices = services
    .filter((service) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        (service.name &&
          service.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (service.description &&
          service.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        (service.category && service.category === selectedCategory);

      // Price filter
      let matchesPrice = true;
      if (priceRange !== "all") {
        const price = extractPrice(service.price);
        switch (priceRange) {
          case "under-200k":
            matchesPrice = price < 200000;
            break;
          case "200k-500k":
            matchesPrice = price >= 200000 && price <= 500000;
            break;
          case "500k-1m":
            matchesPrice = price >= 500000 && price <= 1000000;
            break;
          case "over-1m":
            matchesPrice = price > 1000000;
            break;
          default:
            matchesPrice = true;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name": {
          const nameA = a.name || "";
          const nameB = b.name || "";
          return nameA.localeCompare(nameB);
        }
        case "price-low":
          return extractPrice(a.price) - extractPrice(b.price);
        case "price-high":
          return extractPrice(b.price) - extractPrice(a.price);
        case "popular": {
          const ratingA = a.rating || 0;
          const ratingB = b.rating || 0;
          return ratingB - ratingA;
        }
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = filteredServices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortBy, priceRange]);

  // Loading State
  if (loadingService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-16">
          {/* Loading Header */}
          <div className="text-center mb-16">
            <div className="w-64 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
          </div>

          {/* Loading Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-full h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (errorService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiAlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Không thể tải dịch vụ
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorService}
          </p>
          <button
            onClick={loadServices}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FiRefreshCw className="w-5 h-5" />
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Tất cả dịch vụ
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Khám phá bộ sưu tập dịch vụ làm đẹp đa dạng với công nghệ hiện đại
            và đội ngũ chuyên gia hàng đầu
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 mb-12">
          {/* Search Bar */}
          <div className="relative mb-6">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 dark:text-gray-200 transition-all duration-300"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mức giá
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
              >
                {priceRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sắp xếp theo
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200"
              >
                <option value="name">Tên A-Z</option>
                <option value="price-low">Giá thấp đến cao</option>
                <option value="price-high">Giá cao đến thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </select>
            </div>

            {/* View Mode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Hiển thị
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <FiGrid className="w-4 h-4" />
                  <span className="hidden sm:inline">Lưới</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  <FiList className="w-4 h-4" />
                  <span className="hidden sm:inline">Danh sách</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm ||
            selectedCategory !== "all" ||
            priceRange !== "all") && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-600">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Bộ lọc đang áp dụng:
              </span>

              {searchTerm && (
                <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                  {categories.find((c) => c.id === selectedCategory)?.name}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-1 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              )}

              {priceRange !== "all" && (
                <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                  {priceRanges.find((p) => p.id === priceRange)?.name}
                  <button
                    onClick={() => setPriceRange("all")}
                    className="ml-1 hover:text-purple-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-gray-600 dark:text-gray-400">
            Hiển thị{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {currentServices.length}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              {filteredServices.length}
            </span>{" "}
            dịch vụ
          </div>

          {filteredServices.length > 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Trang {currentPage} / {totalPages}
            </div>
          )}
        </div>

        {/* Services Grid/List */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Không tìm thấy dịch vụ
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
                setPriceRange("all");
                setSortBy("name");
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              <FiRefreshCw className="w-5 h-5" />
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {currentServices.map((item, index) => (
                <div
                  key={item.id || index}
                  className={`group ${
                    viewMode === "list"
                      ? "flex gap-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                      : ""
                  }`}
                >
                  <CardService item={item} viewMode={viewMode} />
                </div>
              ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
                {/* Page Info */}
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                  Trang {currentPage} / {totalPages} • {filteredServices.length}{" "}
                  dịch vụ
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    ««
                  </button>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === 1
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Trước</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                        : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 border border-gray-200 dark:border-gray-600 shadow-sm"
                    }`}
                  >
                    <span className="hidden sm:inline">Sau</span>
                    <FiChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    »»
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Services;
