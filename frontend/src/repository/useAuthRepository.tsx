import { useCallback } from "react";
import { ApiResponse } from "../type/ApiResponse";

export type GetAuthStatusResponse = ApiResponse;
export type AuthResponse = ApiResponse;

export const useAuthRepository = () => {
  const getAuthStatus =
    useCallback(async (): Promise<GetAuthStatusResponse> => {
      const response = await fetch("/api/v1/auth/status", { method: "GET" });
      if (!response.ok) {
        const text = await response.text();
        return {
          success: false,
          errorMessage: `HTTP error! status: ${response.status}, body: ${text}`,
        };
      }
      const data = await response.json();
      return { success: true, data };
    }, []);

  const auth = async (
    email: string,
    password: string,
  ): Promise<AuthResponse> => {
    try {
      const response = await fetch("/api/v1/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        return { success: true, data: await response.json() };
      }

      return {
        success: false,
        errorMessage: `Invalid email or password: ${email}`,
      };
    } catch (error) {
      return { success: false, errorMessage: (error as Error).message };
    }
  };

  return {
    getAuthStatus,
    auth,
  };
};
