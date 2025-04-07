import ApiStock from "../Api/ApiStock";

export const createUser = async (data: any) => {
  return ApiStock.post("users", data);
};

export const Users = async (limit = 10, page = 1) => {
  return ApiStock.get(`users?limit=${limit}&page=${page}`);
};

export const getUserById = async (id: number | null) => {
  return ApiStock.get(`users/${id}`);
};

export const updateUser = async () => {
  return ApiStock.put(`users/${1}`);
};

export const removeUser = async (id: number | null) => {
  return ApiStock.delete(`users/${id}`);
};
