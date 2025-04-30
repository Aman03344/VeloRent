import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target : "https://car-rental-app-5d25.onrender.com",
        // target : "https://car-rental-app-ptjc.onrender.com",
        secure: false,
      },
    },
  },
});
