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
