import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // Expose environment variables to the client
    envPrefix: 'VITE_',
    // Build configuration for production
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor';
                        }
                        if (id.includes('react-router')) {
                            return 'router';
                        }
                        if (id.includes('firebase')) {
                            return 'firebase';
                        }
                    }
                }
            }
        }
    },
    // Preview server configuration (for local testing)
    preview: {
        port: 4173,
        strictPort: true
    }
})
