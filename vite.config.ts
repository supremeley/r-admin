import { vitePluginForArco } from '@arco-plugins/vite-react';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
// import Icons from 'unplugin-icons/vite';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import { ViteAliases } from 'vite-aliases';
import compressPlugin from 'vite-plugin-compression';
import viteImagemin from 'vite-plugin-imagemin';
import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS({ configFile: './uni.config.ts' }),
    react(),
    ViteAliases({
      prefix: '@',
      // deep: true,
      // depth: 4,
    }),
    vitePluginForArco({
      style: 'css',
    }),
    // Icons({
    //   // compiler: 'jsx',
    //   jsx: 'react',
    //   // experimental
    //   autoInstall: true,
    // }),
    AutoImport({
      imports: ['react', 'react-router-dom'],
      dts: './types/auto-import.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
    Pages({
      dirs: ['src/views'],
    }),
    compressPlugin({
      threshold: 10240,
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 20,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
