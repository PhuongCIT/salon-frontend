import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative group">
      {/* Switch Container */}
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex items-center
          w-16 h-8 rounded-full
          transition-all duration-500 ease-out
          focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:focus:ring-blue-800/50
          hover:scale-105 active:scale-95
          ${
            isDark
              ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/25"
              : "bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/25"
          }
        `}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div
            className={`
            absolute inset-0 rounded-full
            transition-all duration-500
            ${
              isDark
                ? "bg-gradient-to-r from-slate-800 to-slate-900"
                : "bg-gradient-to-r from-sky-200 to-blue-300"
            }
          `}
          ></div>

          {/* Stars for dark mode */}
          {isDark && (
            <div className="absolute inset-0">
              <div className="absolute top-1.5 left-2 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-2.5 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-100"></div>
              <div className="absolute top-1 left-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-200"></div>
            </div>
          )}

          {/* Clouds for light mode */}
          {!isDark && (
            <div className="absolute inset-0">
              <div className="absolute top-1 left-1 w-2 h-1 bg-white/60 rounded-full"></div>
              <div className="absolute top-2 left-3 w-3 h-1.5 bg-white/40 rounded-full"></div>
              <div className="absolute top-1.5 right-2 w-2 h-1 bg-white/50 rounded-full"></div>
            </div>
          )}
        </div>

        {/* Slider */}
        <div
          className={`
          relative z-10
          w-7 h-7 rounded-full
          bg-white shadow-lg
          transform transition-all duration-500 ease-out
          flex items-center justify-center
          ${isDark ? "translate-x-8" : "translate-x-0.5"}
        `}
        >
          {/* Sun Icon */}
          <Sun
            className={`
              absolute w-4 h-4 text-amber-500
              transition-all duration-300
              ${
                isDark
                  ? "rotate-180 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }
            `}
          />

          {/* Moon Icon */}
          <Moon
            className={`
              absolute w-4 h-4 text-slate-600
              transition-all duration-300
              ${
                isDark
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-180 scale-0 opacity-0"
              }
            `}
          />
        </div>

        {/* Glow Effect */}
        <div
          className={`
          absolute inset-0 rounded-full
          transition-all duration-500
          ${
            isDark
              ? "shadow-lg shadow-blue-500/25"
              : "shadow-lg shadow-amber-500/25"
          }
        `}
        ></div>
      </button>

      {/* Label */}
      <div
        className="
        absolute -bottom-8 left-1/2 transform -translate-x-1/2
        text-xs font-medium text-gray-600 dark:text-gray-400
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        pointer-events-none
        whitespace-nowrap
      "
      >
        {isDark ? "Chế độ tối" : "Chế độ sáng"}
      </div>
    </div>
  );
};

export default ThemeToggle;
