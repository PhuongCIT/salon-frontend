import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/userService";
import { toast } from "react-toastify";
import { FiMail, FiArrowLeft, FiSend } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const ForgotPassword = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang quên mật khẩu";
  }, []);
  const [resetEmail, setResetEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await forgotPassword({ email: resetEmail });
      if (response.data.success) {
        toast.success(response.data.message);
        setResetEmail("");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Không thể gửi email đặt lại mật khẩu. Vui lòng thử lại sau!"
      );
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
              <FiMail className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Đặt lại mật khẩu
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Nhập địa chỉ email đã đăng ký để nhận liên kết đặt lại mật khẩu
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Địa chỉ email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    Gửi liên kết đặt lại <FiSend className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FiArrowLeft className="mr-1" />
              Quay lại trang đăng nhập
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Nếu không nhận được email? Kiểm tra thư mục spam hoặc{" "}
            <button
              type="button"
              onClick={() => toast.info("Vui lòng liên hệ bộ phận hỗ trợ")}
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              liên hệ hỗ trợ
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
