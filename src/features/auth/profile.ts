import api from "@/lib/api";
import { UserProfile } from "@/types/auth";

interface ProfileResponse {
  message: string;
  data: UserProfile;
}

export const getProfile = async (): Promise<ProfileResponse> => {
  const response = await api.get("/profile/");
  return response.data;
};

export const updateProfile = async (
  formData: FormData,
): Promise<ProfileResponse> => {
  const response = await api.patch("/profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
