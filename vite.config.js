const vue = require('@vitejs/plugin-vue')
const ViteFakeEntrysPlugin = require('./scripts/plugins/ViteFakeEntrysPlugin')
const ViteConfigureServerPlugin = require('./scripts/plugins/ViteConfigureServerPlugin')
const createEntrys = require('./scripts/helpers/createEntrys')
const pathConfig = require('./scripts/config')

const cwd = process.cwd()

const base = pathConfig.base

const config = createEntrys({
  cwd: cwd,
  ...pathConfig
})


/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  base,
  plugins: [
    ViteFakeEntrysPlugin(config.virtualEntrys),
    vue(),
    ViteConfigureServerPlugin({
      base,
      cwd,
      virtualEntrys: config.virtualEntrys
    })
    // {
    //   name: 'test',
    //   transformIndexHtml: {
    //     enforce: 'pre',
    //     transform(html, ctx) {
    //       if (ctx.server && ctx.filename in entryConfig.virtualConfig) {

    //         return entryConfig.virtualConfig[ctx.filename]
    //       }
    //       return html
    //     }
    //   }
    // },
    
  ],
  build: {
    rollupOptions: {
      input: config.input
    }
  }
}
