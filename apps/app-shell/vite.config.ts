import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { federation } from "@module-federation/vite";

export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    origin: "http://localhost:3000",
    cors: true,
  },
  base: "http://localhost:3000",
  plugins: [
    federation({
      name: "app_shell",
      dts: false,
      remotes: {
        loan_mfe: {
          type: "module",
          name: "loan_mfe",
          entry: "http://localhost:3001/remoteEntry.js",
          entryGlobalName: "loan_mfe",
          shareScope: "default",
        },
        onboarding_mfe: {
          type: "module",
          name: "onboarding_mfe",
          entry: "http://localhost:3002/remoteEntry.js",
          entryGlobalName: "onboarding_mfe",
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
