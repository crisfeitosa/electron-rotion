import path, { resolve } from 'node:path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    plugins: [externalizeDepsPlugin()],
    publicDir: path.resolve('resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [tailwindcss(), react()],
  },
})
