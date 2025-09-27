import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(), // enables React Fast Refresh (JS hot reload)
    tailwindcss(), // keeps Tailwind working
  ],
});
