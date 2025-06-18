import { useState, useMemo } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdCircle } from "react-icons/md";
import ShiftBadge from "./ShiftBadge";

const MyScheduleCalendar = ({ registrations, onEventClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hoveredDate, setHoveredDate] = useState(null);

  // Hàm xử lý chuyển tháng
  const navigateMonth = (direction) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + (direction === "next" ? 1 : -1),
        1
      )
    );
  };

  // Tối ưu hiệu suất với useMemo
  const { daysInMonth, weekdays } = useMemo(() => {
    const startDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const endDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const days = [];

    // Thêm ngày trống đầu tháng
    for (let i = 0; i < startDate.getDay(); i++) {
      days.push(null);
    }

    // Thêm các ngày trong tháng
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      days.push(new Date(d));
    }

    return {
      daysInMonth: days,
      weekdays: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
    };
  }, [currentMonth]);

  // Render cell cho mỗi ngày
  const renderDayCell = (day) => {
    if (!day) return <div className="h-28 bg-gray-50 dark:bg-gray-700" />;

    const dayRegistrations = registrations.filter(
      (reg) => new Date(reg.date).toDateString() === day.toDateString()
    );
    const isToday = day.toDateString() === new Date().toDateString();
    const isWeekend = [0, 6].includes(day.getDay());

    return (
      <div
        key={day.toISOString()}
        onMouseEnter={() => setHoveredDate(day.toISOString())}
        onMouseLeave={() => setHoveredDate(null)}
        className={`relative border p-2 h-28 flex flex-col transition-all duration-150 ease-in-out
          ${
            isToday
              ? "bg-blue-50/80 border-blue-200 dark:bg-blue-900/30"
              : "bg-white dark:bg-gray-800"
          }
          ${isWeekend ? "bg-gray-50 dark:bg-gray-700/50" : ""}
          ${
            hoveredDate === day.toISOString()
              ? "ring-1 ring-blue-300 z-10 shadow-md"
              : "hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
      >
        {/* Header ngày */}
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center">
            <span
              className={`text-sm font-medium ${
                isToday
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {day.getDate()}
            </span>
            {isToday && (
              <MdCircle className="ml-1 text-blue-500 animate-pulse" size={8} />
            )}
          </div>
          {dayRegistrations.length > 3 && (
            <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded-full">
              +{dayRegistrations.length - 3}
            </span>
          )}
        </div>

        {/* Danh sách sự kiện */}
        <div className="mt-auto space-y-1 overflow-y-auto max-h-20 scrollbar-thin">
          {dayRegistrations.length === 0 ? (
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
              Không có lịch
            </p>
          ) : (
            dayRegistrations.slice(0, 3).map((reg) => (
              <div
                key={reg._id}
                onClick={() => onEventClick?.(reg)}
                className={`flex items-center gap-2 text-xs rounded p-1.5 cursor-pointer transition-colors
                  ${
                    reg.status === "confirmed"
                      ? "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600"
                  } border hover:shadow-md`}
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {reg.startTime}
                </span>
                <ShiftBadge status={reg.status} size="xs" />
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header tháng */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 border-b dark:border-gray-700">
        <button
          onClick={() => navigateMonth("prev")}
          className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors"
          aria-label="Tháng trước"
        >
          <FiChevronLeft
            className="text-gray-600 dark:text-gray-300"
            size={20}
          />
        </button>

        <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-200">
          {currentMonth.toLocaleDateString("vi-VN", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          onClick={() => navigateMonth("next")}
          className="p-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors"
          aria-label="Tháng sau"
        >
          <FiChevronRight
            className="text-gray-600 dark:text-gray-300"
            size={20}
          />
        </button>
      </div>

      {/* Header ngày trong tuần */}
      <div className="grid grid-cols-7 gap-0.5 bg-gray-200 dark:bg-gray-700">
        {weekdays.map((day) => (
          <div
            key={day}
            className="bg-gray-50 dark:bg-gray-700 p-2 text-center text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Lưới ngày */}
      <div className="grid grid-cols-7 gap-0.5 bg-gray-200 dark:bg-gray-700">
        {daysInMonth.map((day, index) => (
          <div key={day ? day.toISOString() : `empty-${index}`}>
            {renderDayCell(day)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyScheduleCalendar;
