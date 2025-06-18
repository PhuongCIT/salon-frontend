import axios from "axios";
import { BASE_URL } from "../axios/axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// Tạo hàm để lấy dữ liệu từ API
const appointmentApi = {
  create: (data) => api.post("/appointments", data),
  getAll: () =>
    api.get("/appointments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  confirmed: (id) => api.put(`/appointments/confirm/${id}`),
  completed: (id) => api.put(`/appointments/complete/${id}`),
  canceled: (id) => api.put(`/appointments/cancel/${id}`),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export default appointmentApi;
