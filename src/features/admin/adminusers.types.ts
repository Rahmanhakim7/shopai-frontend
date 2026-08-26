export type AdminUser = {
  id: number;
  username: string;
  email: string;
  role: "buyer" | "seller";
  is_active: boolean;
  date_joined: string;
};

export type AdminUsersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
};
