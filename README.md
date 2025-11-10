# Washington Square 10.31

ASCII 风格的 3D 可视化项目，带有 24 小时广播调频系统。

## 功能特点

- ASCII 风格的 3D 模型渲染
- 自动无人机视角飞行动画
- 24 小时广播调频系统（24 个音频频道对应 24 小时）
- 雨声频道特殊效果（17、18、19 点）
- 启动动画和翻页效果

## 本地运行

由于音频文件和 3D 模型文件较大（通过 Git LFS 存储），需要克隆仓库后在本地运行：

```bash
# 克隆仓库
git clone https://github.com/xcm6/washington-square-10-31-radioooooo.git
cd washington-square-10-31-radioooooo

# 拉取 Git LFS 文件
git lfs pull

# 启动本地服务器
python3 -m http.server 8000

# 在浏览器中打开
# http://localhost:8000
```

## 文件说明

- `index.html` - 主页面
- `main.js` - 主要逻辑代码
- `rain.png` - 下雨图标
- `*.wav` - 24 个音频文件（通过 Git LFS 存储）
- `washington_square_new_york_city.glb` - 3D 模型文件（通过 Git LFS 存储）

## 技术栈

- Three.js - 3D 渲染
- Web Audio API - 音频播放
- ASCII 渲染 - 文本风格可视化

## 在线部署

### Netlify 部署（推荐）

1. 访问 [Netlify](https://www.netlify.com/)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub，授权并选择仓库 `washington-square-10-31-radioooooo`
4. 构建设置：
   - Build command: 留空
   - Publish directory: `.`
5. 点击 "Deploy site"
6. 等待部署完成，Netlify 会自动处理 Git LFS 文件

### Vercel 部署

1. 访问 [Vercel](https://vercel.com/)
2. 点击 "Add New Project"
3. 导入 GitHub 仓库 `washington-square-10-31-radioooooo`
4. 框架预设选择 "Other"
5. 点击 "Deploy"
6. 等待部署完成

### GitHub Pages

GitHub Pages 可能无法直接提供 Git LFS 文件，建议使用 Netlify 或 Vercel 进行完整部署。

