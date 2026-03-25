import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: {
    port: 3002,
    strictPort: true,
    origin: "http://localhost:3002",
    cors: true,
  },
  base: "http://localhost:3002",
  plugins: [
    federation({
      name: "onboarding_mfe",
      filename: "remoteEntry.js",
      dts: false,
      exposes: {
        "./App": "./src/App.tsx",
      },
      // remotes: {
      //   loan_mfe: {
      //     type: "module",
      //     name: "loan_mfe",
      //     entry: "http://localhost:3001/remoteEntry.js",
      //     entryGlobalName: "loan_mfe",
      //     shareScope: "default",
      //   },
      // },
      remotes: {
        loan_mfe: {
          type: "module",
          name: "loan_mfe",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "loan_mfe",
          shareScope: "default",
        },
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
