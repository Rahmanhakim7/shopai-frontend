import api from "@/lib/api";

export const getAdminUsers = async (page: number, search: string = "") => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (search) {
    params.set("search", search);
  }
  const response = await api.get(`/admin/users/?${params.toString()}`);
  return response.data;
};

export const deactivateAdminUser = async (userId: number) => {
  const response = await api.patch(`/admin/users/${userId}/deactivate/`);
  return response.data;
};

export const activateAdminUser = async (userId: number) => {
  const response = await api.patch(`/admin/users/${userId}/activate/`);

  return response.data;
};
