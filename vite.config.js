import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base must match the GitHub repo name so the site works at dhani213.github.io/portfolio/
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
});
