import ApiStock from "../Api/ApiStock"

export const createProducts = async (data: any) => {
    return ApiStock.post("products", data)
}

export const getAllProducts = async () => {
    return ApiStock.get("products")
}

export const getProductById = async (id: number | null) => {
    return ApiStock.get(`products/${id}`)
}

export const updateProduct = async () => {
    return ApiStock.put(`products/${1}`)
}

export const removeProduct = async (id: number | null) => {
    return ApiStock.delete(`products/${id}`)
}