import {
	defineConfig
} from "vite";
import {
	resolve
} from "path";
import vue from '@vitejs/plugin-vue';

function pathResolve(dir) {
	return resolve(__dirname, dir);
}

export default defineConfig({
	base: "",
	plugins: [vue()],
	resolve: {
		alias: {
			"@": pathResolve("./src"),
		}
	},
	optimizeDeps: {
		include: ['axios'],
	},
	build: {
		target: 'modules',
		outDir: 'dist',
		assetsDir: 'assets',
		minify: 'terser' // 混淆器
	},
	server: {
		cors: true,
		open: true,
		host: '127.0.0.1',
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8080', //实际请求地址
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
		}
	}
});
