import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiInfo,
  FiUser,
  FiX,
} from "react-icons/fi";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import appointmentApi from "../services/appointmentsService";
import { useParams } from "react-router-dom";

const BookingPage = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang đặt lịch";
  }, []);
  const { serviceId } = useParams();
  const { services, formatPrice, staffs } = useContext(AppContext);
  const { getAllAppointments, user } = useAuth();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStaffId, setSelectedStaffId] = useState("");

  // Effect để tự động chọn service từ URL params
  useEffect(() => {
    if (serviceId && services && services.length > 0) {
      const preSelectedService = services.find(
        (service) => service._id === serviceId
      );
      if (preSelectedService) {
        setSelectedService(preSelectedService);
        console.log("Auto-selected service:", preSelectedService);
      }
    }
  }, [serviceId, services]);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!selectedService) errors.service = "Vui lòng chọn một dịch vụ";
    if (!date) errors.date = "Vui lòng chọn ngày";
    if (!startTime) errors.time = "Vui lòng chọn giờ";

    // Kiểm tra ngày giờ hợp lệ
    if (date && startTime) {
      const selectedDateTime = new Date(`${date}T${startTime}`);
      const now = new Date();
      if (selectedDateTime < now) {
        errors.date = "Thời gian phải trong tương lai";
      }
    }

    // Kiểm tra giờ làm việc
    if (startTime) {
      const [hours] = startTime.split(":");
      if (hours < 8 || hours > 20) {
        errors.time = "Giờ làm việc: 8:00 - 20:00";
      }
    }
    return errors;
  }, [selectedService, date, startTime]);

  const selectService = useCallback((service) => {
    setSelectedService((prevSelected) =>
      prevSelected && prevSelected._id === service._id ? null : service
    );
  }, []);

  const clearSelectedService = useCallback(() => {
    setSelectedService(null);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const validationError = validateForm();
      if (Object.keys(validationError).length) {
        setErrors(validationError);
        toast.error("Vui lòng kiểm tra lại thông tin!");
        return;
      }
      setErrors({});
      setIsSubmitting(true);

      try {
        const appointmentData = {
          appointmentDate: new Date(`${date}T${startTime}`).toISOString(),
          date: date,
          startTime: startTime,
          notes: notes.trim(),
          customerId: user._id,
          staffId: selectedStaffId || null,
          serviceId: selectedService._id,
          totalPrice: selectedService.price,
        };

        console.log("Appointment Data:", appointmentData);

        const res = await appointmentApi.create(appointmentData);
        const response = res.data;

        if (response.success) {
          // Reset form
          setSelectedService(null);
          setDate("");
          setStartTime("");
          setNotes("");
          setSelectedStaffId("");
          setErrors({});

          toast.success(
            "Đặt lịch thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
          );
          getAllAppointments();
        }
      } catch (error) {
        console.error("Booking error:", error);
        const errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra khi đặt lịch";
        toast.error(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      validateForm,
      date,
      startTime,
      notes,
      user._id,
      selectedStaffId,
      selectedService,
      getAllAppointments,
    ]
  );

  // Get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <FiCalendar className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Đặt Lịch Hẹn
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl font-medium dark:text-gray-300">
            Chúng tôi luôn sẵn sàng phục vụ bạn một cách tốt nhất
          </p>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700"
        >
          <div className="space-y-8">
            {/* Customer Info & Staff Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Name */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                  Thông tin khách hàng
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input
                    type="text"
                    disabled
                    value={user?.name || ""}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 font-medium cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
              </div>

              {/* Staff Selection */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                  Chọn nhân viên (tùy chọn)
                </label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <select
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  >
                    <option value="">Để hệ thống tự động chọn</option>
                    {staffs?.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name} - {staff.specialization || "Chuyên viên"}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.staff && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FiInfo className="w-4 h-4" />
                    {errors.staff}
                  </p>
                )}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                  Chọn ngày
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input
                    type="date"
                    value={date}
                    min={getMinDate()}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                {errors.date && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FiInfo className="w-4 h-4" />
                    {errors.date}
                  </p>
                )}
              </div>

              {/* Time */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 dark:text-gray-300">
                  Chọn giờ (8:00 - 20:00)
                </label>
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-xl" />
                  <input
                    type="time"
                    value={startTime}
                    min="08:00"
                    max="20:00"
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-gray-700 font-medium dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                  />
                </div>
                {errors.time && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    <FiInfo className="w-4 h-4" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300">
                  Chọn dịch vụ
                </label>
                {selectedService && (
                  <button
                    type="button"
                    onClick={clearSelectedService}
                    className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FiX className="w-4 h-4" />
                    Bỏ chọn
                  </button>
                )}
              </div>

              {/* Selected Service Display */}
              {selectedService && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200 dark:from-blue-900/20 dark:to-purple-900/20 dark:border-blue-700">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={selectedService.image}
                        alt={selectedService.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        {selectedService.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Thời gian: {selectedService.duration} phút
                      </p>
                      <p className="text-lg font-bold text-red-600">
                        {formatPrice(selectedService.price)} VNĐ
                      </p>
                    </div>
                    <div className="bg-green-100 rounded-full p-2">
                      <FiCheck className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              )}

              {/* Service Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services?.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => selectService(service)}
                    className={`relative group cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg ${
                      selectedService && selectedService._id === service._id
                        ? "border-blue-500 bg-blue-50 shadow-lg dark:bg-blue-900/20 dark:border-blue-400"
                        : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-blue-500"
                    }`}
                  >
                    {/* Selection Indicator */}
                    <div className="absolute top-3 right-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          selectedService && selectedService._id === service._id
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-transparent group-hover:bg-blue-200"
                        }`}
                      >
                        <FiCheck className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Service Image */}
                    <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Service Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                        {service.name}
                      </h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          {service.duration} phút
                        </span>
                        <span className="font-bold text-red-600">
                          {formatPrice(service.price)} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {errors.service && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <FiInfo className="w-4 h-4" />
                  {errors.service}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Ghi chú thêm (tùy chọn)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Chia sẻ với chúng tôi về yêu cầu đặc biệt hoặc mong muốn của bạn..."
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder-gray-400 text-gray-700 font-medium resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-500"
                rows={4}
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-500">
                {notes.length}/500 ký tự
              </div>
            </div>

            {/* Booking Summary */}
            {selectedService && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 dark:from-green-900/20 dark:to-blue-900/20 dark:border-green-700">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 dark:text-gray-200">
                  Tóm tắt đặt lịch
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Dịch vụ:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {selectedService.name}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Thời gian:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {selectedService.duration} phút
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Ngày giờ:
                    </span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {date && startTime
                        ? `${date} lúc ${startTime}`
                        : "Chưa chọn"}
                    </span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Tổng cộng:
                      </span>
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(selectedService.price)} VNĐ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !selectedService}
              className={`w-full py-5 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
                isSubmitting || !selectedService
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang xử lý...
                </div>
              ) : (
                "Xác nhận đặt lịch"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingPage;
