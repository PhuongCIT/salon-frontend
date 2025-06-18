/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

// Danh sách các banner có thể luân phiên
const banners = [
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    title: "Ưu Đãi Đặc Biệt",
    subtitle: "Giảm 20% cho tất cả dịch vụ",
    cta: "Đặt lịch ngay",
    color: "from-amber-500/80 to-amber-700/80",
  },
  {
    image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1",
    title: "Dịch Vụ Mới",
    subtitle: "Trải nghiệm liệu trình chăm sóc tóc cao cấp",
    cta: "Khám phá ngay",
    color: "from-purple-500/80 to-purple-700/80",
  },
  {
    image: "https://images.unsplash.com/photo-1519735777090-ec97162dc266",
    title: "Thành Viên VIP",
    subtitle: "Ưu đãi tích lũy lên đến 40%",
    cta: "Đăng ký ngay",
    color: "from-rose-500/80 to-rose-700/80",
  },
];

const Banner = () => {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [direction, setDirection] = useState(1);

  // Tự động chuyển banner sau mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const handleNavigate = () => {
    navigate("/booking");
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden my-10 h-80 md:h-96 lg:h-[32rem] w-full">
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentBanner ? 1 : -1);
              setCurrentBanner(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentBanner ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
        aria-label="Previous banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm transition-all"
        aria-label="Next banner"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Animated Banner */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentBanner}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? "100%" : "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(${banners[currentBanner].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-b ${banners[currentBanner].color}`}
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center p-6 sm:p-8 md:p-10 lg:p-12 text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-2"
            >
              <p>{banners[currentBanner].title}</p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              <p>{banners[currentBanner].subtitle}</p>
            </motion.div>

            <motion.button
              onClick={handleNavigate}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black text-sm sm:text-base font-semibold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
            >
              {banners[currentBanner].cta}
              <FiArrowRight className="inline" />
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Banner;
