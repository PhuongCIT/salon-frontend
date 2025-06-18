/* eslint-disable no-unused-vars */
import React, { useContext, useState, useMemo, useCallback } from "react";
import {
  FiTrash2,
  FiEdit,
  FiCalendar,
  FiClock,
  FiTag,
  FiUser,
  FiPhone,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi"; // More specific icons
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import appointmentApi from "../../services/appointmentsService"; // Assuming API service path
import MyScheduleCalendar from "../MyScheduleCalendar"; // Assuming Calendar component path
import { motion } from "framer-motion"; // For subtle animations

// Helper function to format date to YYYY-MM-DD (consistent with previous component)
const formatDate = (date) => {
  if (!date) return null;
  try {
    const d = new Date(date);
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

const StaffAppointment = () => {
  // Assuming useAuth provides appointments and a loading state for them
  const {
    appointments,
    getAllAppointments,
    isLoading: isLoadingAppointments,
  } = useAuth();
  // Assuming AppContext might provide formatPrice or other utilities if needed
  // const { formatPrice } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page
  const [isConfirmingId, setIsConfirmingId] = useState(null); // State to track which appointment is being confirmed

  // Memoized list of appointments excluding 'cancelled' and 'completed'
  const appointmentsPendingandConf = useMemo(() => {
    if (!appointments) return []; // Handle null/undefined appointments initially
    return appointments.filter(
      (item) => item.status !== "cancelled" && item.status !== "completed"
    );
  }, [appointments]); // Re-filter when appointments list changes

  // Calculate indices for pagination display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Memoized data for the current page
  const currentAppoitments = useMemo(() => {
    return appointmentsPendingandConf.slice(indexOfFirstItem, indexOfLastItem);
  }, [appointmentsPendingandConf, indexOfFirstItem, indexOfLastItem]); // Re-slice when filtered list or indices change

  // Memoized total pages calculation
  const totalPages = useMemo(() => {
    return Math.ceil(appointmentsPendingandConf.length / itemsPerPage);
  }, [appointmentsPendingandConf.length, itemsPerPage]); // Re-calculate when filtered list length changes

  // Pagination handlers
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);
  const nextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]); // Depend on totalPages
  const prevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []); // No dependencies needed here

  // Handler for confirming an appointment
  const confirmAppointment = async (id) => {
    if (isConfirmingId === id) return; // Prevent multiple clicks

    setIsConfirmingId(id); // Set loading state for this specific appointment
    try {
      const { data } = await appointmentApi.confirmed(id);
      console.log("confirmAppointment data ", data);
      if (data.success) {
        toast.success("Xác nhận lịch hẹn thành công!");
        getAllAppointments(); // Refresh the list
      } else {
        // Handle cases where API returns success: false
        toast.error(data.message || "Xác nhận lịch hẹn không thành công.");
      }
    } catch (error) {
      console.error("Error confirming appointment:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi xác nhận lịch hẹn."
      );
    } finally {
      setIsConfirmingId(null); // Clear loading state
    }
  };

  // Helper function to get status display and color
  const getStatusDisplay = (status) => {
    switch (status) {
      case "pending":
        return {
          text: "Đang chờ duyệt",
          color: "text-amber-600",
          bgColor: "bg-amber-100 dark:bg-amber-900/30",
          icon: <FiAlertCircle />,
        };
      case "confirmed":
        return {
          text: "Đã xác nhận",
          color: "text-green-600",
          bgColor: "bg-green-100 dark:bg-green-900/30",
          icon: <FiCheckCircle />,
        };
      case "completed": // Included for completeness, though filtered out
        return {
          text: "Đã hoàn thành",
          color: "text-blue-600",
          bgColor: "bg-blue-100 dark:bg-blue-900/30",
          icon: <FiCheckCircle />,
        };
      case "cancelled": // Included for completeness, though filtered out
        return {
          text: "Đã hủy",
          color: "text-red-600",
          bgColor: "bg-red-100 dark:bg-red-900/30",
          icon: <FiXCircle />,
        };
      default:
        return {
          text: status,
          color: "text-gray-600",
          bgColor: "bg-gray-100 dark:bg-gray-900/30",
          icon: null,
        };
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
        <FiCalendar className="text-blue-600" />
        Lịch hẹn của bạn
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Pane: Calendar */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 sticky top-4 self-start">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
            Lịch biểu
          </h2>
          {/* Pass all appointments to the calendar, let it handle its own filtering/display */}
          <MyScheduleCalendar registrations={appointments || []} />
        </div>

        {/* Right Pane: Appointments Table */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3 border-gray-200 dark:border-gray-700">
            Lịch hẹn đang chờ & đã xác nhận
          </h2>

          {isLoadingAppointments ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              Đang tải lịch hẹn...
            </div>
          ) : appointmentsPendingandConf.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiUser className="inline-block mr-1" /> Khách hàng
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiTag className="inline-block mr-1" /> Dịch vụ
                    </th>
                    {/* Staff name column might be redundant if this is the staff's own appointment list */}
                    {/* <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <FiUser className="inline-block mr-1" /> Nhân viên
                    </th> */}
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <FiCalendar className="inline-block mr-1" /> Ngày & Giờ
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
                  {currentAppoitments.map((appointment) => {
                    // Defensive checks for nested properties
                    const customer = appointment.customerId;
                    const staff = appointment.staffId; // Keep staff check just in case
                    const services = appointment.services || [];

                    if (!customer || !staff) return null; // Skip if essential data is missing

                    const statusInfo = getStatusDisplay(appointment.status);

                    return (
                      <motion.tr
                        key={appointment._id} // Use _id from backend if available
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: currentAppoitments.indexOf(appointment) * 0.05,
                        }}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200 flex items-center gap-1">
                            <FiUser size={14} className="text-blue-600" />{" "}
                            {customer.name || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1">
                            <FiPhone size={14} className="text-gray-500" />{" "}
                            {customer.phone || "N/A"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {services.length > 0 ? (
                            services.map((service, index) => (
                              <span
                                key={service._id || index} // Use _id or index as key
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-1 mb-1"
                              >
                                {service.name || "Dịch vụ ẩn danh"}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500 dark:text-gray-400">
                              Không có dịch vụ
                            </span>
                          )}
                        </td>
                        {/* Staff name column */}
                        {/* <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                           {staff.name || 'N/A'}
                         </td> */}
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center gap-1">
                            <FiCalendar size={14} className="text-gray-500" />
                            {formatDate(appointment.date)
                              ? new Date(appointment.date).toLocaleDateString(
                                  "vi-VN"
                                )
                              : "N/A"}
                          </div>
                          <div className="flex items-center gap-1">
                            <FiClock size={14} className="text-gray-500" />
                            {appointment.startTime || "N/A"} -{" "}
                            {appointment.endTime || "N/A"}{" "}
                            {/* Assuming end time is also available */}
                          </div>
                        </td>
                        <td
                          className={`px-4 py-4 whitespace-nowrap text-sm font-medium ${statusInfo.color}`}
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.bgColor}`}
                          >
                            {statusInfo.icon &&
                              React.cloneElement(statusInfo.icon, {
                                size: 14,
                                className: "mr-1",
                              })}
                            {statusInfo.text}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                          {appointment.status === "pending" && (
                            <button
                              onClick={() =>
                                confirmAppointment(appointment._id)
                              }
                              disabled={isConfirmingId === appointment._id}
                              className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200
                                 ${
                                   isConfirmingId === appointment._id
                                     ? "opacity-50 cursor-not-allowed"
                                     : ""
                                 }`}
                            >
                              {isConfirmingId === appointment._id
                                ? "Đang xác nhận..."
                                : "Xác nhận"}
                            </button>
                          )}
                          {/* Add buttons for other actions like complete/cancel if needed for staff */}
                          {/* {appointment.status === "confirmed" && (
                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200">
                                    Hoàn thành
                                </button>
                            )} */}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {isLoadingAppointments
                ? "Đang tải..."
                : "Không có lịch hẹn đang chờ hoặc đã xác nhận."}
            </div>
          )}

          {/* Pagination */}
          {appointmentsPendingandConf.length > itemsPerPage && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-300 mb-4 sm:mb-0">
                Hiển thị {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, appointmentsPendingandConf.length)}{" "}
                trong tổng {appointmentsPendingandConf.length} lịch hẹn
              </span>

              <div className="flex space-x-2">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      currentPage === 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  <FiChevronLeft className="inline-block" /> Trước
                </button>

                {/* Page numbers - only show a limited range for large number of pages */}
                {totalPages > 0 &&
                  Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`hidden sm:inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                        ${
                          currentPage === number
                            ? "bg-blue-600 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                    ${
                      currentPage === totalPages
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                >
                  Sau <FiChevronRight className="inline-block" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffAppointment;
