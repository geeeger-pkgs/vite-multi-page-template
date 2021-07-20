# vite-multi-page模板

<del>注意，index.html不会自动fallback,访问子页面需直接输入html路径</del>

+ 2021年7月20日 增加了server.open配置，支持打开指定首页
+ 反馈，未知原因dev 第一次启动以后白页，刷一下就好了

### 依赖

```
"@vueuse/core": "^4.3.1",
vue: "^3.0.7",
"vue-router": "^4.0.4",
vuex: "^4.0.0"
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
    dev: "vite",
    // 构建
    buildprod: "cross-env NODE_ENV=production vite build",
    buildtest: "cross-env NODE_ENV=development vite build",
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
  // 如果配置为/app
  // 访问localhost:3000/app/index.html
  base: '/',
  templatePath: 'scripts/template/index.html',
  moduleTemplatePath: 'scripts/template/module',
  entryTemplatePath: 'scripts/template/entry.ts.template',
  modulesPath: 'src/modules',
  entrysPath: 'entrys'
}
```
