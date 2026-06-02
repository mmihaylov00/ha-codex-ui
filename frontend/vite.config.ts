import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";
  return {
    plugins: [react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify(isDevelopment ? "development" : "production"),
    },
    build: {
      outDir: "dist",
      minify: isDevelopment ? false : "oxc",
      sourcemap: isDevelopment,
      lib: {
        entry: "src/main.tsx",
        formats: ["es"],
        fileName: () => "panel.js",
      },
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "panel.js",
        },
      },
    },
  };
});
