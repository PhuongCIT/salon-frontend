import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../services/userService";
import { toast } from "react-toastify";

const ResetPassword = () => {
  //tilte
  useEffect(() => {
    document.title = "SalonHair - Trang cấp lại mật khẩu";
  }, []);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  console.log("token ", token);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!token) {
      toast.error("Token không hợp lệ hoặc đã hết hạn");
      navigate("/login");
    }
  }, [token, navigate]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push("Mật khẩu phải có ít nhất 8 ký tự");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất 1 chữ hoa");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất 1 chữ thường");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất 1 số");
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when typing
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    // Reset errors
    setErrors({});

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setErrors((prev) => ({
        ...prev,
        password: passwordErrors,
      }));
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu xác nhận không khớp",
      }));
      return;
    }

    setIsLoading(true);
    try {
      const response = await resetPassword({
        token,
        newPassword: password,
      });
      console.log("Response ", response);
      if (response.data.success) {
        toast.success("Đặt lại mật khẩu thành công!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Không thể đặt lại mật khẩu. Vui lòng thử lại.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center dark:text-white">
              Đặt lại mật khẩu
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
              Vui lòng nhập mật khẩu mới của bạn
            </p>
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } 
                  rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight 
                  focus:outline-none focus:shadow-outline`}
                id="password"
                type={showPassword.password ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword.password ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.password && Array.isArray(errors.password) && (
              <div className="mt-2">
                {errors.password.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs italic">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Xác nhận mật khẩu
            </label>
            <div className="relative">
              <input
                className={`shadow appearance-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } 
                  rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight 
                  focus:outline-none focus:shadow-outline`}
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu mới"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 my-2 ">
            <p>
              Ít nhất 8 ký tự, Ít nhất 1 chữ hoa, Ít nhất 1 chữ thường, Ít nhất
              1 số, Ít nhất 1 ký tự đặc biệt (!@#$%^&*)
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                focus:outline-none focus:shadow-outline w-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-700 text-center text-sm"
            >
              Quay lại đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
