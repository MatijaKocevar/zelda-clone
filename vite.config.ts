import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/zelda-clone/' : '/',
    define: {
        __WS_TOKEN__: JSON.stringify(''),
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg}'],
            },
            includeAssets: ['icon.svg'],
            manifest: {
                name: 'A Tie to the Past - Zelda Clone',
                short_name: 'Zelda Clone',
                description: 'A top-down adventure game inspired by A Link to the Past',
                theme_color: '#1a1a1a',
                background_color: '#1a1a1a',
                display: 'fullscreen',
                orientation: 'landscape',
                start_url: '/',
                scope: '/',
                icons: [
                    {
                        src: 'icon.svg',
                        sizes: 'any',
                        type: 'image/svg+xml',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
    server: {
        port: 5174,
        https: {
            key: './certs/localhost+3-key.pem',
            cert: './certs/localhost+3.pem',
        },
        host: true,
        cors: true,
    },
});
