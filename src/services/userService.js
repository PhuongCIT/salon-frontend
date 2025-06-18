import axios from "axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const userApi = {
  create: (userData) => api.post("/user/create", userData),
  getAllStaffs: () => api.get("/staffs"),
  getAllCustomers: () => api.get("/customers"),
  getUserById: (id) => api.get(`/user/${id}`),
  updateStaff: (id, data) => api.patch(`/staff/${id}`, data),
  deleteStaff: (id) => api.delete(`/staff/${id}`),
};

export const forgotPassword = async (email) => {
  const res = api.post("/auth/forgot-password", email, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log("Login API response:", res); // In toàn bộ phản hồi để kiểm tra
  return res; // Trả về dữ liệu từ phản hồi
};
export const resetPassword = async (data) => {
  const res = api.post("/auth/reset-password", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log("Login API response:", res); // In toàn bộ phản hồi để kiểm tra
  return res; // Trả về dữ liệu từ phản hồi
};

export default userApi;
