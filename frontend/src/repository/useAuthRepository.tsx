import { useCallback } from "react";

export const useAuthRepository = () => {
  const isAuthed = useCallback(async () => {
    const response = await fetch("/api/v1/auth/status", { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }, []);

  return {
    isAuthed,
  };
};
