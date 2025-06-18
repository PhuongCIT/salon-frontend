/* eslint-disable no-unused-vars */
import React, { useState, Suspense, useEffect } from "react"; // Import Suspense
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiScissors,
  FiCalendar,
  FiClock,
  FiUser,
  FiMail,
  FiLogOut,
  FiChevronRight,
  FiLoader, // Thêm icon loader
} from "react-icons/fi";
import { FaChartLine, FaUserShield } from "react-icons/fa";

// Import components with lazy loading
// Đảm bảo đường dẫn import là chính xác trong dự án của bạn
const StaffManagement = React.lazy(() =>
  import("../components/admin/StaffManagement")
);
const ServiceManagement = React.lazy(() =>
  import("../components/admin/ServiceManagement")
);
const AppointmentManagement = React.lazy(() =>
  import("../components/admin/AppointmentManagement")
);
const Dashboard = React.lazy(() => import("../components/admin/Dashboard"));
const ShiftManagement = React.lazy(() =>
  import("../components/admin/ShiftManagement")
);
const ContactManagement = React.lazy(() =>
  import("../components/admin/ContactManagement")
);
const CustomerManagement = React.lazy(() =>
  import("../components/admin/CustomerManagement")
);

const AdminPage = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang quản lý";
  }, []);

  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, logout, loading: authLoading } = useAuth(); // Giả định useAuth có state loading
  const navigate = useNavigate();

  // Định nghĩa các tab
  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FaChartLine,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      id: "staffs",
      label: "Nhân viên",
      icon: FiUsers,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      id: "services",
      label: "Dịch vụ",
      icon: FiScissors,
      color: "text-green-600 dark:text-green-400",
    },
    {
      id: "appointments",
      label: "Lịch hẹn",
      icon: FiCalendar,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      id: "shift",
      label: "Ca làm",
      icon: FiClock,
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "customer",
      label: "Khách hàng",
      icon: FiUser,
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      id: "contact",
      label: "Liên hệ",
      icon: FiMail,
      color: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  // Xử lý đăng xuất
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Render nội dung của tab đang hoạt động
  const renderTabContent = () => {
    switch (activeTab) {
      case "staffs":
        return <StaffManagement />;
      case "services":
        return <ServiceManagement />;
      case "appointments":
        return <AppointmentManagement />;
      case "dashboard":
        return <Dashboard />;
      case "shift":
        return <ShiftManagement />;
      case "contact":
        return <ContactManagement />;
      case "customer":
        return <CustomerManagement />;
      default:
        return <Dashboard />;
    }
  };

  // Hiển thị loading hoặc trang từ chối truy cập nếu cần
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <FiLoader className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  // Kiểm tra quyền admin
  if (!user || user.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <FaUserShield className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Truy cập bị từ chối
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Bạn cần đăng nhập bằng tài khoản Admin để truy cập trang này.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Đăng nhập
              <FiChevronRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={() => navigate("/")}
              className="border border-gray-300 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-200 dark:border-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Trang chủ
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Giao diện Admin chính
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header Bar (Optional: Can add user info/logout here) */}
      {/* <header className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
         <div className="text-lg font-semibold text-gray-800 dark:text-white">Admin Panel</div>
         <button onClick={handleLogout} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-2">
           <FiLogOut /> Đăng xuất
         </button>
       </header> */}

      {/* Horizontal Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center gap-x-6 md:gap-x-8">
            {tabs.map((tab) => (
              <li key={tab.id} className="mr-2">
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition-colors duration-200 ease-in-out ${
                    activeTab === tab.id
                      ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                      : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
                  }`}
                  aria-current={activeTab === tab.id ? "page" : undefined}
                >
                  <tab.icon
                    className={`w-5 h-5 mr-2 ${
                      tab.color
                    } group-hover:text-blue-600 dark:group-hover:text-blue-400 ${
                      activeTab === tab.id
                        ? "text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  />
                  {tab.label}
                </button>
              </li>
            ))}
            {/* Nút Đăng xuất trong nav ngang (tùy chọn) */}
            <li className="ml-auto">
              {" "}
              {/* Dùng ml-auto để đẩy sang phải */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center p-4 text-sm font-medium text-red-600 border-b-2 border-transparent rounded-t-lg hover:text-red-800 hover:border-red-300 dark:text-red-400 dark:hover:text-red-300 dark:hover:border-red-600 transition-colors duration-200 ease-in-out"
              >
                <FiLogOut className="w-5 h-5 mr-2" />
                Đăng xuất
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Tab Header (Icon and Title for the current tab) */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-5 bg-gray-50 dark:bg-gray-700">
            {" "}
            {/* Thêm màu nền cho header content */}
            <div className="flex items-center gap-3">
              {/* Tìm icon và label cho tab hiện tại */}
              {(() => {
                const activeTabObj = tabs.find((tab) => tab.id === activeTab);
                if (!activeTabObj) return null;
                const Icon = activeTabObj.icon;
                return (
                  <Icon
                    className={`w-6 h-6 ${activeTabObj.color}`}
                    aria-hidden="true"
                  />
                );
              })()}
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                {tabs.find((tab) => tab.id === activeTab)?.label}
              </h2>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Sử dụng Suspense để hiển thị fallback khi lazy loading */}
            <Suspense
              fallback={
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
                </div>
              }
            >
              {renderTabContent()}
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
