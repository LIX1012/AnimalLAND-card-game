import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ 使用相对路径，确保部署兼容性
  plugins: [react()],
});
