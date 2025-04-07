import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(payload: any) {
      this.user = payload.data;
      this.token = payload.token;
    },
  },
});
