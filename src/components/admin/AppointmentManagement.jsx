import {
  FiTrash2,
  FiEdit,
  FiCheck,
  FiBell,
  FiCalendar,
  FiUser,
  FiPhone,
  FiDollarSign,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

const AppointmentManagement = () => {
  const {
    appointments,
    completeAppointment,
    confirmAppointment,
    deleteAppointment,
  } = useAuth();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [isSendingNotification, setIsSendingNotification] = useState(false);

  // Filter and pagination logic
  const filteredAppointments = appointments.filter(
    (appointment) =>
      statusFilter === "all" || appointment.status === statusFilter
  );

  const pageCount = Math.ceil(filteredAppointments.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    offset,
    offset + itemsPerPage
  );

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price);

  const formatDateTime = (dateString, timeString) => {
    const date = parseISO(dateString);
    const time = new Date(`2000-01-01T${timeString}`);

    return {
      date: format(date, "EEEE, dd/MM/yyyy", { locale: vi }),
      time: format(time, "HH:mm", { locale: vi }),
    };
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [statusFilter]);

  const handleSelectAppointment = (appointmentId) => {
    setSelectedAppointments((prev) =>
      prev.includes(appointmentId)
        ? prev.filter((id) => id !== appointmentId)
        : [...prev, appointmentId]
    );
  };

  const handleSelectAll = () => {
    const validAppointments = currentAppointments
      .filter((apt) => ["pending", "confirmed"].includes(apt.status))
      .map((apt) => apt._id);

    if (validAppointments.every((id) => selectedAppointments.includes(id))) {
      setSelectedAppointments((prev) =>
        prev.filter((id) => !validAppointments.includes(id))
      );
    } else {
      setSelectedAppointments((prev) => [
        ...new Set([...prev, ...validAppointments]),
      ]);
    }
  };

  const handleSendNotifications = async () => {
    if (selectedAppointments.length === 0) {
      toast.warning("Vui lòng chọn ít nhất một lịch hẹn");
      return;
    }

    setIsSendingNotification(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/notifications/send-reminders",
        { appointmentIds: selectedAppointments }
      );

      if (response.data.success) {
        toast.success(
          `Đã gửi thông báo cho ${selectedAppointments.length} khách hàng`
        );
        setSelectedAppointments([]);
      } else {
        toast.error(response.data.message || "Gửi thông báo thất bại");
      }
    } catch (error) {
      toast.error("Lỗi kết nối server");
      console.error("Notification error:", error);
    } finally {
      setIsSendingNotification(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      confirmed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      completed:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    };

    return (
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
            <FiCalendar className="text-blue-500" />
            Quản lý lịch hẹn
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng số: {filteredAppointments.length} lịch hẹn
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={handleSendNotifications}
            disabled={
              selectedAppointments.length === 0 || isSendingNotification
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedAppointments.length === 0 || isSendingNotification
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            <FiBell />
            {isSendingNotification ? "Đang gửi..." : "Gửi thông báo"}
            {selectedAppointments.length > 0 && (
              <span className="bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-300 text-xs px-2 py-0.5 rounded-full">
                {selectedAppointments.length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Lọc:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">Tất cả</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    currentAppointments.length > 0 &&
                    currentAppointments
                      .filter((apt) =>
                        ["pending", "confirmed"].includes(apt.status)
                      )
                      .every((apt) => selectedAppointments.includes(apt._id))
                  }
                  onChange={handleSelectAll}
                  className="rounded dark:bg-gray-600"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <FiUser className="opacity-70" />
                  Khách hàng
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <FiDollarSign className="opacity-70" />
                  Giá
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nhân viên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => {
                const { date, time } = formatDateTime(
                  appointment.date,
                  appointment.startTime
                );

                return (
                  <motion.tr
                    key={appointment._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${
                      selectedAppointments.includes(appointment._id)
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedAppointments.includes(appointment._id)}
                        onChange={() =>
                          handleSelectAppointment(appointment._id)
                        }
                        disabled={
                          !["pending", "confirmed"].includes(appointment.status)
                        }
                        className="rounded dark:bg-gray-600"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              appointment.customerId?.image ||
                              "/default-avatar.png"
                            }
                            alt={appointment.customerId?.name}
                            onError={(e) => {
                              e.target.src = "/default-avatar.png";
                            }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {appointment.customerId?.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <FiPhone className="opacity-70" size={12} />
                            {appointment.customerId?.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs">
                        {appointment.serviceId?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {formatPrice(appointment.totalPrice)} VNĐ
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {appointment.staffId?.name || "Chưa chỉ định"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {date}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {time}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => confirmAppointment(appointment._id)}
                            className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors cursor-pointer"
                            title="Xác nhận"
                          >
                            <FiCheck />
                          </button>
                        )}
                        {appointment.status === "confirmed" && (
                          <button
                            onClick={() => completeAppointment(appointment._id)}
                            className="text-green-500 hover:text-green-700 p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-900/20 transition-colors"
                            title="Hoàn thành"
                          >
                            <FiCheck />
                          </button>
                        )}
                        <button
                          onClick={() => deleteAppointment(appointment._id)}
                          className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                          title="Xóa"
                        >
                          <FiTrash2 />
                        </button>
                        <button
                          className="text-yellow-500 hover:text-yellow-700 p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-colors cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <FiEdit />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                    <FiCalendar className="text-4xl mb-2 opacity-50" />
                    {statusFilter === "all" ? (
                      <p>Chưa có lịch hẹn nào</p>
                    ) : (
                      <p>Không có lịch hẹn ở trạng thái này</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAppointments.length > itemsPerPage && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị <span className="font-medium">{offset + 1}</span> -{" "}
            <span className="font-medium">
              {Math.min(offset + itemsPerPage, filteredAppointments.length)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-medium">{filteredAppointments.length}</span>{" "}
            lịch hẹn
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageClick({ selected: currentPage - 1 })}
              disabled={currentPage === 0}
              className={`p-2 rounded-lg ${
                currentPage === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              ←
            </button>

            {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
              let pageNumber;
              if (pageCount <= 5) {
                pageNumber = i;
              } else if (currentPage <= 2) {
                pageNumber = i;
              } else if (currentPage >= pageCount - 3) {
                pageNumber = pageCount - 5 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick({ selected: pageNumber })}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentPage === pageNumber
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNumber + 1}
                </button>
              );
            })}

            <button
              onClick={() => handlePageClick({ selected: currentPage + 1 })}
              disabled={currentPage >= pageCount - 1}
              className={`p-2 rounded-lg ${
                currentPage >= pageCount - 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
