/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const { normalizePath } = require('vite')
const { render } = require('ejs')

const { resolve } = path

/**
 * @description 构筑入口配置
 * @export
 * @param {object} config 配置
 * @param {string} config.cwd 运行目录
 * @param {string} config.templatePath html模板位置
 * @param {string} config.modulesPath 模块位置
 * @param {string} config.entrysPath 入口位置
 * @return {{
 *  input: {
 *      [key: string]: string
 *  };
 *  virtualEntrys: {
 *      [key: string]: string
 *  }
 * }}
 */
module.exports = function createEntry(config) {
  const pages = fs.readdirSync(resolve(config.cwd, config.modulesPath))
  const input = {}
  const virtualEntrys = {}
  const entryHTML = fs.readFileSync(resolve(config.cwd, config.templatePath), {
    encoding: 'utf-8'
  })
  for (let index = 0; index < pages.length; index++) {
    const element = pages[index]
    // 由于vite内部全部处理成posix路径了
    // 入口路径处理为posix路径
    input[element] = normalizePath(resolve(config.cwd, `${element}.html`))
    const moduleConfig = require(resolve(config.cwd, config.modulesPath, element, 'config.json'))
    const html = render(entryHTML, {
      title: moduleConfig.title,
      injectScript: `<script type="module" src="/${config.entrysPath}/${element}.ts"></script>`
    })
    virtualEntrys[input[element]] = html
  }
  return {
    input,
    virtualEntrys
  }
}
