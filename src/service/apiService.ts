import api from "../helper/axios";
import type { AdminLoginProps, AdminLoginResponse, Category, CreateMealPayload, MenuItem, orderData } from "../helper/types";

export const createMartItems = async (
  payload: CreateMealPayload
) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("price", String(payload.price));
  formData.append(
    "availableForOrder",
    String(payload.availableForOrder)
  );
  formData.append("preparationTime", String(payload.preparationTime ?? ""));
  formData.append("trackInventory", String(payload.trackInventory));
  formData.append("modifierGroups", JSON.stringify(payload.modifierGroups));
  if (payload.image) {
    formData.append("image", payload.image) ;
  }

  const response = await api.post("/mart/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response)

  return response.data;
};
export const createMeal = async (
  payload: CreateMealPayload
) => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("price", String(payload.price));
  formData.append(
    "availableForOrder",
    String(payload.availableForOrder)
  );
  formData.append("preparationTime", String(payload.preparationTime ?? ""));
  formData.append("trackInventory", String(payload.trackInventory));
  formData.append("modifierGroups", JSON.stringify(payload.modifierGroups));
  if (payload.image) {
    formData.append("image", payload.image) ;
  }

  const response = await api.post("/menu/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(response)

  return response.data;
};

export const getOrders = async (params?: Record<string, unknown>): Promise<orderData[]> => {
  const response = await api.get('/orders', { params });
  return response.data.data ?? [];
};

export const getMenu = async (): Promise<MenuItem[]> => {
  const response = await api.get('/menu')
  return response.data;
}

export const getMart = async (): Promise<MenuItem[]> => {
  const response = await api.get('/market')
  return response.data.items;
}

export const getCategories = async (category: string): Promise<{ data: Category }> => {
  const response = await api.get(`/menu/category/${category}`);
  return response.data;
};

export const loginService = async (values: AdminLoginProps): Promise<AdminLoginResponse> => {
  const response = await api.post("/auth/login", values);
  return response.data;
}

export const updateMenuAvailability = async ({
  itemId,
  available,
}: {
  itemId: string;
  available: boolean;
}) => {
  const response = await api.patch(
    `/api/menu/${itemId}/availability`,
    {
      available,
    }
  );

  return response.data;
};

export const getCustomers = async () => {
  const response = await api.get("/user")
  return response.data.data;
}

export const deleteCustomer = async (customerId: string | number): Promise<any> => {
  const response = await api.delete(`/user/${customerId}`);
  return response.data;
}

export const deleteMeal = async (menuId: string | number): Promise<any> => {
  const response = await api.delete(`/menu/${menuId}`);
  return response.data;
}

export const editMealData = async ({
  menuId,
  payload,
}: {
  menuId: string | number;
  payload: CreateMealPayload;
}): Promise<any> => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("category", payload.category);
  formData.append("price", String(payload.price));
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

  const response = await api.put(`/menu/${menuId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

export const getCustomerDetails = async (customerId: string | number) => {
  const response = await api.get(`/user/${customerId}`);
  return response.data.data;
}

export const getAverageRating = async () => {
  const response = await api.get('/rating/average')
  return response.data
}

export const getRating = async () => {
  const response = await api.get('/rating')
  const payload = response.data;

  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.ratings)) {
    return payload.ratings;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export const getPaymenntHistory = async () => {
  const response = await api.get('')
  return response.data
}