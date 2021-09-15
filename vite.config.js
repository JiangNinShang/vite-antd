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
	runtimeCompiler: true,
	plugins: [vue()],
	resolve: {
		alias: {
			"@": pathResolve("./src"),
			'vue': 'vue/dist/vue.esm-bundler.js' // 定义vue的别名，如果使用其他的插件，可能会用到别名
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
		host: 'localhost',
		port: 3000,
		https: true,
		hotOnly: false,
		proxy: {
			'/api': {
				target: 'https://localhost:8099/WuHu', //实际请求地址
				changeOrigin: true,
				secure: false,
				logLevel: "debug",
				ws: false,
				rewrite: (path) => path.replace(/^\/api/, '')
			},
			'/https': {
				target: 'http://localhost:8888/WuHu', //实际请求地址
				changeOrigin: true,
				secure: false,
				logLevel: "debug",
				ws: false,
				rewrite: (path) => path.replace(/^\/https/, '')
			},
		},
	},
});
