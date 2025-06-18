import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiArrowRight,
  FiSend,
} from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <FaFacebook className="w-5 h-5" />,
      url: "https://www.facebook.com/vandphuong0105/",
      name: "Facebook",
      color: "hover:text-blue-500",
    },
    {
      icon: <FaInstagram className="w-5 h-5" />,
      url: "https://www.instagram.com/v_puo.0_o/",
      name: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: <FaTwitter className="w-5 h-5" />,
      url: "#",
      name: "Twitter",
      color: "hover:text-blue-400",
    },
    {
      icon: <FaYoutube className="w-5 h-5" />,
      url: "#",
      name: "YouTube",
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Dịch vụ", href: "/services" },
    { name: "Đặt lịch", href: "/booking" },
    { name: "Liên hệ", href: "/contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-16 flex justify-between">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-4">
                  Salon
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Hair
                  </span>
                </h1>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Salon làm tóc chuyên nghiệp với phong cách hiện đại, mang đến
                  trải nghiệm làm đẹp đẳng cấp cho mọi khách hàng.
                </p>

                {/* Opening Hours */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="w-5 h-5 text-blue-400" />
                    <span className="font-semibold text-blue-400">
                      Giờ mở cửa
                    </span>
                  </div>
                  <p className="text-gray-300">
                    <span className="text-green-400 font-medium">
                      8:00 - 20:00
                    </span>
                    <br />
                    Thứ Hai - Chủ Nhật
                  </p>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">
                    Kết nối với chúng tôi
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-gray-800 rounded-xl ${social.color} hover:scale-110 transition-all duration-300 hover:shadow-lg`}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Liên kết nhanh
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Thông tin liên hệ
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 group">
                  <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                    <FiMapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-300 leading-relaxed">
                      20 Tăng Nhơn Phú, Phước Long B, Thủ Đức, TP. Hồ Chí Minh,
                      Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-green-500/20 rounded-lg group-hover:bg-green-500/30 transition-colors duration-300">
                    <FiPhone className="w-5 h-5 text-green-400" />
                  </div>
                  <a
                    href="tel:0900999333"
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    0900.999.333
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors duration-300">
                    <FiMail className="w-5 h-5 text-purple-400" />
                  </div>
                  <a
                    href="mailto:salonhair@salon.com"
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300"
                  >
                    salonhair@salon.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span>© 2025 SalonHair. Được tạo với</span>
                <FaHeart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>tại Việt Nam</span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="/policy-page"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Chính sách bảo mật
                </a>
                <a
                  href="/policy-page"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Điều khoản sử dụng
                </a>
                <a
                  href="/policy-page"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
