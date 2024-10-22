import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    server: {
        proxy: {
            '/api': 'https://conference.techgiants.ru'
        }
    },
    plugins: [
        react(),
        svgr({}),
    ],
})
