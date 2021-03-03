const name = 'vite-fake-entrys-plugin'

/**
 * @description 假入口插件
 * @export
 * @param {{[key: string]: string}} config 配置对象
 * @return {*}  
 */
module.exports = function ViteFakeEntrysPlugin(config = {}) {
    const map = new Map()

    Object.keys(config).forEach(name => {
        map.set(name, config[name])
    })
    return {
      name,
      resolveId(id) {
        const value = map.get(id)
        if (value) {
            return id
        }
      },
      load(id) {
        const value = map.get(id)
        if (value) {
            return value
        }
      }
    }
}