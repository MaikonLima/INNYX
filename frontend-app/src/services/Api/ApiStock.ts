import axios from "axios";

const ApiStock = axios.create({
    baseURL: import.meta.env.BASE_URL
})

export default ApiStock;