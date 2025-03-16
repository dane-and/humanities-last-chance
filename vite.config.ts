
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    cors: {
      // Restrict CORS in development to mitigate CVE-2023-50777
      origin: mode === 'development' ? 'http://localhost:8080' : '*',
      methods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      credentials: true,
    },
    // Add WebSocket security by specifying allowed hosts
    hmr: {
      // Only allow WebSocket connections from localhost
      host: 'localhost',
    },
    // Restrict which hosts can access the development server
    allowedHosts: mode === 'development' ? ['localhost', '127.0.0.1'] : undefined,
  },
  // Dynamic base path - use the repository name for GitHub Pages, root path otherwise
  base: process.env.GITHUB_ACTIONS ? '/humanities-last-chance/' : '/',
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    // Improve build output
    sourcemap: true,
    // For better debugging in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // Keep console logs for debugging
      },
    },
  },
}));
