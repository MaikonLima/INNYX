import axios from "axios";

const ApiStock = axios.create({
  //   baseURL: import.meta.env.VITE_BACKEND_URL,
  baseURL: "http://localhost:3333/",
});

export default ApiStock;
