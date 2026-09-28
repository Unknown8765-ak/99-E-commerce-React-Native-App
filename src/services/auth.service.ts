import { API_BASE_URL } from "@/constants/api";
import { tokenService } from "./token.service";

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin";
  isEmailVerified: boolean;
  isActive: boolean;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   message: string;
// }

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const responseText = await response.text();

  console.log("API URL:", `${API_BASE_URL}${endpoint}`);
  console.log("Status:", response.status);
  console.log(
    "Content-Type:",
    response.headers.get("content-type")
  );
  // console.log("Response:", responseText);

  let result: any;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(
      `Invalid JSON response. Status: ${response.status}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result.message || "Something went wrong"
    );
  }

  return result.data;
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    // console.log("data" ,data)

    await tokenService.saveAccessToken(data.accessToken);

const savedToken = await tokenService.getAccessToken();

console.log("Token saved:", Boolean(savedToken));

return data;
  },

  async register(
    credentials: RegisterCredentials
  ): Promise<AuthResponse> {
    const data = await request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    await tokenService.saveAccessToken(data.accessToken);

    return data;
  },

  async logout(): Promise<void> {
    try {
      await request("/auth/logout", {
        method: "POST",
      });
    } finally {
      await tokenService.removeAccessToken();
    }
  },

  async getCurrentUser(): Promise<User> {
  const token = await tokenService.getAccessToken();

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const data = await request<{ user: User }>("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
}
};