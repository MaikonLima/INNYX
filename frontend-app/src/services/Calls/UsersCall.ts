import ApiStock from "../Api/ApiStock"

export const createUser = async (data: any) => {
    return ApiStock.post("users", data)
}

export const getAllUser = async () => {
    return ApiStock.get("users")
}

export const getUserById = async (id: number | null) => {
    return ApiStock.get(`users/${id}`)
}

export const updateUser = async () => {
    return ApiStock.put(`users/${1}`)
}

export const removeUser = async (id: number | null) => {
    return ApiStock.delete(`users/${id}`)
}