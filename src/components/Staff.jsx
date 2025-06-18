import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiAward,
  FiHeart,
  FiPhone,
  FiMail,
  FiInstagram,
  FiFacebook,
  FiRefreshCw,
} from "react-icons/fi";
import { FaHandSparkles, FaCrown } from "react-icons/fa";

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
const StaffSkeleton = () => (
  <div className="px-2">
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
    </div>
  </div>
);

// Staff Card Component
const StaffCard = ({ staff }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    staff.name
  )}&background=3B82F6&color=ffffff&size=200&font-size=0.6`;

  return (
    <div className="px-3">
      <div
        className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 dark:border-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-700 opacity-50"></div>

        {/* Content */}
        <div className="relative p-6 text-center">
          {/* Status Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {staff.isTopRated && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                <FaCrown className="w-3 h-3" />
                TOP
              </span>
            )}
            {staff.isExpert && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                <FaHandSparkles className="w-3 h-3" />
                EXPERT
              </span>
            )}
          </div>

          {/* Avatar */}
          <div className="relative mb-6">
            <div className="relative w-24 h-24 mx-auto">
              {/* Avatar Ring */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full p-1 animate-pulse">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full p-1">
                  <img
                    src={
                      imageError ? defaultAvatar : staff.image || defaultAvatar
                    }
                    alt={staff.name}
                    className="w-full h-full rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={() => setImageError(true)}
                  />
                </div>
              </div>

              {/* Online Status */}
              {staff.isOnline && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full shadow-lg"></div>
              )}
            </div>

            {/* Floating Icons */}
            <div
              className={`absolute inset-0 transition-all duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-500 animate-bounce">
                <FiHeart className="w-4 h-4" />
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center text-yellow-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                <FiStar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Name */}
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {staff.name}
          </h4>

          {/* Position */}
          <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
            {staff.position || "Chuyên viên"}
          </p>

          {/* Specialties */}
          {staff.specialties && staff.specialties.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 justify-center">
                {staff.specialties.slice(0, 2).map((specialty, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
                {staff.specialties.length > 2 && (
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                    +{staff.specialties.length - 2}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-center gap-4 mb-4 text-sm">
            {staff.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <FiStar className="w-4 h-4 fill-current" />
                <span className="font-medium">{staff.rating}</span>
              </div>
            )}
            {staff.experience && (
              <div className="flex items-center gap-1 text-purple-500">
                <FiAward className="w-4 h-4" />
                <span className="font-medium">{staff.experience}+ năm</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {staff.bio && (
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {staff.bio}
            </p>
          )}

          {/* Social Links - Show on Hover */}
          <div
            className={`flex justify-center gap-3 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {staff.phone && (
              <a
                href={`tel:${staff.phone}`}
                className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 hover:scale-110 transition-transform duration-200"
              >
                <FiPhone className="w-4 h-4" />
              </a>
            )}
            {staff.email && (
              <a
                href={`mailto:${staff.email}`}
                className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform duration-200"
              >
                <FiMail className="w-4 h-4" />
              </a>
            )}
            {staff.instagram && (
              <a
                href={staff.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center text-pink-600 dark:text-pink-400 hover:scale-110 transition-transform duration-200"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
            )}
            {staff.facebook && (
              <a
                href={staff.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 hover:scale-110 transition-transform duration-200"
              >
                <FiFacebook className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Book Button */}
          <div
            className={`mt-4 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Đặt lịch với {staff.name.split(" ")[0]}
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      </div>
    </div>
  );
};

const Staff = () => {
  const { staffs, loadingStaffs, errorStaffs, getStaffs } =
    useContext(AppContext);

  // Cấu hình slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
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

  if (loadingStaffs) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="w-64 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-4 animate-pulse"></div>
          <div className="w-96 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
        </div>

        {/* Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <StaffSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (errorStaffs) {
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
            {errorStaffs}
          </p>
          <button
            onClick={getStaffs}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <FiRefreshCw className="w-5 h-5" />
            Thử lại
          </button>
        </div>
      </section>
    );
  }

  if (!staffs || staffs.length === 0) {
    return (
      <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 py-16 lg:py-24">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHandSparkles className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Chưa có nhân viên nào
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Đội ngũ nhân viên của chúng tôi đang được cập nhật
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 sm:px-8  py-16 lg:py-24 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FaHandSparkles className="w-4 h-4" />
            Đội ngũ chuyên nghiệp
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gặp gỡ{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Đội ngũ
            </span>{" "}
            của chúng tôi
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Những chuyên gia hàng đầu với kinh nghiệm và tay nghề cao, luôn sẵn
            sàng mang đến cho bạn trải nghiệm dịch vụ tuyệt vời nhất
          </p>
        </div>

        {/* Staff Slider */}
        <div className="relative">
          <Slider {...sliderSettings}>
            {staffs.map((staff, index) => (
              <StaffCard key={staff._id || index} staff={staff} index={index} />
            ))}
          </Slider>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {staffs.length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Chuyên viên</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {staffs.filter((s) => s.experience >= 5).length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Chuyên gia 5+ năm
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">
              {staffs.filter((s) => s.isTopRated).length}+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Top rated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">Hài lòng</div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx="true">{`
        .custom-dots {
          bottom: -60px;
        }
        .custom-dots li button:before {
          color: #3b82f6;
          font-size: 12px;
        }
        .custom-dots li.slick-active button:before {
          color: #1d4ed8;
        }
      `}</style>
    </section>
  );
};

export default Staff;
