import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// React handles JSX; the Tailwind plugin scans your source files for class names.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In development, send /api requests to the Express server so the browser
  // never talks to labd directly and no CORS setup is needed.
  server: {
    proxy: {
      "/api": {
        target: "https://zero-to-shipped-3-server.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
