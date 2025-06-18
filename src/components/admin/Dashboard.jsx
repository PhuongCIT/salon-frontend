/* eslint-disable no-unused-vars */
import React, { useContext, useMemo } from "react";
import { FiUsers, FiScissors, FiCalendar, FiDollarSign } from "react-icons/fi";
import { FaUserTie, FaChartLine } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";

// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components (do this once in your app, maybe in index.js or App.js)
// For this example, I'll put it here, but consider registering globally.
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { services, staffs, customers } = useContext(AppContext);
  const { appointments } = useAuth(); // Assuming appointments is an object { id: appointmentData }

  // Format currency with memoization
  const formatPrice = useMemo(() => {
    return (price) => new Intl.NumberFormat("vi-VN").format(price);
  }, []);

  // Calculate metrics with memoization
  const metrics = useMemo(() => {
    // Convert appointments object to array and filter completed ones
    const completedAppointments = Object.values(appointments || {}).filter(
      (appointment) => appointment.status === "completed"
    );

    const totalRevenue = completedAppointments.reduce(
      (acc, current) => acc + (current.totalPrice || 0), // Handle potential missing totalPrice
      0
    );
    const avgRevenuePerAppointment =
      completedAppointments.length > 0
        ? totalRevenue / completedAppointments.length
        : 0;

    return {
      totalRevenue,
      avgRevenuePerAppointment,
    };
  }, [appointments]); // Depend on appointments object

  // Prepare data for the revenue chart with memoization
  const chartData = useMemo(() => {
    const completedAppointments = Object.values(appointments || {}).filter(
      (appointment) => appointment.status === "completed" && appointment.date // Ensure status is completed and date exists
    );

    // Aggregate revenue by month
    const revenueByMonth = completedAppointments.reduce((acc, appointment) => {
      try {
        // Assuming appointment.date is a string parseable by Date constructor (e.g., ISO 8601, YYYY-MM-DD)
        const date = new Date(appointment.date);
        if (isNaN(date.getTime())) {
          // Check if date is valid
          console.error(
            "Invalid date format for appointment:",
            appointment.date
          );
          return acc; // Skip invalid dates
        }
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`; // Format as MM/YYYY

        if (!acc[monthYear]) {
          acc[monthYear] = 0;
        }
        acc[monthYear] += appointment.totalPrice || 0;
        return acc;
      } catch (error) {
        console.error(
          "Error processing appointment date or price:",
          appointment,
          error
        );
        return acc; // Skip if any error occurs
      }
    }, {});

    // Sort months chronologically
    const sortedMonths = Object.keys(revenueByMonth).sort((a, b) => {
      const [monthA, yearA] = a.split("/").map(Number);
      const [monthB, yearB] = b.split("/").map(Number);
      if (yearA !== yearB) return yearA - yearB;
      return monthA - monthB;
    });

    const labels = sortedMonths;
    const data = sortedMonths.map((month) => revenueByMonth[month]);

    return {
      labels,
      datasets: [
        {
          label: "Doanh thu (VND)",
          data: data,
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.5)",
          tension: 0.1, // Makes the line slightly curved
          fill: false, // Don't fill the area under the line
        },
      ],
    };
  }, [appointments]); // Depend on appointments object

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to fill container height
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false, // Title is already in the h2
        text: "Biểu đồ doanh thu theo tháng",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.raw !== null) {
              label += formatPrice(context.raw) + " VND";
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return formatPrice(value); // Format Y-axis labels
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Thời gian (Tháng/Năm)",
        },
      },
    },
  };

  const stats = [
    {
      id: 1,
      title: "Khách hàng",
      value: (customers || []).length, // Handle potential null/undefined
      icon: FiUsers,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      title: "Nhân viên",
      value: (staffs || []).length, // Handle potential null/undefined
      icon: FaUserTie,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 3,
      title: "Dịch vụ",
      value: (services || []).length, // Handle potential null/undefined
      icon: FiScissors,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 4,
      title: "Cuộc hẹn",
      value: Object.keys(appointments || {}).length, // Handle potential null/undefined
      icon: FiCalendar,
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      id: 5,
      title: "Tổng doanh thu",
      value: `${formatPrice(metrics.totalRevenue)} VND`,
      icon: FiDollarSign,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      id: 6,
      title: "Doanh thu trung bình",
      value: `${formatPrice(metrics.avgRevenuePerAppointment)} VND`,
      icon: FaChartLine,
      color: "text-rose-500",
      bgColor: "bg-rose-100 dark:bg-rose-900/30",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center gap-2">
        <FaChartLine className="text-blue-500" />
        Tổng quan hệ thống
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: stat.id * 0.1 }}
            className={`rounded-xl shadow-sm p-5 ${stat.bgColor}`}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold dark:text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional sections */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Hoạt động gần đây
          </h2>
       
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">
            <p>Dữ liệu hoạt động sẽ hiển thị tại đây</p>
          </div>
        </div> */}

        {/* Revenue Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4 dark:text-white">
            Biểu đồ doanh thu
          </h2>
          <div style={{ height: "300px" }}>
            {" "}
            {/* Set a height for the chart container */}
            {/* Render the chart */}
            {chartData.labels.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                <p>Chưa có dữ liệu doanh thu hoàn thành để hiển thị biểu đồ.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
