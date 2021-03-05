/* eslint-disable @typescript-eslint/no-var-requires */
const { normalizePath, send } = require('vite')
const { resolve } = require('path')
const name = 'vite-configureServer-plugin'

/**
 * @description 配置开发服务
 * @export
 * @param {object} config 入口虚拟文件及base配置
 * @param {string} config.base baseUrl配置
 * @param {string} config.cwd 运行路径
 * @param {{[key: string]: string}} config.virtualEntrys 虚拟入口
 * @return {*}
 */
module.exports = function ViteConfigureServerPlugin(config = {}) {
  return {
    name,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.endsWith('.html')) {
          const html =
            config.virtualEntrys[
              normalizePath(
                resolve(
                  config.cwd,
                  req.url.replace(new RegExp('^' + config.base), '').replace(/^\//, '')
                )
              )
            ]
          if (html) {
            send(req, res, html, 'html', '')
          } else {
            next()
          }
        } else {
          next()
        }
      })
    }
  }
}
