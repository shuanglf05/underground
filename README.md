# AI 报销系统官网

一个现代化的 AI 驱动报销系统官方网站，使用 React + TypeScript + Vite 构建。

## 功能特性

- 🏠 **首页**：英雄区域、功能展示、AI 对话演示、客户评价
- 📚 **帮助中心**：入门指引、操作手册、API 接入文档
- 🔗 **登录入口**：跳转至系统登录页面
- 🤝 **成为分销商**：合作伙伴申请表单
- 📱 **响应式设计**：支持桌面和移动设备
- ✨ **精美动画**：流畅的用户交互体验

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS
- **路由管理**：React Router v6
- **图标库**：Lucide React

## 快速开始

### 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

访问 `http://localhost:3000` 查看网站。

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

### 预览生产构建

```bash
npm run preview
# 或
pnpm preview
```

## 项目结构

```
src/
├── components/         # 组件目录
│   ├── Navbar.tsx     # 导航栏
│   ├── Footer.tsx     # 页脚
│   ├── Hero.tsx       # 英雄区域
│   ├── Features.tsx   # 功能展示
│   ├── AIDemo.tsx     # AI 对话演示
│   ├── Testimonials.tsx # 客户评价
│   └── CTA.tsx        # 行动召唤
├── pages/            # 页面目录
│   ├── Home.tsx          # 首页
│   ├── HelpCenter.tsx    # 帮助中心
│   ├── GettingStarted.tsx # 入门指引
│   ├── Manual.tsx       # 操作手册
│   ├── APIDocs.tsx      # API 文档
│   └── PartnerForm.tsx  # 分销商表单
├── App.tsx            # 应用主组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 路由说明

- `/` - 首页
- `/help` - 帮助中心
- `/help/getting-started` - 入门指引
- `/help/manual` - 操作手册
- `/help/api` - API 接入文档
- `/partner` - 成为分销商

## 设计特点

- 现代化 UI 设计，采用蓝绿色渐变主题
- 清晰的信息层级和视觉引导
- 丰富的交互动效和微动画
- 响应式布局，适配各种屏幕尺寸

## 开发说明

项目遵循以下开发规范：

- 使用 TypeScript 进行类型安全开发
- 组件化开发，保持代码可复用性
- 使用 Tailwind CSS 进行样式开发
- 遵循 React 最佳实践

## License

MIT
