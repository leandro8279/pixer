import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const root = path.resolve(import.meta.dirname, 'src');
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': root } },
  optimizeDeps: {
    include: ['react-phone-input-2', 'react-datepicker'],
  },
});
