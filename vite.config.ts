/// <reference types="vitest" />
import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';

export default ({ mode }: { mode: string }) => {
  return defineConfig({
    plugins: [
      svgr({
        svgrOptions: {
          // svgr options
        },
      }),
      react(),
      mode === 'analyze'
        ? (visualizer({
            template: 'treemap', // or sunburst, treemap, network
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'analyze.html', // will be saved in project's root
          }) as PluginOption)
        : [],
    ],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '@mocks', replacement: path.resolve(__dirname, './mocks') },
        { find: '@tests', replacement: path.resolve(__dirname, './tests') },
        {
          find: '@components',
          replacement: path.resolve(__dirname, './src/components'),
        },
      ],
    },
    build: {
      outDir: 'dist', // 빌드 결과물 출력 디렉터리
      emptyOutDir: true, // 빌드 전 outDir 디렉터리 비우기
      rollupOptions: {
        input: {
          main: '/src/main.tsx', // 엔트리 파일 지정
        },
        // 제외할 디렉터리 및 파일 패턴 설정
        external: [
          '/tests/',
          '/tests/**/*',
          '/mocks/',
          '/mocks/**/*',
          '/node_modules/**/*',
        ],
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './tests/setup.ts',
    },
  });
};
