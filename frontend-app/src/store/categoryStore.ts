import { defineStore } from "pinia";
import { createCategories } from "../services/Calls/CategoryCall";

export const useCategoriestore = defineStore("catergories", {
  state: (): any => ({
    name: "",
  }),
  actions: {
    async submitCategoriesData(toast: any) {
      try {
        const payload = {
          name: this.name,
        };

        const response = await createCategories(payload);
        return response.data;
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        throw error;
      }
    },
  },
  getters: {},
});
