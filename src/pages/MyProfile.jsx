/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react"; // Import useEffect
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // For animations
import {
  FiEdit,
  FiSave,
  FiXCircle,
  FiUpload, // Icon cho upload
  FiLoader, // Icon cho loading
  FiPhone,
  FiMapPin,
  FiMail,
  FiUser,
  FiCalendar,
  FiTag, // Icon cho Role
} from "react-icons/fi";
import { FaVenusMars } from "react-icons/fa6"; // Icon cho Gender

// Helper function to format date for display
const formatDateDisplay = (dateString) => {
  if (!dateString) return "Chưa cập nhật";
  try {
    // Simple format like DD/MM/YYYY
    const date = new Date(dateString);
    if (isNaN(date)) return "Ngày không hợp lệ";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return "Ngày không hợp lệ";
  }
};

// Helper function to format date for input[type="date"]
const formatDateInput = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().split("T")[0]; // Format YYYY-MM-DD
  } catch (error) {
    console.error("Error formatting date for input:", dateString, error);
    return "";
  }
};

const MyProfile = () => {
  //tilte
  useEffect(() => {
    document.title = "SalonHair - Trang Cá nhân";
  }, []);

  const { token, user, setUser, loadUserProfileData, baseURL } = useAuth();
  // const { getAllStaffs } = useContext(AppContext);
  const [imageFile, setImageFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      setImageFile(null);
    }
  }, [isEdit]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const updateUserProfileData = async () => {
    setIsSaving(true);
    try {
      const formData = new FormData();
      // Append fields that are editable
      formData.append("userId", user._id);
      formData.append("name", user.name || "");
      formData.append("phone", user.phone || "");
      formData.append("address", user.address || "");
      formData.append("dob", user.dob ? formatDateInput(user.dob) : "");
      formData.append("gender", user.gender || "");

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // --- Đoạn code để console.log formData ---
      // console.log("--- Nội dung FormData ---");
      // for (const pair of formData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }
      // console.log("-------------------------");
      // ----------------------------------------

      // Use PUT request as it's an update
      const { data } = await axios.put(
        `${baseURL}/user/update-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for FormData
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Cập nhật thành công!");
        await loadUserProfileData();
        // if (user?.role === "staff") {
        //   getAllStaffs();
        // }
        setImageFile(null);
        setIsEdit(false);
      } else {
        toast.error(data.message || "Cập nhật thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
      // Improve error message extraction
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Lỗi hệ thống. Vui lòng thử lại sau.";
      toast.error("Cập nhật thất bại: " + errorMessage);
    } finally {
      setIsSaving(false); // End saving state
    }
  };

  // Render login prompt if not logged in
  if (!token || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full text-center text-gray-800 dark:text-white"
        >
          <FiUser className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h1 className="text-2xl font-bold mb-4">
            Vui lòng đăng nhập để xem hồ sơ
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Bạn cần đăng nhập để truy cập trang này.
          </p>
          <button
            onClick={() => (window.location.href = "/login")} // Use window.location or navigate from react-router-dom
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Đi đến trang Đăng nhập
          </button>
        </motion.div>
      </div>
    );
  }

  // Render profile page
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
        >
          {/* Avatar Section */}
          <div className="relative mb-6">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 dark:border-blue-700 shadow-md"
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : user?.image || "placeholder-avatar.png"
              } // Use placeholder if no image
              alt={user?.name || "User Avatar"}
            />
            {isEdit && (
              <label
                htmlFor="imageUpload"
                className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-200 shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
                title="Thay đổi ảnh đại diện"
              >
                <FiUpload className="text-white text-lg" />
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name */}
          {isEdit ? (
            <input
              type="text"
              className="text-2xl font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={user?.name || ""}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          ) : (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.name || "Người dùng"}
            </h2>
          )}

          {/* Role */}
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mb-4">
            <FiTag className="text-blue-500 dark:text-blue-400" />
            {user?.role || "Chưa xác định"}
          </p>

          {/* Edit/Save/Cancel Buttons */}
          <div className="mt-4 w-full">
            <AnimatePresence mode="wait">
              {" "}
              {/* Use AnimatePresence for button transitions */}
              {isEdit ? (
                <motion.div
                  key="edit-buttons"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 justify-center"
                >
                  <button
                    onClick={updateUserProfileData}
                    disabled={isSaving}
                    className={`flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800 ${
                      isSaving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSaving ? (
                      <FiLoader className="animate-spin mr-2" />
                    ) : (
                      <FiSave className="mr-2" />
                    )}
                    Lưu
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    disabled={isSaving} // Disable cancel while saving
                    className={`flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white ${
                      isSaving ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiXCircle className="mr-2" />
                    Hủy
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="view-button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button
                    onClick={() => setIsEdit(true)}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    <FiEdit className="mr-2" />
                    Chỉnh sửa hồ sơ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Column - Details & Appointments */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Contact and Basic Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 border-b pb-2 border-gray-200 dark:border-gray-700">
              Thông tin chi tiết
            </h3>

            {/* Contact Information */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Thông tin liên hệ
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiMail className="mr-3 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="font-medium min-w-[80px]">Email:</span>
                  <span className="ml-2 text-blue-600 dark:text-blue-400 break-all">
                    {user?.email || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiPhone className="mr-3 text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="font-medium min-w-[80px]">Điện thoại:</span>
                  {isEdit ? (
                    <input
                      type="text"
                      className="ml-2 flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user?.phone || ""}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, phone: e.target.value }))
                      }
                    />
                  ) : (
                    <span className="ml-2 text-teal-600 dark:text-teal-400">
                      {user?.phone || "Chưa cập nhật"}
                    </span>
                  )}
                </div>
                <div className="flex items-start text-gray-700 dark:text-gray-300">
                  <FiMapPin className="mr-3 text-red-500 dark:text-red-400 flex-shrink-0 mt-1" />
                  <span className="font-medium min-w-[80px]">Địa chỉ:</span>
                  {isEdit ? (
                    <input
                      type="text"
                      className="ml-2 flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user?.address || ""}
                      onChange={(e) =>
                        setUser((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <span className="ml-2 text-gray-600 dark:text-gray-300 break-words">
                      {user?.address || "Chưa cập nhật"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div>
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Thông tin cơ bản
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FaVenusMars className="mr-3 text-pink-500 dark:text-pink-400 flex-shrink-0" />
                  <span className="font-medium min-w-[80px]">Giới tính:</span>
                  {isEdit ? (
                    <select
                      className="ml-2 flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={user?.gender || ""}
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, gender: e.target.value }))
                      }
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>{" "}
                      {/* Add 'Other' option */}
                    </select>
                  ) : (
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {user?.gender || "Chưa cập nhật"}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                  <FiCalendar className="mr-3 text-orange-500 dark:text-orange-400 flex-shrink-0" />
                  <span className="font-medium min-w-[80px]">Ngày sinh:</span>
                  {isEdit ? (
                    <input
                      type="date"
                      className="ml-2 flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formatDateInput(user?.dob)} // Format date for input
                      onChange={(e) =>
                        setUser((prev) => ({ ...prev, dob: e.target.value }))
                      }
                    />
                  ) : (
                    <span className="ml-2 text-gray-600 dark:text-gray-300">
                      {formatDateDisplay(user?.dob)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
