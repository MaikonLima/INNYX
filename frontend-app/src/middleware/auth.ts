import { useLoginStore } from "../store/loginStore";
import ApiStock from "../services/Api/ApiStock";

export default async function Auth(credentials: {
  email: string;
  password: string;
}) {
  try {
    const response = await ApiStock.post("/auth/login", credentials);

    const result = response.data;
    const payload = {
      data: {},
      token: result.access_token,
    };

    localStorage.setItem("token", result.access_token);
    localStorage.setItem("refresh_token", result.refresh_token);

    console.log(payload, "test");

    const userStore = useLoginStore();
    userStore.setUser(payload);

    return payload;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    throw error;
  }
}
