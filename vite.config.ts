import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    watch: {
      ignored: ["**/db.json", "**/node_modules/**"],
    },
  },
    test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@shared": "/src/shared",
      "@widgets": "/src/widgets",
      "@app": "/src/app",
      "@": "/src",
    },
  },
});
