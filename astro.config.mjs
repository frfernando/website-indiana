// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://indianaranch.com.br',
  server: {
    host: '0.0.0.0',
    port: 4324,
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
