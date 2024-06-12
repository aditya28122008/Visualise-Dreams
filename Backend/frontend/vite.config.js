import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default () => {
  // Load app-level env vars to node-level env vars.

  return defineConfig({
    plugins: [react()],
  });
}
