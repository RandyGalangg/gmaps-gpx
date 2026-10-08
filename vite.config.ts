import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// VITE_BASE_PATH: "/" (Vercel, user sites) or "/repo-name/" (GitHub Pages project sites).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.');
  const trimmed = (env.VITE_BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
  const base = trimmed ? `/${trimmed}/` : '/';
  return {
    base,
    plugins: [react(), tailwindcss()],
    build: { target: 'es2020' },
  };
});
