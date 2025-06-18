import React, { useEffect, useState } from "react";
import {
  FiShield,
  FiLock,
  FiEye,
  FiUserCheck,
  FiDatabase,
  FiSettings,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiRefreshCw,
  FiAward,
  FiTool,
  FiHeart,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiFileText,
  FiInfo,
} from "react-icons/fi";
import { FaHandSparkles } from "react-icons/fa";

const PolicyPage = () => {
  //tilte
  useEffect(() => {
    document.title = "SalonHair - Trang chính sách";
  }, []);
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    {
      id: "privacy",
      title: "Chính sách bảo mật",
      icon: <FiShield className="w-5 h-5" />,
      color: "blue",
    },
    {
      id: "warranty",
      title: "Chính sách bảo hành",
      icon: <FiAward className="w-5 h-5" />,
      color: "green",
    },
    {
      id: "service",
      title: "Chính sách dịch vụ",
      icon: <FiHeart className="w-5 h-5" />,
      color: "purple",
    },
  ];

  const getTabColor = (color, isActive) => {
    const colors = {
      blue: isActive
        ? "bg-blue-500 text-white border-blue-500"
        : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
      green: isActive
        ? "bg-green-500 text-white border-green-500"
        : "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
      purple: isActive
        ? "bg-purple-500 text-white border-purple-500"
        : "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
    };
    return colors[color];
  };

  const PrivacyPolicy = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <FiShield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Chính sách bảo mật</h1>
            <p className="text-blue-100">Cam kết bảo vệ thông tin khách hàng</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-blue-100">
            <strong>Cập nhật lần cuối:</strong> 15/06/2025 |
            <strong className="ml-2">Hiệu lực từ:</strong> 01/01/2025
          </p>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-3">
            <FiLock className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Bảo mật dữ liệu</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Sử dụng mã hóa SSL 256-bit để bảo vệ thông tin cá nhân và thanh toán
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-3">
            <FiEye className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Minh bạch</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Thông báo rõ ràng về cách thu thập, sử dụng và chia sẻ dữ liệu
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-3">
            <FiUserCheck className="w-6 h-6 text-blue-500" />
            <h3 className="font-semibold text-gray-800">Quyền kiểm soát</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Khách hàng có quyền truy cập, chỉnh sửa và xóa thông tin cá nhân
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1 */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiDatabase className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              1. Thông tin chúng tôi thu thập
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Thông tin cá nhân
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Họ tên, số điện thoại, email
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Ngày sinh, giới tính (tùy chọn)
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Địa chỉ giao hàng (nếu có)
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Thông tin dịch vụ
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Lịch sử đặt lịch và sử dụng dịch vụ
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Sở thích và yêu cầu đặc biệt
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Phản hồi và đánh giá dịch vụ
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiSettings className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              2. Cách chúng tôi sử dụng thông tin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Cung cấp dịch vụ
                </h4>
                <p className="text-blue-600 text-sm">
                  Xử lý đặt lịch, cung cấp dịch vụ làm tóc và chăm sóc khách
                  hàng
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <h4 className="font-semibold text-green-800 mb-2">
                  Cải thiện chất lượng
                </h4>
                <p className="text-green-600 text-sm">
                  Phân tích phản hồi để nâng cao chất lượng dịch vụ
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-xl">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Marketing
                </h4>
                <p className="text-purple-600 text-sm">
                  Gửi thông tin khuyến mãi và dịch vụ mới (với sự đồng ý)
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-xl">
                <h4 className="font-semibold text-orange-800 mb-2">Bảo mật</h4>
                <p className="text-orange-600 text-sm">
                  Ngăn chặn gian lận và bảo vệ hệ thống
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-4">
            <FiInfo className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-blue-800">
              Liên hệ về bảo mật
            </h3>
          </div>
          <p className="text-blue-700 mb-4">
            Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-blue-600">
              <FiMail className="w-4 h-4" />
              <span>privacy@salonhair.com</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <FiPhone className="w-4 h-4" />
              <span>0900.999.333</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WarrantyPolicy = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <FiAward className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Chính sách bảo hành</h1>
            <p className="text-green-100">Cam kết chất lượng dịch vụ</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-green-100">
            <strong>Thời gian bảo hành:</strong> 5-15 ngày tùy dịch vụ |
            <strong className="ml-2">Áp dụng từ:</strong> 01/01/2025
          </p>
        </div>
      </div>

      {/* Warranty Coverage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
              <FiTool className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Cắt tóc</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Bảo hành: 7 ngày</span>
            </div>
            <p className="text-sm text-gray-600">
              Chỉnh sửa miễn phí nếu không hài lòng về kiểu dáng
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FaHandSparkles className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Nhuộm tóc</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Bảo hành: 10 ngày</span>
            </div>
            <p className="text-sm text-gray-600">
              Chạm màu miễn phí nếu màu phai không đều
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-green-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiRefreshCw className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Uốn tóc</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiClock className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-600">Bảo hành: 15 ngày</span>
            </div>
            <p className="text-sm text-gray-600">
              Làm lại miễn phí nếu tóc không giữ được độ cong
            </p>
          </div>
        </div>
      </div>

      {/* Warranty Terms */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <FiFileText className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Điều kiện bảo hành
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <FiCheckCircle className="w-5 h-5" />
              Được bảo hành khi:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Dịch vụ không đạt chất lượng cam kết
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Lỗi kỹ thuật từ phía salon
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Có hóa đơn và trong thời hạn bảo hành
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Tuân thủ hướng dẫn chăm sóc sau dịch vụ
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
              <FiAlertCircle className="w-5 h-5" />
              Không bảo hành khi:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Tự ý thay đổi kiểu tóc tại nhà
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Sử dụng sản phẩm không phù hợp
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <span className="text-gray-600">
                  Hư hỏng do tác động bên ngoài
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <span className="text-gray-600">Quá thời hạn bảo hành</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Warranty Process */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-6">
          Quy trình bảo hành
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              1
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Liên hệ</h4>
            <p className="text-sm text-green-600">
              Gọi hotline hoặc đến trực tiếp salon
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              2
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Kiểm tra</h4>
            <p className="text-sm text-green-600">
              Stylist kiểm tra và xác nhận vấn đề
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              3
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Xử lý</h4>
            <p className="text-sm text-green-600">
              Thực hiện dịch vụ bảo hành miễn phí
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
              4
            </div>
            <h4 className="font-semibold text-green-800 mb-2">Hoàn thành</h4>
            <p className="text-sm text-green-600">
              Khách hàng hài lòng với kết quả
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const ServicePolicy = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <FiHeart className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Chính sách dịch vụ</h1>
            <p className="text-purple-100">Quy định sử dụng dịch vụ salon</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-4">
          <p className="text-purple-100">
            <strong>Áp dụng cho:</strong> Tất cả dịch vụ tại SalonHair |
            <strong className="ml-2">Cập nhật:</strong> 15/06/2025
          </p>
        </div>
      </div>

      {/* Service Rules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Đặt lịch & Hủy lịch
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="font-semibold text-purple-800 mb-3">Đặt lịch</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Đặt lịch trước ít nhất 2 giờ
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Xác nhận qua SMS hoặc email
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  Có thể đặt lịch 24/7 qua website
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="font-semibold text-red-800 mb-3">Hủy lịch</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 text-orange-500" />
                  Hủy lịch trước 4 giờ: Miễn phí
                </li>
                <li className="flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 text-orange-500" />
                  Hủy lịch trong 4 giờ: Phí 50k
                </li>
                <li className="flex items-center gap-2">
                  <FiAlertCircle className="w-4 h-4 text-red-500" />
                  No-show: Phí 100k
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Thanh toán</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-semibold text-purple-800 mb-3">
                Phương thức thanh toán
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Tiền mặt</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Thẻ ngân hàng</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Chuyển khoản</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Ví điện tử</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-semibold text-green-800 mb-3">
                Chính sách hoàn tiền
              </h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Hoàn 100% nếu hủy trước 24h</li>
                <li>• Hoàn 50% nếu hủy trước 4h</li>
                <li>• Không hoàn tiền nếu đã thực hiện dịch vụ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Rights */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FiUsers className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Quyền lợi khách hàng
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 text-white rounded-lg">
                <FiCheckCircle className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-blue-800">
                Chất lượng dịch vụ
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-blue-700">
              <li>• Được tư vấn miễn phí trước khi làm</li>
              <li>• Stylist có chứng chỉ chuyên môn</li>
              <li>• Sử dụng sản phẩm chính hãng</li>
              <li>• Đảm bảo vệ sinh an toàn</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500 text-white rounded-lg">
                <FiHeart className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-green-800">
                Chăm sóc khách hàng
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-green-700">
              <li>• Hỗ trợ 24/7 qua hotline</li>
              <li>• Theo dõi hài lòng sau dịch vụ</li>
              <li>• Xử lý khiếu nại trong 24h</li>
              <li>• Chương trình khách hàng thân thiết</li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500 text-white rounded-lg">
                <FiShield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-purple-800">
                Bảo vệ quyền lợi
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-purple-700">
              <li>• Bảo mật thông tin cá nhân</li>
              <li>• Minh bạch về giá cả</li>
              <li>• Không phát sinh chi phí ẩn</li>
              <li>• Quyền khiếu nại và bồi thường</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Standards */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FaHandSparkles className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Tiêu chuẩn dịch vụ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Quy trình dịch vụ chuẩn
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">
                    Tiếp đón & tư vấn
                  </h4>
                  <p className="text-sm text-gray-600">
                    Chào đón, tư vấn kiểu tóc phù hợp
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Chuẩn bị</h4>
                  <p className="text-sm text-gray-600">
                    Gội đầu, chuẩn bị dụng cụ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Thực hiện</h4>
                  <p className="text-sm text-gray-600">
                    Cắt/nhuộm/uốn theo yêu cầu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Hoàn thiện</h4>
                  <p className="text-sm text-gray-600">
                    Tạo kiểu, hướng dẫn chăm sóc
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">
              Cam kết chất lượng
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <FiClock className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-800">
                    Đúng giờ hẹn
                  </span>
                </div>
                <p className="text-sm text-green-600">
                  Không để khách hàng chờ đợi quá 15 phút
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">
                    Chất lượng cao
                  </span>
                </div>
                <p className="text-sm text-blue-600">
                  Đảm bảo kết quả như mong đợi của khách hàng
                </p>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <FiHeart className="w-4 h-4 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    Dịch vụ tận tâm
                  </span>
                </div>
                <p className="text-sm text-purple-600">
                  Chăm sóc chu đáo, tư vấn chuyên nghiệp
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8 border border-purple-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-purple-800 mb-2">
            Cần hỗ trợ?
          </h3>
          <p className="text-purple-600">
            Liên hệ với chúng tôi để được giải đáp mọi thắc mắc về dịch vụ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <FiPhone className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Hotline</p>
              <p className="text-sm text-purple-600">0900.999.333</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <FiMail className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Email</p>
              <p className="text-sm text-purple-600">support@salonhair.com</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-lg shadow-sm">
            <FiMapPin className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-800">Địa chỉ</p>
              <p className="text-sm text-purple-600">
                20 Tăng Nhơn Phú, Thủ Đức
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
              Chính sách
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {" "}
              & Quy định
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tìm hiểu về các chính sách và quy định của SalonHair để có trải
            nghiệm dịch vụ tốt nhất
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium border-2 transition-all duration-300 ${getTabColor(
                tab.color,
                activeTab === tab.id
              )}`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="transition-all duration-500 ease-in-out">
          {activeTab === "privacy" && <PrivacyPolicy />}
          {activeTab === "warranty" && <WarrantyPolicy />}
          {activeTab === "service" && <ServicePolicy />}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 p-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiInfo className="w-6 h-6 text-blue-500" />
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Còn thắc mắc?
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Nếu bạn cần thêm thông tin về các chính sách hoặc có câu hỏi cụ
              thể, đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ
              trợ bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:0900999333"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiPhone className="w-5 h-5" />
                Gọi ngay: 0900.999.333
              </a>
              <a
                href="mailto:support@salonhair.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FiMail className="w-5 h-5" />
                Gửi email hỗ trợ
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiFileText className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Điều khoản sử dụng
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Quy định chung về việc sử dụng dịch vụ
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Xem chi tiết →
            </a>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Hướng dẫn đặt lịch
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Cách đặt lịch và sử dụng dịch vụ
            </p>
            <a
              href="#"
              className="text-green-600 hover:text-green-700 font-medium text-sm"
            >
              Xem hướng dẫn →
            </a>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 text-center hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FiHeart className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">
              Chăm sóc khách hàng
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Các dịch vụ hỗ trợ và chăm sóc
            </p>
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              Liên hệ ngay →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
