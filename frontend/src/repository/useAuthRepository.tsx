import { useCallback } from "react";

export const useAuthRepository = () => {
  const getAuthStatus = useCallback(async () => {
    const response = await fetch("/api/v1/auth/status", { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }, []);

  const auth = async (email: string, password: string) => {
    const response = await fetch("/api/v1/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      return response.json();
    }
    return {
      message: `Invalid email or password: ${email}`,
    };
  };

  return {
    getAuthStatus,
    auth,
  };
};
