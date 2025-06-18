import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";
import reviewApi from "../services/reviewService";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCalendarAlt,
  FaStar,
  FaRegStar,
  FaClock,
  FaUser,
  FaMoneyBillWave,
  FaFilter,
  FaHistory,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiMessageSquare,
} from "react-icons/fi";
import MyScheduleCalendar from "../components/MyScheduleCalendar";

const MyAppointments = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang lịch hẹn của tôi";
  }, []);
  const { appointments, cancelAppointment, getAllAppointments } = useAuth();
  const { formatPrice, getReviews } = useContext(AppContext);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("upcoming"); // 'upcoming' hoặc 'history'

  // Tạo mảng các ngày có lịch hẹn
  const appointmentDates = appointments.map((app) => new Date(app.date));

  // Lọc appointments theo ngày được chọn
  const filterAppointmentsByDate = (apps) => {
    if (!selectedDate) return apps;
    return apps.filter((app) => {
      const appDate = new Date(app.date);
      return appDate.toDateString() === selectedDate.toDateString();
    });
  };

  const createReview = async (data) => {
    setIsSubmitting(true);
    try {
      await reviewApi.addReview(data);
      toast.success("Đánh giá thành công!");
      getAllAppointments();
      getReviews();
      setRating(0);
    } catch (error) {
      console.error("Lỗi khi tạo review:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Lọc lịch hẹn
  const appointmentsPendingandConf = filterAppointmentsByDate(
    appointments.filter(
      (item) => item.status !== "cancelled" && item.status !== "completed"
    )
  );

  const appointmentsCancelledAndCompleted = filterAppointmentsByDate(
    appointments.filter(
      (item) => item.status === "completed" || item.status === "cancelled"
    )
  );

  // Tính toán phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppoitments = appointmentsPendingandConf.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(
    appointmentsPendingandConf.length / itemsPerPage
  );

  // Chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      confirmed: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <FaCheckCircle className="w-3 h-3" />,
        text: "Đã xác nhận",
      },
      pending: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <FaExclamationCircle className="w-3 h-3" />,
        text: "Chờ xác nhận",
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <FaTimesCircle className="w-3 h-3" />,
        text: "Đã hủy",
      },
      completed: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <FaCheckCircle className="w-3 h-3" />,
        text: "Hoàn thành",
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  // Star Rating Component
  const StarRating = ({ rating, setRating, readonly = false }) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={readonly ? "button" : "button"}
            className={`text-xl transition-colors ${
              rating >= star ? "text-yellow-400" : "text-gray-300"
            } ${!readonly && "hover:text-yellow-300"}`}
            onClick={() => !readonly && setRating(star)}
            disabled={readonly}
          >
            {rating >= star ? <FaStar /> : <FaRegStar />}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Quản lý lịch hẹn
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Theo dõi và quản lý tất cả các lịch hẹn của bạn
          </p>
        </div>

        {/* Calendar Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            Lịch của tôi
          </h2>
          <MyScheduleCalendar registrations={appointmentsPendingandConf} />
        </div>

        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFilter className="text-blue-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Lọc theo ngày:
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="dd/MM/yyyy"
                  highlightDates={appointmentDates}
                  isClearable
                  placeholderText="Chọn ngày để lọc"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="flex items-center gap-1 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                  Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-3 rounded-l-lg font-medium transition-colors ${
              activeTab === "upcoming"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaClock />
              Lịch sắp tới ({appointmentsPendingandConf.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 rounded-r-lg font-medium transition-colors ${
              activeTab === "history"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-2">
              <FaHistory />
              Lịch sử ({appointmentsCancelledAndCompleted.length})
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Upcoming Appointments */}
          {activeTab === "upcoming" && (
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    Lịch hẹn sắp tới
                  </h2>
                </div>

                <div className="p-6">
                  {currentAppoitments.length === 0 ? (
                    <div className="text-center py-12">
                      <FaCalendarAlt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        Không có lịch hẹn nào
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {currentAppoitments.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-white to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300 dark:from-gray-700 dark:to-gray-600 dark:border-gray-600"
                        >
                          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                            {/* Service Info */}
                            <div className="lg:col-span-2">
                              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
                                {item.serviceId.name}
                              </h3>
                              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center gap-2">
                                  <FaUser className="w-4 h-4" />
                                  <span>
                                    Nhân viên:{" "}
                                    {item.staffId?.name || "Chưa xác định"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaClock className="w-4 h-4" />
                                  <span>
                                    {new Date(item.date).toLocaleDateString(
                                      "vi-VN"
                                    )}{" "}
                                    -{" "}
                                    {new Date(
                                      `2000-01-01T${item.startTime}`
                                    ).toLocaleTimeString("vi-VN", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FaMoneyBillWave className="w-4 h-4" />
                                  <span className="font-medium text-red-600">
                                    {formatPrice(item.totalPrice)} VNĐ
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Status */}
                            <div className="flex justify-center">
                              <StatusBadge status={item.status} />
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end">
                              {item.status !== "completed" && (
                                <button
                                  onClick={() => cancelAppointment(item._id)}
                                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2"
                                >
                                  <FaTimesCircle className="w-4 h-4" />
                                  Hủy lịch
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {appointmentsPendingandConf.length > itemsPerPage && (
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Hiển thị {indexOfFirstItem + 1}-
                        {Math.min(
                          indexOfLastItem,
                          appointmentsPendingandConf.length
                        )}{" "}
                        trong tổng {appointmentsPendingandConf.length} lịch hẹn
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevPage}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg ${
                            currentPage === 1
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white border hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <FiChevronLeft className="w-4 h-4" />
                        </button>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((number) => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`px-3 py-2 rounded-lg ${
                              currentPage === number
                                ? "bg-blue-500 text-white"
                                : "bg-white border hover:bg-gray-50 text-gray-700"
                            }`}
                          >
                            {number}
                          </button>
                        ))}

                        <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg ${
                            currentPage === totalPages
                              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                              : "bg-white border hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <FiChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* History */}
          {activeTab === "history" && (
            <div className="xl:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <FaHistory className="text-purple-500" />
                    Lịch sử
                  </h2>
                </div>

                <div className="p-6 max-h-[600px] overflow-y-auto">
                  {appointmentsCancelledAndCompleted.length === 0 ? (
                    <div className="text-center py-12">
                      <FaHistory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">
                        Chưa có lịch sử nào
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {appointmentsCancelledAndCompleted.map((item, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-white to-purple-50 rounded-xl p-6 border border-gray-200 dark:from-gray-700 dark:to-gray-600 dark:border-gray-600"
                        >
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Service Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                                    {item.serviceId?.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <FaMoneyBillWave className="w-4 h-4 text-red-500" />
                                    <span className="font-medium text-red-600">
                                      {formatPrice(item.totalPrice)} VNĐ
                                    </span>
                                  </div>
                                </div>
                                <StatusBadge status={item.status} />
                              </div>

                              {/* Review Section */}
                              {item.status === "completed" &&
                                !item.isReviewed && (
                                  <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                      <FiMessageSquare className="w-4 h-4" />
                                      Đánh giá dịch vụ
                                    </h4>
                                    <form
                                      onSubmit={async (e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);
                                        const reviewData = {
                                          customerId: user._id,
                                          appointmentId: item._id,
                                          serviceId: item.serviceId?._id,
                                          staffId: item.staffId?._id,
                                          rating: formData.get("rating"),
                                          comment: formData.get("comment"),
                                        };
                                        await createReview(reviewData);
                                      }}
                                      className="space-y-4"
                                    >
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                          Đánh giá sao:
                                        </label>
                                        <StarRating
                                          rating={rating}
                                          setRating={setRating}
                                        />
                                        <input
                                          type="hidden"
                                          name="rating"
                                          value={rating}
                                        />
                                      </div>

                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                          Nhận xét:
                                        </label>
                                        <textarea
                                          name="comment"
                                          rows={3}
                                          placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                          required
                                        />
                                      </div>

                                      <button
                                        type="submit"
                                        disabled={isSubmitting || rating === 0}
                                        className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                                      >
                                        {isSubmitting ? (
                                          <>
                                            <FaSpinner className="w-4 h-4 animate-spin" />
                                            Đang gửi...
                                          </>
                                        ) : (
                                          <>
                                            <FiMessageSquare className="w-4 h-4" />
                                            Gửi đánh giá
                                          </>
                                        )}
                                      </button>
                                    </form>
                                  </div>
                                )}

                              {item.status === "completed" &&
                                item.isReviewed && (
                                  <div className="bg-green-50 rounded-lg p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-700">
                                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                                      <FaCheckCircle className="w-4 h-4" />
                                      <span className="font-medium">
                                        Đã đánh giá
                                      </span>
                                    </div>
                                  </div>
                                )}

                              {item.status === "cancelled" && (
                                <div className="bg-red-50 rounded-lg p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-700">
                                  <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                    <FaTimesCircle className="w-4 h-4" />
                                    <span className="font-medium">
                                      Lịch hẹn đã bị hủy
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAppointments;
