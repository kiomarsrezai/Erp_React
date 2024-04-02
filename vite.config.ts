import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            jsxImportSource: '@emotion/react',
            babel: {
                plugins: ['@emotion/babel-plugin'],
            },
        }),
    ],
    build: {
        outDir: './build',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let ext = assetInfo.name.split('.').at(1);
                    
                    if (ext === 'css') {
                        return `assets/[name]-[hash][extname]`;
                    }
                    
                    if (ext === 'eot' || ext === 'ttf' || ext === 'woff' || ext === 'woff2' || assetInfo.name === 'feather.svg') {
                        return `fonts/[name][extname]`;
                    }
                    
                    if (ext === 'png' || ext === 'svg' || ext === 'jpg' || ext === 'webp') {
                        return `images/[name][extname]`;
                    }
                    
                    return `${ext}/[name][extname]`;
                },
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            },
        },
    },
    resolve: {
        alias: {
            src: "/src",
            api: "/src/api",
            assets: "/src/assets",
            components: "/src/components",
            config: "/src/config",
            helper: "/src/helper",
            hooks: "/src/hooks",
            pages: "/src/pages",
            stimul: "/src/stimul",
            types: "/src/types",
        },
    },
})
