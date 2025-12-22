import axios from "axios";

const axiosInstance = axios.create({
  // Backend is running on HTTP port 5000
  baseURL: "https://amazon-clone-api-nes4.onrender.com/",
});

export { axiosInstance };
