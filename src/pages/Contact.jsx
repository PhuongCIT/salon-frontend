import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiCheck,
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";

const Contact = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang liên hệ";
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    subject: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/contact/create",
        formData
      );

      if (res.data.success) {
        toast.success("Đơn ứng tuyển của bạn đã được gửi thành công!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          subject: "",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: "Địa chỉ",
      content: "20 Tăng Nhơn Phú, Phước Long B, Thủ Đức, TP.HCM",
      color: "text-blue-500",
    },
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: "Điện thoại",
      content: "(123) 456-7890",
      color: "text-green-500",
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: "Email",
      content: "salonbooking@example.com",
      color: "text-purple-500",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Giờ làm việc",
      content: "Thứ 2 - Chủ nhật: 8:00 - 20:00",
      color: "text-orange-500",
    },
  ];

  const benefits = [
    {
      icon: <FiUsers className="w-5 h-5" />,
      text: "Môi trường làm việc chuyên nghiệp",
    },
    {
      icon: <FiHeart className="w-5 h-5" />,
      text: "Đội ngũ thân thiện và hỗ trợ",
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      text: "Cơ hội phát triển sự nghiệp",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Liên hệ
            </span>
            <span className="text-gray-800 dark:text-gray-200">
              {" "}
              với chúng tôi
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Hãy kết nối với chúng tôi để khám phá cơ hội nghề nghiệp tuyệt vời
            tại SalonHair
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info & Map */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                <FiMapPin className="w-6 h-6 text-blue-500" />
                Thông tin liên hệ
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`${item.color} flex-shrink-0 p-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-blue-500" />
                  Vị trí salon
                </h3>
              </div>
              <div className="h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.74772999051!2d106.77236797580197!3d10.830607589321476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701bcd651d7%3A0x2de36f6a719c8aa6!2zMjAgVMSDbmcgTmjGoW4gUGjDuSwgUGjGsOG7m2MgTG9uZyBCLCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1749699553296!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-b-2xl"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column - Application Form */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FiUsers className="w-6 h-6" />
                Tại sao chọn chúng tôi?
              </h2>
              <p className="text-blue-100 mb-6">
                Tham gia đội ngũ SalonHair - nơi tài năng được trân trọng và
                phát triển
              </p>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-1 bg-white/20 rounded-full">
                      {benefit.icon}
                    </div>
                    <span className="text-blue-100">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
                <FiMessageSquare className="w-6 h-6 text-purple-500" />
                Đơn ứng tuyển
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Điền thông tin bên dưới để gửi đơn ứng tuyển của bạn
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Họ và tên"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="relative">
                    <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Số điện thoại"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email của bạn"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Subject */}
                <div className="relative">
                  <FiMessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Vị trí ứng tuyển"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Lý do bạn muốn tham gia với chúng tôi..."
                    rows="5"
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none transition-all duration-300"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="w-5 h-5 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Gửi đơn ứng tuyển
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Privacy Notice */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <FiCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục
                    đích tuyển dụng. Chúng tôi sẽ liên hệ với bạn trong vòng 3-5
                    ngày làm việc.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Bạn có câu hỏi khác?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Đừng ngần ngại liên hệ trực tiếp với chúng tôi qua điện thoại hoặc
              email
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:(123) 456-7890"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-colors duration-300"
              >
                <FiPhone className="w-5 h-5" />
                Gọi ngay
              </a>
              <a
                href="mailto:salonbooking@example.com"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-300"
              >
                <FiMail className="w-5 h-5" />
                Gửi email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
