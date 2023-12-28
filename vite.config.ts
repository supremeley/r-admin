// import { vitePluginForArco } from '@arco-plugins/vite-react';
// import UnoCSS from 'unocss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';
// import AutoImport from 'unplugin-auto-import/vite';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';

// import { ViteAliases } from 'vite-aliases';
// import compressPlugin from 'vite-plugin-compression';
// import viteImagemin from 'vite-plugin-imagemin';
// import Pages from 'vite-plugin-pages';
import { createPlugins } from './config/plugins';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const isBuild = command === 'build';
  // const a: A = '123';

  const env = loadEnv(mode, root) as Record<keyof ImportMetaEnvVar, string>;

  const plugins = createPlugins({
    isBuild,
    isUseSWC: Boolean(env.VITE_APP_USE_SWC),
    enableAnalyze: Boolean(env.VITE_APP_ENABLE_ANALYZE),
    enableMock: Boolean(env.VITE_APP_USE_MOCK),
  });

  return {
    base: '/',
    build: {
      // minify: 'terser',
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-redux', 'react-router-dom'],
            arco: ['@arco-design//web-react', '@arco-plugins/vite-react'],
          },
        },
      },
    },
    esbuild: {
      drop: ['console', 'debugger'],
    },
    // global css
    css: {
      preprocessorOptions: {
        scss: {
          // modifyVars: {
          // 	"primary-color": "#1DA57A",
          // },
          // javascriptEnabled: true,
          // additionalData: `@import "@/styles/var.less";`,
        },
      },
    },
    // server config
    server: {
      host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: Number(env.VITE_APP_PORT),
      open: env.VITE_APP_OPEN_BROWSER,
      cors: true,
      // https: false,
      // 代理跨域（mock 不需要配置，这里只是个事列）
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins,
  };
});
