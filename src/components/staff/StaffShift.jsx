/* eslint-disable no-unused-vars */
import React, { useContext, useState, useMemo, useCallback } from "react";
import DatePicker from "../DatePicker"; // Assuming DatePicker component path
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import workShiftApi from "../../services/workShiftService"; // Assuming API service path
import { toast } from "react-toastify";
import {
  FiCalendar,
  FiClock,
  FiTag,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiUserPlus,
} from "react-icons/fi"; // Icons for better UI
import { motion } from "framer-motion"; // For subtle animations

// Helper function to format date to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) return null;
  try {
    const d = new Date(date);
    // Check if date is valid
    if (isNaN(d.getTime())) {
      console.error("Invalid date provided to formatDate:", date);
      return null;
    }
    return d.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date:", date, error);
    return null;
  }
};

const StaffShift = () => {
  // Assuming AppContext provides available shifts (all shifts created by Admin)
  const { shifts, isLoading: isLoadingShifts } = useContext(AppContext);
  // Assuming useAuth provides the current user's registered work shifts
  const {
    workShifts,
    getAllWorkShift,
    user,
    isLoading: isLoadingWorkShifts,
  } = useAuth();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isRegistering, setIsRegistering] = useState(false);
  const [cancelingWorkShiftId, setCancelingWorkShiftId] = useState(null);

  // Memoized list of available shifts filtered by the selected date
  const filteredAvailableShifts = useMemo(() => {
    const formattedSelectedDate = formatDate(selectedDate);
    if (!shifts || !formattedSelectedDate) return [];

    return shifts.filter(
      (shift) => formatDate(shift.date) === formattedSelectedDate
    );
  }, [shifts, selectedDate]); // Re-calculate when shifts or selectedDate changes

  // Memoized check if a specific shift ID is already registered by the current user
  const isShiftRegistered = useCallback(
    (shiftId) => {
      if (!workShifts) return false;
      return workShifts.some(
        (workShift) =>
          workShift.shiftId?._id === shiftId && // Use optional chaining for safety
          (workShift.status === "pending" || workShift.status === "approved")
      );
    },
    [workShifts]
  ); // Re-calculate when workShifts changes

  // Handler for registering for a shift
  const handleRegister = async (shiftId) => {
    if (isRegistering) return; // Prevent multiple clicks

    // Check if ca này đã được đăng ký chưa (client-side check)
    if (isShiftRegistered(shiftId)) {
      toast.warning("Bạn đã đăng ký ca này rồi!");
      return;
    }

    setIsRegistering(true);
    try {
      const newReg = {
        shiftId: shiftId,
        staffId: user._id,
      };

      const response = await workShiftApi.register(newReg);
      const data = response.data;

      if (data.success) {
        toast.success("Đăng ký thành công, chờ admin duyệt");
        getAllWorkShift(); // Refresh the list of registered work shifts
      } else {
        // Handle potential API success: false cases if the backend sends them
        toast.error(data.message || "Đăng ký không thành công.");
      }
    } catch (error) {
      console.error("Error registering shift:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi đăng ký ca."
      );
    } finally {
      setIsRegistering(false);
    }
  };

  // Handler for canceling a registered work shift
  const handleCancelShift = async (workShiftId) => {
    if (cancelingWorkShiftId === workShiftId) return; // Prevent multiple clicks on the same item

    setCancelingWorkShiftId(workShiftId);
    try {
      const response = await workShiftApi.cancelShift(workShiftId);
      if (response.data.success) {
        toast.success("Hủy ca làm thành công");
        getAllWorkShift(); // Refresh the list of registered work shifts
      } else {
        // Handle potential API success: false cases
        toast.error(response.data.message || "Hủy ca không thành công.");
      }
    } catch (error) {
      console.error("Error canceling shift:", error);
      toast.error(error.response?.data?.message || "Không thể hủy ca làm.");
    } finally {
      setCancelingWorkShiftId(null);
    }
  };

  // Function to get status display and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "Đang chờ duyệt",
          color: "text-amber-500",
          icon: <FiAlertCircle />,
        };
      case "approved":
        return {
          text: "Đã duyệt",
          color: "text-green-500",
          icon: <FiCheckCircle />,
        };
      case "rejected":
        return {
          text: "Đã từ chối",
          color: "text-red-500",
          icon: <FiXCircle />,
        };
      case "canceled": // Assuming a canceled status might exist
        return { text: "Đã hủy", color: "text-gray-500", icon: <FiXCircle /> };
      default:
        return { text: status, color: "text-gray-500", icon: null };
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
        <FiCalendar className="text-blue-600" />
        Quản lý ca làm của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Pane: Registered Work Shifts Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
            Ca làm đã đăng ký
          </h2>

          {isLoadingWorkShifts ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Đang tải ca làm đã đăng ký...
            </div>
          ) : workShifts && workShifts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiTag className="inline-block mr-1" /> Loại ca
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiCalendar className="inline-block mr-1" /> Ngày
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiClock className="inline-block mr-1" /> Giờ
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {workShifts.map((item) => {
                    // Defensive check for nested properties
                    const shiftDetails = item.shiftId;
                    if (!shiftDetails) return null; // Skip if shiftId is missing

                    const statusInfo = getStatusDisplay(item.status);

                    return (
                      <motion.tr
                        key={item._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                          {shiftDetails.shiftType}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatDate(shiftDetails.date)
                            ? new Date(shiftDetails.date).toLocaleDateString(
                                "vi-VN"
                              )
                            : "N/A"}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {shiftDetails.startTime || "N/A"} -{" "}
                          {shiftDetails.endTime || "N/A"}
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm ${statusInfo.color}`}
                        >
                          <span className="flex items-center gap-1">
                            {statusInfo.icon} {statusInfo.text}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {item.status === "pending" && (
                            <button
                              onClick={() => handleCancelShift(item._id)}
                              disabled={cancelingWorkShiftId === item._id}
                              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200
                                 ${
                                   cancelingWorkShiftId === item._id
                                     ? "opacity-50 cursor-not-allowed"
                                     : ""
                                 }`}
                            >
                              {cancelingWorkShiftId === item._id
                                ? "Đang hủy..."
                                : "Hủy ca"}
                            </button>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Bạn chưa đăng ký ca làm nào.
            </div>
          )}
        </div>

        {/* Right Pane: Available Shifts for Selected Date */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 sticky top-4 self-start">
          {" "}
          {/* self-start keeps it at the top */}
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
            Đăng ký ca làm theo ngày
          </h2>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Chọn ngày:
            </label>
            <DatePicker
              selectedDate={selectedDate}
              onChange={setSelectedDate}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="max-h-[500px] overflow-y-auto pr-2 -mr-2">
            {" "}
            {/* Added pr-2 -mr-2 for scrollbar */}
            {isLoadingShifts ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Đang tải danh sách ca khả dụng...
              </div>
            ) : filteredAvailableShifts.length > 0 ? (
              filteredAvailableShifts.map((item) => (
                <motion.div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 mb-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: filteredAvailableShifts.indexOf(item) * 0.05,
                  }}
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                      <FiTag size={14} className="text-blue-600" />{" "}
                      {item.shiftType}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      <FiClock size={14} className="text-gray-500" />{" "}
                      {item.startTime || "N/A"} - {item.endTime || "N/A"}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRegister(item._id)}
                    disabled={isShiftRegistered(item._id) || isRegistering}
                    className={`flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
                      ${
                        isShiftRegistered(item._id)
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : isRegistering
                          ? "bg-blue-400 text-white cursor-not-allowed"
                          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                      }`}
                  >
                    {isRegistering && !isShiftRegistered(item._id) ? (
                      "Đang đăng ký..."
                    ) : isShiftRegistered(item._id) ? (
                      "Đã đăng ký"
                    ) : (
                      <>
                        {" "}
                        <FiUserPlus className="mr-2" /> Đăng ký{" "}
                      </>
                    )}
                  </button>
                </motion.div>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                Không có ca làm khả dụng nào cho ngày đã chọn.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffShift;
