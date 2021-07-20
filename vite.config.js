/* eslint-disable @typescript-eslint/no-var-requires */
const vue = require('@vitejs/plugin-vue')
const ViteFakeEntrysPlugin = require('./scripts/plugins/ViteFakeEntrysPlugin')
const ViteConfigureServerPlugin = require('./scripts/plugins/ViteConfigureServerPlugin')
const legacy = require('@vitejs/plugin-legacy')
const strip = require('@rollup/plugin-strip')
const createEntrys = require('./scripts/helpers/createEntrys')
const pathConfig = require('./scripts/config')
const path = require('path')
const { defineConfig } = require('vite')

const cwd = process.cwd()

const base = pathConfig.base

const config = createEntrys({
  cwd: cwd,
  ...pathConfig
})
process.env.BROWSER = 'chrome'

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  base,
  plugins: [
    // 虚拟html入口
    ViteFakeEntrysPlugin(config.virtualEntrys),
    vue(),
    // 虚拟html入口服务配置
    ViteConfigureServerPlugin({
      base,
      cwd,
      virtualEntrys: config.virtualEntrys
    }),
    legacy(),
    // 清除debugger及console
    strip({
      functions: ['console.log']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  server: {
    open: base + 'index.html'
  },
  build: {
    rollupOptions: {
      input: config.input
    }
  }
})
