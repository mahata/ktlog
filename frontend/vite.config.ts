/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/setup.ts"],
	},
	server: {
		open: true,
		proxy: {
			"/api": "http://localhost:18080",
		},
	},
});
