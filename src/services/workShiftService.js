import axios from "axios";
import { BASE_URL } from "../axios/axios";

// Tạo instance của axios với baseURL của API
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});
const workShiftApi = {
  register: (data) => api.post("/workshifts/register", data),
  getAll: () =>
    api.get("/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }),
  approve: (id) => api.put(`/workshifts/${id}`),
  adminCreate: (data) => api.post("/workshifts/create", data),
};

export default workShiftApi;
