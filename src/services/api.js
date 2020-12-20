import axios from "axios";

const api = axios.create({
  // baseURL: "http://192.168.25.7:3000",
  baseURL: "http://devforlive-com.umbler.net/",
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;