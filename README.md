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

## 注意事项

GitHub Pages 可能无法直接提供 Git LFS 文件。如需在线访问，建议使用支持 Git LFS 的托管服务（如 Netlify 或 Vercel）。

