import { defineStore } from "pinia";
import { createUser } from "../services/Calls/UsersCall";

export const userStore = defineStore("users", {
  state: (): any => ({
    name: "",
    email: "",
    password: "",
    roles: [],
  }),
  actions: {
    async submitUserData() {
      try {
        const payload = {
          name: this.name,
          email: this.email,
          password: this.password,
          roles: Array.isArray(this.roles) ? this.roles : [this.roles],
        };

        console.log(payload, "paylo");

        const response = await createUser(payload);
        return response.data;
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        throw error;
      }
    },
  },
  getters: {},
});
