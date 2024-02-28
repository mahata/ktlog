/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
    }
  }
});
