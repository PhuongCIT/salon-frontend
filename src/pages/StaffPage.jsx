/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Assuming AuthContext path
import StaffShift from "../components/staff/StaffShift"; // Assuming StaffShift component path
import StaffAppointment from "../components/staff/StaffAppointment"; // Assuming StaffAppointment component path
import { FiCalendar, FiClock } from "react-icons/fi"; // Icons for tabs
import { motion } from "framer-motion"; // For subtle animations

const StaffPage = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang nhân viên";
  }, []);
  // State để quản lý tab đang hoạt động, mặc định là 'appointments'
  const [activeTab, setActiveTab] = useState("appointments");
  // Lấy thông tin người dùng từ AuthContext
  const { user, isLoading: isLoadingUser } = useAuth(); // Assuming isLoadingUser is provided

  // Hiển thị màn hình chờ nếu thông tin người dùng đang được tải
  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <p className="text-xl">Đang tải thông tin người dùng...</p>{" "}
        {/* Simple loading indicator */}
      </div>
    );
  }

  // Kiểm tra vai trò người dùng, chỉ cho phép 'staff' truy cập
  if (user?.role !== "staff") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-red-600 dark:text-red-400">
          Truy cập bị từ chối!
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
          Bạn cần đăng nhập với tài khoản nhân viên để xem trang này.
        </p>
        <button
          onClick={() => (window.location.href = "/login")} // Redirect to login page
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-200"
        >
          Đến trang Đăng nhập
        </button>
      </div>
    );
  }

  // Render giao diện cho staff
  return (
    <div className="pt-10 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Tab Bar */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {/* Appointments Tab */}
            <button
              onClick={() => setActiveTab("appointments")}
              className={`inline-flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200
                ${
                  activeTab === "appointments"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
                }`}
            >
              <FiCalendar className="text-lg" />
              Lịch hẹn
            </button>

            {/* Shift Tab */}
            <button
              onClick={() => setActiveTab("shift")}
              className={`inline-flex items-center gap-2 py-4 px-1 border-b-2 font-semibold text-sm transition-colors duration-200
                ${
                  activeTab === "shift"
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-600"
                }`}
            >
              <FiClock className="text-lg" />
              Ca làm
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab} // Key prop to trigger animation on tab change
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "appointments" && <StaffAppointment />}

          {activeTab === "shift" && <StaffShift />}
        </motion.div>
      </div>
    </div>
  );
};

export default StaffPage;
