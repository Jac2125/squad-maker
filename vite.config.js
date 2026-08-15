import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  // 모든 JS/CSS를 하나의 HTML로 인라인 → dist/index.html
  build: { outDir: 'dist', emptyOutDir: true },
})
