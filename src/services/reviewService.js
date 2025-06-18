import axios from "axios";
import { BASE_URL } from "../axios/axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const reviewApi = {
  // Tạo hàm để lấy danh sách đánh giá
  getReviews: async () => api.get("/reviews"),
  // Tạo hàm để thêm đánh giá
  addReview: async (data) =>
    api.post("/reviews", data, {
      headers: {
        "Content-Type": "application/json",
      },
    }),
};

export default reviewApi;
