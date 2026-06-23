# SuZec 个人主页

一个基于 Vue 3、Vite 和 Vuetify 构建的个人主页项目。页面用于展示个人头像、简介标签、技能图表、社交入口、壁纸预览和音乐播放等内容，打包后可以作为静态站点部署到 GitHub Pages、Cloudflare Pages 或其他静态托管平台。

## 功能

- 响应式个人主页，适配桌面端和移动端。
- 支持头像、欢迎语、个人标签、技能雷达图等展示内容。
- 支持动态壁纸、静态壁纸和移动端壁纸配置。
- 支持本地音乐播放，也可以通过音乐接口加载歌单。
- 支持通过 `src/config.js` 修改站点标题、背景、音乐、社交链接等配置。
- 支持使用 `VITE_CONFIG` 环境变量覆盖默认配置，适合在线部署时快速定制。

## 技术栈

- Vue 3
- Vite
- Vuetify
- Chart.js
- TypeIt
- Less

## 项目结构

```text
.
|-- public/          # 静态资源：图片、字体、音乐、壁纸
|-- src/             # 页面源码和组件
|   |-- components/  # 页面组件
|   |-- utils/       # 工具函数
|   |-- app.js       # 主要页面逻辑
|   |-- config.js    # 站点配置
|   `-- main.js      # 应用入口
|-- index.html       # Vite 入口 HTML
|-- package.json     # 依赖和脚本
|-- vite.config.js   # Vite 配置
`-- wrangler.jsonc   # Cloudflare 静态资源部署配置
```

## 本地运行

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

默认会启动 Vite 开发服务，终端会显示本地访问地址。

## 打包

普通静态站点打包：

```bash
npm run build
```
打包产物会生成到 `dist/` 目录。

## 修改配置

主要配置文件是：

```text
src/config.js
```

常见可改内容：

- `metaData`: 页面标题、描述、关键词、图标。
- `avatar`: 头像路径。
- `welcometitle`: 首页欢迎语。
- `tags`: 个人标签。
- `background`: 默认背景壁纸。
- `polarChart`: 技能图表数据。
- `socialPlatformIcons`: 社交平台入口。
- `musicPlayer`: 在线歌单配置。
- `localMusic`: 本地音乐列表。
- `wallpaper`: 壁纸列表。

静态资源建议放在 `public/` 目录下，引用时使用以 `/` 开头的路径，例如：

```js
avatar: "/img/author.jpg"
```