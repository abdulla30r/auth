import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

const certPath = (name: string) => {
  const p = path.resolve(process.cwd(), "certs", name);
  if (!fs.existsSync(p)) throw new Error(`cert not found: ${p}`);
  return p;
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync(certPath("localhost-key.pem")),
      cert: fs.readFileSync(certPath("localhost.pem")),
    },
    port: 5173,
  },
});
