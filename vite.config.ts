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
  resolve: {
    alias: {
      "@": "/src",
      "@api": "/src/api",
      "@helpers": "/src/helpers",
      "@model": "/src/model",
      "@components": "/src/components",
    },
  },
});
