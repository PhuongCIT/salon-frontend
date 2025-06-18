import axios from "axios";
import { BASE_URL } from "../axios/axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

const shiftApi = {
  create: (data) => api.post("/shifts/create", data),
  getAll: () => api.get("/shifts/"),
  delete: (id) => api.delete(`/shifts/delete/${id}`),
};

export default shiftApi;
