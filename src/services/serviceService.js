import axios from "axios";
import { BASE_URL } from "../axios/axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const serviceApi = {
  create: (serviceData) =>
    api.post("/services", serviceData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  getAll: () => api.get("/services"),

  // Có thể bổ sung thêm các method sau:
  getById: (id) => api.get(`/services/${id}`),
  update: (serviceId, updates) =>
    api.put(`/services/${serviceId}`, updates, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  delete: (id) =>
    api.delete(`/service/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  // search: (keyword) => api.get("/services/search", { params: { q: keyword } }),
};

export default serviceApi;
