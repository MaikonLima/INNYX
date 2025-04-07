import ApiStock from "../Api/ApiStock";

export const createProducts = async (data: any) => {
  return ApiStock.post("products", data);
};

export const Products = async (limit = 10, page = 1) => {
  return ApiStock.get(`products?limit=${limit}&page=${page}`);
};

export const getProductById = async (id: number | null) => {
  return ApiStock.get(`products/${id}`);
};

export const updateProduct = async () => {
  return ApiStock.put(`products/${1}`);
};

export const removeProduct = async (id: number | null) => {
  return ApiStock.delete(`products/${id}`);
};
