

export interface LoginRequest {
  username: string;
  password: string;
}
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user: UserInfo;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  login: (token: string, refreshToken: string, user: UserProfile) => void;
  loading: boolean;
  logout: () => void;
}

