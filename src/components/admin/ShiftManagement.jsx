/* eslint-disable no-unused-vars */
import React, { useContext, useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Thêm AnimatePresence
import {
  FiTrash2,
  FiEdit,
  FiPlus,
  FiClock,
  FiUserCheck,
  FiCalendar, // Biểu tượng mới cho lịch sử
  FiLoader, // Biểu tượng loading
} from "react-icons/fi";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Import các context và service cần thiết
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import shiftApi from "../../services/shiftService";

// Import các components con
import CreateShiftModal from "./shift/CreateShiftModal";
import CreateStaffShift from "./shift/CreateStaffShift"; // Tên component này có vẻ hơi lạ cho chức năng "Đăng ký ca", có thể cân nhắc đổi tên cho rõ nghĩa hơn (ví dụ: RegisterShiftModal)
import ApprovalTable from "./shift/ApprovalTable";

// Component Loading Spinner đơn giản
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-4">
    <FiLoader className="animate-spin text-blue-500 text-2xl" />
  </div>
);

const ShiftManagement = () => {
  // Sử dụng context để lấy dữ liệu và hàm fetch
  const {
    shifts,
    getAllShifts,
    loading: shiftsLoading,
  } = useContext(AppContext); // Giả định AppContext có state loading cho shifts
  const { workShifts, loading: workShiftsLoading } = useAuth(); // Giả định AuthContext có state loading cho workShifts

  // State quản lý modals
  const [isCreateShiftModalOpen, setIsCreateShiftModalOpen] = useState(false);
  const [isRegisterShiftModalOpen, setIsRegisterShiftModalOpen] =
    useState(false);
  const [selectedShiftId, setSelectedShiftId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // State cho trạng thái xóa

  // State và logic phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Tính toán dữ liệu cho phân trang
  const pageCount = Math.ceil(shifts.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentShifts = shifts.slice(offset, offset + itemsPerPage);

  // Xử lý khi chuyển trang
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Memoize dữ liệu đăng ký chờ duyệt và đã duyệt
  const pendingRegistrations = useMemo(
    () => workShifts.filter((r) => r.status === "pending"),
    [workShifts]
  );

  const approvedRegistrations = useMemo(
    () => workShifts.filter((r) => r.status !== "pending"),
    [workShifts]
  );

  // Fetch shifts khi component mount
  useEffect(() => {
    // Có thể gọi getAllShifts ở đây nếu nó chưa được gọi ở cấp cao hơn
    // hoặc đảm bảo rằng workShifts cũng được fetch khi cần
  }, []); // Dependency array rỗng để chỉ chạy 1 lần khi mount

  // Xử lý xóa ca làm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ca làm này?")) {
      setIsDeleting(true); // Bắt đầu trạng thái xóa
      try {
        await shiftApi.delete(id);
        toast.success("Xóa ca làm thành công!");
        getAllShifts(); // Refresh danh sách ca làm
      } catch (error) {
        console.error("Lỗi khi xóa ca làm:", error);
        toast.error(
          "Xóa ca làm thất bại. Vui lòng thử lại! (" +
            (error.response?.data?.message || error.message) +
            ")"
        );
      } finally {
        setIsDeleting(false); // Kết thúc trạng thái xóa
      }
    }
  };

  // Mở modal đăng ký ca cho một ca cụ thể
  const handleOpenRegisterShiftModal = (id) => {
    setSelectedShiftId(id);
    setIsRegisterShiftModalOpen(true);
  };

  // Định dạng ngày tháng
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "EEEE, dd/MM/yyyy", { locale: vi });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Ngày không hợp lệ";
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <FiClock className="text-blue-600 dark:text-blue-400 text-3xl" />
            Quản lý ca làm việc
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Quản lý và xem các ca làm việc đã tạo cùng lịch sử đăng ký của bạn.
          </p>
        </div>

        {/* Nút Tạo ca mới */}
        <button
          onClick={() => setIsCreateShiftModalOpen(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          <FiPlus className="mr-2" />
          <span>Tạo ca mới</span>
        </button>
      </div>

      {/* Modals */}
      {/* Modal Tạo ca mới */}
      <CreateShiftModal
        isOpen={isCreateShiftModalOpen}
        onClose={() => setIsCreateShiftModalOpen(false)}
        onSuccess={() => {
          getAllShifts(); // Refresh danh sách sau khi tạo thành công
          toast.success("Tạo ca làm mới thành công!");
        }}
      />

      {/* Modal Đăng ký ca */}
      {/* Tên component CreateStaffShift có thể cần đổi tên cho rõ nghĩa */}
      <CreateStaffShift
        isOpen={isRegisterShiftModalOpen}
        shiftId={selectedShiftId}
        onClose={() => setIsRegisterShiftModalOpen(false)}
        onSuccess={() => {
          // Có thể cần refresh workShifts ở đây nếu API đăng ký không tự trigger refresh
          toast.success("Đăng ký ca làm thành công!");
        }}
      />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - Registrations & Approvals */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Pending Approvals Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                <FiUserCheck className="text-yellow-500 text-2xl" />
                Yêu cầu đăng ký chờ duyệt
                <span className="ml-2 inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900/30 dark:text-yellow-200">
                  {pendingRegistrations.length}
                </span>
              </h2>
            </div>
            <div className="p-5">
              {workShiftsLoading ? (
                <LoadingSpinner />
              ) : pendingRegistrations.length > 0 ? (
                <ApprovalTable registrations={pendingRegistrations} />
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FiUserCheck className="text-4xl mb-3 mx-auto opacity-60" />
                  <p>Không có yêu cầu chờ duyệt nào.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Approved Registrations History Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
                <FiCalendar className="text-green-500 text-2xl" />
                Lịch sử đăng ký của tôi
              </h2>
            </div>
            <div className="p-5">
              {workShiftsLoading ? (
                <LoadingSpinner />
              ) : approvedRegistrations.length > 0 ? (
                <ApprovalTable registrations={approvedRegistrations} />
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FiCalendar className="text-4xl mb-3 mx-auto opacity-60" />
                  <p>Bạn chưa đăng ký ca làm nào.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Right Side - All Shifts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col" // Sử dụng flex-col để push pagination xuống dưới
        >
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-3">
              <FiClock className="text-indigo-500 text-2xl" />
              Tất cả ca làm
            </h2>
          </div>

          {shiftsLoading ? (
            <LoadingSpinner />
          ) : shifts.length === 0 ? (
            <div className="p-6 text-center flex-grow flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
              <FiClock className="text-5xl mb-4 opacity-60" />
              <p className="text-lg font-medium">
                Chưa có ca làm nào được tạo.
              </p>
              <p className="mt-2 text-sm">Hãy tạo ca làm đầu tiên của bạn!</p>
            </div>
          ) : (
            <div className="overflow-x-auto flex-grow">
              {" "}
              {/* flex-grow để bảng chiếm hết không gian còn lại */}
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ca làm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Ngày
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <AnimatePresence>
                  {" "}
                  {/* Dùng AnimatePresence cho animation khi item bị xóa */}
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {currentShifts.map((shift) => (
                      <motion.tr
                        key={shift._id}
                        layout // Kích hoạt layout animation khi item bị xóa
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }} // Animation khi item bị xóa
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {shift.shiftType || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(shift.date)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {shift.max ?? "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            {/* Nút Đăng ký ca */}
                            <button
                              onClick={() =>
                                handleOpenRegisterShiftModal(shift._id)
                              }
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-150 ease-in-out"
                              title="Đăng ký ca"
                              aria-label="Đăng ký ca"
                            >
                              <FiEdit className="text-lg" />
                            </button>
                            {/* Nút Xóa ca */}
                            <button
                              onClick={() => handleDelete(shift._id)}
                              disabled={isDeleting} // Disable nút khi đang xóa
                              className={`text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150 ease-in-out ${
                                isDeleting
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              title="Xóa ca"
                              aria-label="Xóa ca"
                            >
                              {isDeleting ? (
                                <FiLoader className="animate-spin text-lg" />
                              ) : (
                                <FiTrash2 className="text-lg" />
                              )}
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </AnimatePresence>
              </table>
            </div>
          )}

          {/* Pagination */}
          {shifts.length > 0 && pageCount > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Thông tin số lượng */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Hiển thị{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {offset + 1}
                </span>{" "}
                đến{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {Math.min(offset + itemsPerPage, shifts.length)}
                </span>{" "}
                trong tổng số{" "}
                <span className="font-semibold text-gray-800 dark:text-white">
                  {shifts.length}
                </span>{" "}
                ca làm
              </div>

              {/* Các nút phân trang */}
              <div className="flex items-center gap-1">
                {/* Nút Previous */}
                <button
                  onClick={() => handlePageClick({ selected: currentPage - 1 })}
                  disabled={currentPage === 0}
                  className={`p-2 rounded-md transition-colors duration-150 ease-in-out ${
                    currentPage === 0
                      ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
                      : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Trang trước"
                >
                  ←
                </button>

                {/* Các nút số trang */}
                {/* Logic hiển thị 5 nút trang xung quanh trang hiện tại */}
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

                  // Đảm bảo số trang hợp lệ
                  if (pageNumber < 0 || pageNumber >= pageCount) return null;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageClick({ selected: pageNumber })}
                      className={`w-10 h-10 rounded-md flex items-center justify-center text-sm font-medium transition-colors duration-150 ease-in-out ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white shadow-sm dark:bg-blue-700"
                          : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                      }`}
                      aria-current={
                        currentPage === pageNumber ? "page" : undefined
                      }
                      aria-label={`Trang ${pageNumber + 1}`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                })}

                {/* Nút Next */}
                <button
                  onClick={() => handlePageClick({ selected: currentPage + 1 })}
                  disabled={currentPage >= pageCount - 1}
                  className={`p-2 rounded-md transition-colors duration-150 ease-in-out ${
                    currentPage >= pageCount - 1
                      ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
                      : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  aria-label="Trang sau"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ShiftManagement;
