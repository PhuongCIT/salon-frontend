import React, { useEffect } from "react";
import SalonTeam from "../assets/images/SalonBanner.jpg";
import {
  FaScissors,
  FaBrush,
  FaAward,
  FaHeart,
  FaStar,
  FaUsers,
  FaCrown,
  FaGem,
} from "react-icons/fa6";
import {
  FiArrowRight,
  FiCheck,
  FiTrendingUp,
  FiCalendar,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const About = () => {
  useEffect(() => {
    document.title = "SalonHair - Trang giới thiệu";
  }, []);

  const navigate = useNavigate();

  const achievements = [
    {
      icon: <FaAward className="text-yellow-500" size={30} />,
      text: "Top 5 Salon tiêu chuẩn quốc tế 2024",
      year: "2024",
    },
    {
      icon: <FaCrown className="text-purple-500" size={30} />,
      text: "Giải thưởng Xuất sắc về Dịch vụ 2023",
      year: "2023",
    },
    {
      icon: <FaGem className="text-blue-500" size={30} />,
      text: "Đối tác chính thức của L'Oréal Professionnel",
      year: "2022",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Khách hàng hài lòng", icon: <FaUsers /> },
    { number: "5+", label: "Năm kinh nghiệm", icon: <FaStar /> },
    { number: "15+", label: "Stylist chuyên nghiệp", icon: <FaScissors /> },
    { number: "98%", label: "Tỷ lệ hài lòng", icon: <FaHeart /> },
  ];

  const values = [
    {
      icon: (
        <FaScissors
          className="text-indigo-500 dark:text-indigo-400"
          size={48}
        />
      ),
      title: "Tận tâm",
      desc: "Mỗi khách hàng đều nhận được sự chăm sóc tỉ mỉ từ khâu tư vấn đến hoàn thiện kiểu tóc",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      icon: (
        <FaBrush className="text-purple-500 dark:text-purple-400" size={48} />
      ),
      title: "Tinh tế",
      desc: "Phong cách làm đẹp cân bằng giữa xu hướng và cá tính riêng của từng người",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: <FaHeart className="text-red-500 dark:text-red-400" size={48} />,
      title: "Tin cậy",
      desc: "Cam kết sử dụng sản phẩm an toàn và kỹ thuật không xâm lấn",
      gradient: "from-red-500 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Về SalonHair
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Nơi nghệ thuật làm tóc gặp gỡ công nghệ hiện đại, tạo nên những
              trải nghiệm làm đẹp đẳng cấp
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-indigo-500 dark:text-indigo-400 text-2xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Introduction */}
        <section className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2 relative">
                <img
                  src={SalonTeam}
                  alt="Đội ngũ SalonHair"
                  className="w-full h-full object-cover min-h-[400px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20"></div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                  Câu chuyện của chúng tôi
                </h2>

                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p className="text-lg leading-relaxed">
                    Thành lập năm{" "}
                    <strong className="text-indigo-600">2020</strong>,
                    <strong className="text-indigo-600"> SalonHair</strong> tự
                    hào là điểm đến uy tín cho những ai đam mê cái đẹp. Chúng
                    tôi không chỉ tạo kiểu tóc mà còn kiến tạo phong cách sống.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Với đội ngũ{" "}
                    <em className="text-purple-600 font-medium">
                      stylist giàu kinh nghiệm
                    </em>{" "}
                    cùng các sản phẩm chăm sóc tóc cao cấp, mỗi khách hàng đến
                    với SalonHair đều nhận được trải nghiệm như một nghệ sĩ.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 rounded-2xl border-l-4 border-indigo-600 mt-6">
                  <p className="italic text-indigo-800 dark:text-indigo-300 text-lg font-medium">
                    "Sứ mệnh của chúng tôi: Biến mỗi mái tóc thành tác phẩm nghệ
                    thuật, mỗi lần ghé thăm là một trải nghiệm thư giãn đáng
                    nhớ"
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-6">
                  <span className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-green-900/30 dark:text-green-400">
                    <FiCheck className="w-4 h-4" />
                    Chất lượng cao
                  </span>
                  <span className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-blue-900/30 dark:text-blue-400">
                    <FiCheck className="w-4 h-4" />
                    Dịch vụ tận tâm
                  </span>
                  <span className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium dark:bg-purple-900/30 dark:text-purple-400">
                    <FiCheck className="w-4 h-4" />
                    Xu hướng mới nhất
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Triết lý{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                3T
              </span>{" "}
              của chúng tôi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Ba giá trị cốt lõi định hình nên chất lượng dịch vụ đẳng cấp tại
              SalonHair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Thành tựu nổi bật
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Những dấu mốc quan trọng trong hành trình phát triển của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">
                    Ghé thăm salon của chúng tôi
                  </h3>
                  <p className="text-indigo-100 text-lg mb-6">
                    Trải nghiệm không gian hiện đại và dịch vụ chuyên nghiệp tại
                    SalonHair
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FiMapPin className="w-5 h-5 text-indigo-200" />
                      <span className="text-indigo-100">
                        20 Tăng Nhơn Phú Phước Long B, Thủ Đức TP. Hồ Chí Minh,
                        Việt Nam
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiPhone className="w-5 h-5 text-indigo-200" />
                      <span className="text-indigo-100">0123 456 789</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FiCalendar className="w-5 h-5 text-indigo-200" />
                      <span className="text-indigo-100">
                        Thứ 2 - Chủ nhật: 9:00 - 21:00
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-center lg:text-right">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
                    <FiTrendingUp className="w-5 h-5" />
                    <span className="font-medium">
                      Đặt lịch online tiện lợi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Sẵn sàng thay đổi diện mạo?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Hãy để SalonHair đồng hành cùng bạn trên hành trình khám phá vẻ
              đẹp tiềm ẩn. Đặt lịch ngay hôm nay để nhận ưu đãi đặc biệt!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  navigate("/booking");
                  scrollTo(0, 0);
                }}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FiCalendar className="w-5 h-5" />
                Đặt lịch ngay
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/services")}
                className="border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-8 py-4 rounded-full font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-300"
              >
                Xem dịch vụ
              </button>
            </div>

            <div className="flex justify-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FiCheck className="w-4 h-4 text-green-500" />
                Tư vấn miễn phí
              </span>
              <span className="flex items-center gap-1">
                <FiCheck className="w-4 h-4 text-green-500" />
                Đặt lịch linh hoạt
              </span>
              <span className="flex items-center gap-1">
                <FiCheck className="w-4 h-4 text-green-500" />
                Chất lượng đảm bảo
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
