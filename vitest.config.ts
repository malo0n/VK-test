import { defineConfig } from "vite";




export default defineConfig ({
  test: {
    globals: true,
    environment: "jsdom",
    alias: {
      "@components": "/src/components",
      "@shared": "/src/shared",
      "@widgets": "/src/widgets",
      "@app": "/src/app",
      "@": "/src",
    }
  },
})
