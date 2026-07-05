import api from "@/lib/api";
import { LoginRequest, TokenResponse } from "@/types/auth";

export const loginApi = async (data: LoginRequest): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>("/token/", data);
  return response.data;
};

export const registerApi = async (data: FormData) => {
  const response = await api.post("/register/", data);
  return response.data;
};

export const googleLoginApi = async (credential: string) => {
  const response = await api.post("/google/login/", {
    credential,
  });

  return response.data;
};

export const googleRegisterApi = async (
  credential: string,
  role: "buyer" | "seller",
) => {
  const response = await api.post("/google/register/", {
    credential,
    role,
  });
  return response.data;
};

export const forgotPasswordApi = async (email: string) => {
  const response = await api.post("/forgot-password/", {
    email,
  });
  return response.data;
};

export const resetPasswordApi = async (
  uid: string,
  token: string,
  password: string,
) => {
  const response = await api.post("/reset-password/", {
    uid,
    token,
    password,
  });

  return response.data;
};
