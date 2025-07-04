// File: authContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import appointmentApi from "../services/appointmentsService";
import workShiftApi from "../services/workShiftService";
import { BASE_URL } from "../axios/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  // const  [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [workShifts, setWorkShift] = useState([]);

  const baseURL = `${BASE_URL}/api`;

  //   // Đăng nhập
  const login = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
        // toast.success(`${res.data.user.role} đăng nhập thành công`);
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    axios.defaults.headers.common["Authorization"] = null;
  };

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : null;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, [token]);

  const loadUserProfileData = async () => {
    try {
      const res = await axios.get(`${baseURL}/auth/profile`);

      // console.log("resData", res.data);
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const res = await axios.get(`${baseURL}/appointments`);
      console.log("getAllAppointments", res.data.data.appointments);
      if (res.data.success) {
        setAppointments(res.data.data.appointments.reverse());
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const confirmAppointment = async (id) => {
    const { data } = await appointmentApi.confirmed(id);
    if (data.success) {
      toast.success(data.message);
      getAllAppointments();
    } else {
      toast.error(data.message);
    }
  };
  const completeAppointment = async (id) => {
    const { data } = await appointmentApi.completed(id);
    if (data.success) {
      toast.success(data.message);
      getAllAppointments();
    } else {
      toast.error(data.message);
    }
  };
  const cancelAppointment = async (id) => {
    const { data } = await appointmentApi.canceled(id);
    if (data.success) {
      toast.success(data.message);
      getAllAppointments();
    } else {
      toast.error(data.message);
    }
  };
  const deleteAppointment = async (id) => {
    try {
      const { data } = await appointmentApi.delete(id);
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // get all workShift
  const getAllWorkShift = async () => {
    try {
      const res = await workShiftApi.getAll();
      const data = res.data;
      // console.log("resData workShift ", data);
      if (data.success) {
        setWorkShift(data.data);
      }
    } catch (error) {
      console.error("Error fetching work shift:", error);
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
      getAllAppointments();
      getAllWorkShift();
    } else {
      setUser(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUser,
        appointments,
        getAllAppointments,
        baseURL,
        loadUserProfileData,
        confirmAppointment,
        completeAppointment,
        cancelAppointment,
        getAllWorkShift,
        workShifts,
        deleteAppointment,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
