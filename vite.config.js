import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"; // Đã sửa cách import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      template: "treemap",
      open: true,
      gzipSize: true,
    }),
    ViteImageOptimizer({
      // Sử dụng như plugin mặc định
      jpg: { quality: 50 },
      png: { quality: 50 },
      webp: { quality: 50 }, // Thêm hỗ trợ WebP
    }),
  ],
  server: {
    port: 5174,
    host: true, // Mở rộng truy cập từ mạng local
  },
  base: "/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          charts: ["chart.js"], // Thêm recharts nếu dùng
          // antd: ["antd"], // Tách riêng nếu sử dụng Ant Design
        },
      },
    },
    chunkSizeWarningLimit: 800,
    assetsInlineLimit: 4096, // Tự động inline file <4KB
  },
});
