import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
const plugins = [react()];
export default defineConfig({
    base: '/zelda-clone/',
    plugins: plugins,
    server: {
        host: true,
        cors: true,
    },
});
