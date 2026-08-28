import { create } from "axios";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// api constructor
const api = create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    timeout: 30000,
});


export const setupInterceptors = (logout: () => void) => {
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    api.interceptors.response.use(
        (res) => res,
        (error) => {
            if (error.code === "ERR_NETWORK") {
                toast.error("No internet or server down");
            } else if (error.response?.status === 401) {
                toast.error("Session expired. Logging out...");
                logout();
            }
            return Promise.reject(error);
        }
    );
};

export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong",
): string {
    if (typeof error === "object" && error !== null) {
        const data = (error as any).response?.data;
        const validationErrors = data?.errors;

        if (validationErrors && typeof validationErrors === "object") {
            const messages = Object.values(validationErrors)
                .flat()
                .filter((message): message is string => typeof message === "string");

            if (messages.length) {
                return messages.join(" ");
            }
        }

        if (data?.message) {
            return data.message;
        }

        if (error instanceof Error) {
            return error.message || fallback;
        }

        return (error as any).message || fallback;
    }

    if (typeof error === "string") {
        return error;
    }

    return fallback;
}


export default api;