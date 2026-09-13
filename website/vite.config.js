import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base: works at theshoebruh.github.io/REDLINE-FATIH/ and on any custom domain.
  base: './',
  plugins: [react()],
  server: { port: 5173 }
});
