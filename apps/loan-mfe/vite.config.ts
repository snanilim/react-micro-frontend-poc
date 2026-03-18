import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: {
    port: 3001,
    strictPort: true,
    origin: "http://localhost:3001",
    cors: true,
  },
  base: "http://localhost:3001",
  plugins: [
    federation({
      name: "loan_mfe",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
        "react-router-dom": { singleton: true },
        zustand: { singleton: true },
      },
    }),
    react(),
    tailwindcss(),
  ],
  build: {
    target: "chrome89",
  },
});
