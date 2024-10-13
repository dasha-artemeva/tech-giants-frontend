import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:8000'
        }
    },
    plugins: [
        react(),
        svgr({}),
    ],
})
