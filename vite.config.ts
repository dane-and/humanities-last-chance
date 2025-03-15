
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Type-safe way to access env variables in Vite config
  const env = process.env as Record<string, string>;
  const baseUrl = mode === 'production' ? (env.VITE_BASE_URL || '/') : '/';
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    // Dynamically set base URL from environment variable or default to '/'
    base: baseUrl,
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
