import api from "../helper/axios";
import type { Category, CreateMealPayload, MenuItem, UserProps } from "../helper/types";

export const createMeal = async (
  payload: CreateMealPayload
) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append(
    "basePrice",
    String(payload.basePrice)
  );
  formData.append(
    "availableForOrder",
    String(payload.availableForOrder)
  );
  formData.append("preparationTime", String(payload.preparationTime ?? ""));
  formData.append("trackInventory", String(payload.trackInventory));
  formData.append("modifierGroups", JSON.stringify(payload.modifierGroups));
  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await api.post("/menu/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getMeal = async (): Promise<MenuItem[]> => {
  const response = await api.get('/menu')
  return response.data;
}

export const getCategories = async (category: string): Promise<{ data: Category }> => {
  const response = await api.get(`/menu/category/${category}`);
  return response.data;
};

export const loginService = async (data: { email: string; pin: string }): Promise<{ token: string; user: UserProps; role: string }> => {
  const response = await api.post("/auth/login", data);
  return response.data;
}