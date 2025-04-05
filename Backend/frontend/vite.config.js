import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default () => {

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "react-pdf": "react-pdf/dist/esm/entry.vite.js",
      },
    },
  });
};
