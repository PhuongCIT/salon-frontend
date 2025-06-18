/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FiTrash2,
  FiMail,
  FiUser,
  FiClock,
  FiAlertCircle,
} from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import contactApi from "../../services/contactService";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const ContactManagement = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await contactApi.getAll();
      const data = response.data?.data || [];
      setContacts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Không thể tải danh sách liên hệ. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
      try {
        await contactApi.delete(id);
        fetchContacts();
      } catch (err) {
        console.error("Error deleting contact:", err);
        setError("Xóa liên hệ thất bại. Vui lòng thử lại.");
      }
    }
  };

  const markAsRead = async (id) => {
    try {
      await contactApi.markAsRead(id);
      fetchContacts();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "HH:mm dd/MM/yyyy", { locale: vi });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <div className="flex items-center gap-2 text-red-500 mb-4">
          <FiAlertCircle className="text-xl" />
          <span>{error}</span>
        </div>
        <button
          onClick={fetchContacts}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
            <FiMail className="text-blue-500" />
            Quản lý liên hệ
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng số: {contacts.length} liên hệ
          </p>
        </div>

        {contacts.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <FiMail className="mx-auto text-4xl mb-2 opacity-50" />
            <p>Không có liên hệ nào</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                  !contact.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          !contact.isRead ? "bg-blue-500" : "bg-transparent"
                        }`}
                      ></div>
                      <h3 className="font-medium flex items-center gap-2 dark:text-white">
                        <FiUser className="text-gray-400" />
                        {contact.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        &lt;{contact.email}&gt;
                      </span>
                    </div>

                    <div className="pl-5">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                        {contact.subject}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                        {contact.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FiClock className="text-xs" />
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:flex-col md:items-end">
                    <button
                      onClick={() => markAsRead(contact._id)}
                      className={`p-2 rounded-full ${
                        contact.isRead
                          ? "text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                          : "text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                      }`}
                      title={
                        contact.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"
                      }
                    >
                      <FaCheckCircle />
                    </button>

                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-full transition-colors"
                      title="Xóa liên hệ"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactManagement;
