import ApiStock from "../Api/ApiStock"

export const createCategories = (data: any) => {
    return ApiStock.post("categories", data);
}

export const Categories = () => {
    return ApiStock.get("categories")
}

export const updateCategories = (udpateData: any) => {
    return ApiStock.put("categories", udpateData)
}

export const removeCategories = (id: number | null) => {
    return ApiStock.delete(`categories/${id}`)
}