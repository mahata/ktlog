/// <reference types="vitest" />

import path from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setup.ts"],
  },
  server: {
    open: true,
    port: 15173,
    proxy: {
      "/api": "http://localhost:18080",
    },
  },
})
