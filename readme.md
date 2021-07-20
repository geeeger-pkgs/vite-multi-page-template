# vite-multi-page模板

<del>注意，index.html不会自动fallback,访问子页面需直接输入html路径</del>

+ 2021年7月20日 增加了server.open配置，支持打开指定首页
+ 反馈，未知原因dev 第一次启动以后白页，刷一下就好了
  + 这个好像是因为自定义返回html时vite server未完成预缓存的建立导致的
  + 每次删除.vite再重启可复现
  + 经过观测5秒失败。
  + 解决方案是首次加载再重新刷新一次，目前暂定1秒，不过按照官方说法，预缓存可能由于引入包的增多而减缓速度
+ 2021年7月20日 修复devServer无法匹配search路径的问题
+ 2021年7月20日 修复白屏问题

### 依赖

```
"@vueuse/core": "^4.11.2",
"vue": "^3.1.5",
"vue-router": "^4.0.10",
"vuex": "^4.0.2"
```

### 支持

+ ts
+ less
+ scss
+ postcss
+ vue-router
+ vuex
+ legacy模式
+ @vueuse/core

### legacy

```javascript
"browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 11"
]
```

### 脚本

```javascript
scripts = {
    // 启动开发项目
    dev: "vite --mode dev",
    // 构建
    buildprod: "vite build --mode prod",
    buildtest: "vite build --mode test",
    // 预览
    serve: "vite preview",
    // 创建新页面
    create: "node --trace-warnings ./scripts/cli/createModule.js"
}
```

### 配置静态页面title

```javascript
// src/modules/module/config.json
{
    "title": "默认title"
}
```

### base配置

```javascript
// ./scripts/config.js
module.exports = {
  // 路径配置
  // 如果配置为/app/
  // 访问localhost:3000/app/index.html
  base: '/',
  templatePath: 'scripts/template/index.html',
  moduleTemplatePath: 'scripts/template/module',
  entryTemplatePath: 'scripts/template/entry.ts.template',
  modulesPath: 'src/modules',
  entrysPath: 'entrys'
}
```
