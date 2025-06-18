/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiClock,
  FiDollarSign,
} from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import ServiceAdd from "./service/ServiceAdd";
import ServiceEdit from "./service/ServiceEdit";
import serviceApi from "../../services/serviceService";

const ServiceManagement = () => {
  const {
    getAllServices,
    services,
    formatPrice,
    errorService,
    loadingService,
  } = useContext(AppContext);

  const [openAdd, setOpenAdd] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  // Pagination logic
  const pageCount = Math.ceil(services.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentServices = services.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => setCurrentPage(selected);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours} giờ ` : ""}${
      mins > 0 ? `${mins} phút` : ""
    }`;
  };

  const handleEdit = (id) => {
    setServiceId(id);
    setEditModalOpen(true);
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Bạn có chắc muốn xóa dịch vụ này?")) {
      try {
        await serviceApi.delete(_id);
        toast.success("Xóa dịch vụ thành công!");
        getAllServices();
      } catch (error) {
        console.error("Lỗi khi xóa dịch vụ:", error);
        toast.error("Xóa dịch vụ thất bại. Vui lòng thử lại!");
      }
    }
  };

  if (loadingService) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-xl animate-pulse">
          Đang tải danh sách dịch vụ...
        </div>
      </div>
    );
  }

  if (errorService) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-red-600 mb-4">{errorService}</div>
        <button
          onClick={getAllServices}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
            Quản lý dịch vụ
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng số: {services.length} dịch vụ
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FiPlus />
          <span>Thêm dịch vụ</span>
        </button>
      </div>

      {/* Modals */}
      <ServiceAdd
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={() => {
          getAllServices();
          toast.success("Thêm dịch vụ mới thành công!");
        }}
      />

      <ServiceEdit
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={() => {
          getAllServices();
          toast.success("Cập nhật dịch vụ thành công!");
        }}
        serviceId={serviceId}
      />

      {/* Services Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Tên dịch vụ
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Mô tả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <FiDollarSign className="opacity-70" />
                  Giá
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-1">
                  <FiClock className="opacity-70" />
                  Thời gian
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {currentServices.length > 0 ? (
              currentServices.map((service, index) => (
                <motion.tr
                  key={service._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {offset + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "/default-service.png";
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                      {service.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatPrice(service.price)} VNĐ
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {formatDuration(service.duration)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleEdit(service._id)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                        title="Xóa"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
                    <FiPlus className="text-4xl mb-2 opacity-50" />
                    <p>Chưa có dịch vụ nào</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {services.length > itemsPerPage && (
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Hiển thị <span className="font-medium">{offset + 1}</span> -{" "}
            <span className="font-medium">
              {Math.min(offset + itemsPerPage, services.length)}
            </span>{" "}
            trong tổng số <span className="font-medium">{services.length}</span>{" "}
            dịch vụ
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

export default ServiceManagement;
