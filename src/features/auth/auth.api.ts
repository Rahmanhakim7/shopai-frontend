import api from "@/lib/api";
import { LoginRequest, TokenResponse } from "@/types/auth";

export const loginApi = async (data: LoginRequest) => {
    const response = await api.post<TokenResponse>(
        "/api/token", data);
    return response.data;
}