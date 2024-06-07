import { useCallback } from "react";
import { Article } from "../type/Article";

export const useArticleRepository = () => {
  const getAll = useCallback(async (): Promise<Article[]> => {
    const response = await fetch("/api/v1/articles", { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }, []);

  const get = useCallback(async (uuid: string): Promise<Article> => {
    const response = await fetch(`/api/v1/articles/${uuid}`, { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
    }

    return response.json();
  }, []);

  return {
    getAll,
    get,
  };
};
