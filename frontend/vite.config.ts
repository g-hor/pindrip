import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': 'http://localhost:5001',
			'/rails': 'http://localhost:5001',
		},
	},
	build: {
		outDir: '../public',
		emptyOutDir: true,
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@store': path.resolve(__dirname, 'src/store'),
			'@types': path.resolve(__dirname, 'src/types'),
			'@context': path.resolve(__dirname, 'src/context'),
		},
	},
});
