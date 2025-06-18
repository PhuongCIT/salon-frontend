/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiCalendar,
  FiLogOut,
  FiShield,
  FiUsers,
  FiChevronDown,
  FiHome,
  FiGrid,
  FiMail,
  FiInfo,
  FiStar,
  FiPlus,
} from "react-icons/fi";
import { FaHandSparkles, FaCrown, FaMagic } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, token } = useAuth();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowDropdown(false);
  };

  // Handle scroll effect with debounce
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const isScrolled = window.scrollY > 10;
        setScrolled(isScrolled);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const navItems = [
    { path: "/", label: "Trang chủ", icon: FiHome },
    { path: "/services", label: "Dịch vụ", icon: FiGrid },
    { path: "/booking", label: "Đặt lịch", icon: FiPlus },
    { path: "/contact", label: "Liên hệ", icon: FiMail },
    { path: "/about", label: "Giới thiệu", icon: FiInfo },
  ];

  const getUserRoleInfo = () => {
    switch (user?.role) {
      case "admin":
        return {
          icon: FiShield,
          color: "text-red-500",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          label: "Quản trị viên",
          badgeColor: "bg-gradient-to-r from-red-500 to-rose-600",
        };
      case "staff":
        return {
          icon: FiUsers,
          color: "text-blue-500",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          label: "Nhân viên",
          badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
        };
      default:
        return {
          icon: FiStar,
          color: "text-amber-500",
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
          label: "VIP",
          badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-600",
        };
    }
  };

  const roleInfo = user ? getUserRoleInfo() : null;

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto sm:px-8 px-4 ">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              onClick={() => navigate("/")}
              className="flex items-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                  <span className="inline-flex items-center">
                    <FaMagic className="mr-2 text-purple-600" />
                    Salon
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Hair
                    </span>
                  </span>
                </h1>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <motion.div
                className="ml-2 w-2 h-2 bg-blue-500 rounded-full"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`relative flex items-center gap-2 px-4 py-2 font-medium transition-all duration-300 group rounded-xl ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    } ${item.highlight ? "lg:ml-4" : ""}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        item.highlight ? "text-white" : ""
                      }`}
                    />
                    <span
                      className={`${
                        item.highlight
                          ? "relative px-3 py-1.5 -mx-3 -my-1.5 rounded-lg"
                          : ""
                      }`}
                    >
                      {item.label}
                      {item.highlight && (
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg -z-10"
                          initial={{ opacity: 0.9 }}
                          animate={{ opacity: [0.9, 1, 0.9] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-blue-500 rounded-full"
                        layoutId="activeNavIndicator"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* User Section */}
              {token ? (
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <motion.div
                        className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-blue-100 dark:ring-blue-900/30 group-hover:ring-blue-200 dark:group-hover:ring-blue-800/50 transition-all duration-200"
                        whileHover={{ rotate: 5 }}
                        whileTap={{ rotate: -5 }}
                      >
                        <img
                          src={
                            user?.image ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user?.name || "User"
                            )}&background=3B82F6&color=ffffff`
                          }
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      {/* Status Indicator */}
                      <motion.div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* User Info (Desktop) */}
                    <div className="hidden lg:block text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.name?.split(" ").pop() || "User"}
                        </span>
                        {roleInfo && (
                          <motion.div
                            className={`w-4 h-4 ${roleInfo.bgColor} rounded-full flex items-center justify-center`}
                            whileHover={{ scale: 1.1 }}
                          >
                            <roleInfo.icon
                              className={`w-2.5 h-2.5 ${roleInfo.color}`}
                            />
                          </motion.div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {roleInfo?.label || "Khách hàng"}
                      </div>
                    </div>

                    <FiChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {showDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                      >
                        {/* User Header */}
                        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-600"
                              whileHover={{ rotate: 5 }}
                            >
                              <img
                                src={
                                  user?.image ||
                                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user?.name || "User"
                                  )}&background=3B82F6&color=ffffff`
                                }
                                alt="Avatar"
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {user?.name || "User"}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {user?.email}
                              </div>
                              {roleInfo && (
                                <motion.div
                                  className={`inline-flex items-center gap-1 mt-1 px-2 py-1 ${roleInfo.bgColor} rounded-full text-xs font-medium`}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <roleInfo.icon
                                    className={`w-3 h-3 ${roleInfo.color}`}
                                  />
                                  <span className={roleInfo.color}>
                                    {roleInfo.label}
                                  </span>
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          {user?.role === "admin" && (
                            <motion.button
                              onClick={() => {
                                navigate("/admin");
                                setShowDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                              whileHover={{ x: 5 }}
                            >
                              <FiShield className="w-4 h-4 text-red-500" />
                              <span>Trang Admin</span>
                            </motion.button>
                          )}

                          {user?.role === "staff" && (
                            <motion.button
                              onClick={() => {
                                navigate("/staff");
                                setShowDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                              whileHover={{ x: 5 }}
                            >
                              <FiUsers className="w-4 h-4 text-blue-500" />
                              <span>Trang Staff</span>
                            </motion.button>
                          )}

                          <motion.button
                            onClick={() => {
                              navigate("/my-profile");
                              setShowDropdown(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                            whileHover={{ x: 5 }}
                          >
                            <FiUser className="w-4 h-4 text-green-500" />
                            <span>Thông tin cá nhân</span>
                          </motion.button>

                          {user?.role === "customer" && (
                            <motion.button
                              onClick={() => {
                                navigate("/my-appointments");
                                setShowDropdown(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                              whileHover={{ x: 5 }}
                            >
                              <FiCalendar className="w-4 h-4 text-purple-500" />
                              <span>Lịch hẹn của tôi</span>
                            </motion.button>
                          )}

                          <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

                          <motion.button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200 text-red-600 dark:text-red-400"
                            whileHover={{ x: 5 }}
                          >
                            <FiLogOut className="w-4 h-4" />
                            <span>Đăng xuất</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  onClick={() => navigate("/login")}
                  className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="w-4 h-4" />
                  <span>Đăng nhập</span>
                </motion.button>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setShowMenu(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                whileHover={{ rotate: 90 }}
                whileTap={{ rotate: -90 }}
              >
                <FiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20"></div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Menu Panel */}
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white dark:bg-gray-900 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Menu
                  </h2>
                  <FaHandSparkles className="w-4 h-4 text-blue-500" />
                </div>
                <motion.button
                  onClick={() => setShowMenu(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  whileHover={{ rotate: 180 }}
                  whileTap={{ rotate: -180 }}
                >
                  <FiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </motion.button>
              </div>

              {/* User Info (Mobile) */}
              {token && (
                <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-blue-200 dark:ring-blue-800"
                      whileHover={{ rotate: 5 }}
                    >
                      <img
                        src={
                          user?.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user?.name || "User"
                          )}&background=3B82F6&color=ffffff`
                        }
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {user?.name || "User"}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </div>
                      {roleInfo && (
                        <motion.div
                          className={`inline-flex items-center gap-1 mt-2 px-2 py-1 ${roleInfo.bgColor} rounded-full text-xs font-medium`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <roleInfo.icon
                            className={`w-3 h-3 ${roleInfo.color}`}
                          />
                          <span className={roleInfo.color}>
                            {roleInfo.label}
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <div className="p-4 space-y-2 overflow-y-auto h-[calc(100%-180px)]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          isActive
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        } ${
                          item.highlight
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
                            : ""
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}

                {/* User Actions (Mobile) */}
                {token ? (
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                    {user?.role === "admin" && (
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <button
                          onClick={() => {
                            navigate("/admin");
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                        >
                          <FiShield className="w-5 h-5 text-red-500" />
                          <span>Trang Admin</span>
                        </button>
                      </motion.div>
                    )}

                    {user?.role === "staff" && (
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <button
                          onClick={() => {
                            navigate("/staff");
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                        >
                          <FiUsers className="w-5 h-5 text-blue-500" />
                          <span>Trang Staff</span>
                        </button>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <button
                        onClick={() => {
                          navigate("/my-profile");
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                      >
                        <FiUser className="w-5 h-5 text-green-500" />
                        <span>Thông tin cá nhân</span>
                      </button>
                    </motion.div>

                    {user?.role === "customer" && (
                      <motion.div whileHover={{ scale: 1.02 }}>
                        <button
                          onClick={() => {
                            navigate("/my-appointments");
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                        >
                          <FiCalendar className="w-5 h-5 text-purple-500" />
                          <span>Lịch hẹn của tôi</span>
                        </button>
                      </motion.div>
                    )}

                    <motion.div whileHover={{ scale: 1.02 }}>
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200 text-red-600 dark:text-red-400"
                      >
                        <FiLogOut className="w-5 h-5" />
                        <span>Đăng xuất</span>
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                    <motion.button
                      onClick={() => {
                        navigate("/login");
                        setShowMenu(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Đăng nhập</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
