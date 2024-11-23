import type { ApiResponse } from "@/type/ApiResponse";
import type { Article } from "@/type/Article";
import { useCallback } from "react";

export type PostResponse = ApiResponse;

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

	const post = async (
		title: string,
		content: string,
	): Promise<PostResponse> => {
		try {
			const response = await fetch("/api/v1/articles", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, content }),
			});

			if (response.ok) {
				return { success: true };
			}

			return {
				success: false,
				errorMessage: "Failed to save the article",
			};
		} catch (error) {
			return {
				success: false,
				errorMessage: (error as Error).message,
			};
		}
	};

	return {
		getAll,
		get,
		post,
	};
};
