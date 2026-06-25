import api from "@/lib/api";
import { LoginRequest, TokenResponse } from "@/types/auth";
import { RegisterRequest } from "@/types/auth";

export const loginApi = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>("/token/", data);
  return response.data;
};

export const registerApi = async (data: RegisterRequest) => {
  const response = await api.post("/register/", data);
  return response.data;
};
