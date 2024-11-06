import { api } from "@/services/api";
import { AxiosError } from "axios";

export const signUp = async (name: string, email: string, password: string): Promise<void> => {
    try {
        const payload = { name, email, password };
        await api.post("/auth", payload);
    } catch (err) {
        if (err instanceof AxiosError && err.response && err.response.data) {
            throw new Error(err.response.data.message || "Failed to register. Please try again.");
        }
        throw new Error("Failed to register. Please try again.");
    }
};
