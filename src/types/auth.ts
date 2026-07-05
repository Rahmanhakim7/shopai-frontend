export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: "buyer" | "seller";
}


export interface GoogleLoginRequest {
  credential: string;
}

export interface GoogleRegisterRequest {
  credential: string;
  role: "buyer" | "seller";
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  profile_image: string | null;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user: UserProfile;
}

export interface AuthContextType {
  token: string | null;
  user: UserProfile | null;
  login: (token: string, refreshToken: string, user: UserProfile) => void;
  loading: boolean;
  logout: () => void;
}
