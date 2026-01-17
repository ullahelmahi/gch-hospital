import axios from "axios";

const API = axios.create({
  baseURL: "https://gch-hospital.onrender.com/api",
});

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const adminInfo = localStorage.getItem("adminInfo");
  if (adminInfo) {
    const { token } = JSON.parse(adminInfo);
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;