import { defineStore } from "pinia";
import { createProducts } from "../services/Calls/ProductsCall";

export const useProductStore = defineStore("products", {
  state: (): any => ({
    name: "",
    description: "",
    price: null,
    expirationDate: new Date(),
    imageName: "",
    categoryId: 0,
  }),
  actions: {
    async sendProductData() {
      try {
        const expDate = new Date(this.expirationDate);
        expDate.setHours(0, 0, 0, 0);

        const payload = {
          name: this.name,
          description: this.description,
          price: Number(this.price),
          expirationDate: expDate.toISOString(),
          imageName: this.imageName,
          categoryId: this.categoryId,
        };

        console.debug("Final payload:", payload);

        const response = await createProducts(payload);

        return response.data;
      } catch (error) {
        console.error("Erro ao enviar dados:", error);
        throw error;
      }
    },
  },
  getters: {},
});
