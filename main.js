import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ==================== ASCII 启动动画 ====================

// 启动文本内容
const bootText = `
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║          ██╗    ██╗ █████╗ ███████╗██╗  ██╗██╗███╗   ██╗      ║
║          ██║    ██║██╔══██╗██╔════╝██║  ██║██║████╗  ██║      ║
║          ██║ █╗ ██║███████║███████╗███████║██║██╔██╗ ██║      ║
║          ██║███╗██║██╔══██║╚════██║██╔══██║██║██║╚██╗██║      ║
║          ╚███╔███╔╝██║  ██║███████║██║  ██║██║██║ ╚████║      ║
║           ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝      ║
║                                                               ║
║            WASHINGTON SQUARE #202500102                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

[SYSTEM] Initializing core modules...
[SYSTEM] Loading ASCII renderer...
[SYSTEM] Connecting to 3D visualization engine...
[SYSTEM] Establishing audio channels...
[SYSTEM] Calibrating frequency tuner...
[SYSTEM] Mapping spatial coordinates...
[SYSTEM] Activating drone flight paths...
[SYSTEM] Loading Washington Square model...
[SYSTEM] Compiling shader programs...
[SYSTEM] Allocating memory buffers...
[SYSTEM] Initializing camera systems...
[SYSTEM] Setting up orbit controls...
[SYSTEM] Configuring lighting parameters...
[SYSTEM] Building scene graph...
[SYSTEM] Preparing texture atlas...
[SYSTEM] Optimizing mesh data...
[SYSTEM] Calculating bounding volumes...
[SYSTEM] Generating LOD levels...
[SYSTEM] Compressing geometry data...
[SYSTEM] Loading audio samples...
[SYSTEM] Registering event handlers...
[SYSTEM] Starting render loop...
[SYSTEM] Enabling real-time updates...
[SYSTEM] Activating ASCII conversion...
[SYSTEM] Synchronizing frame buffers...
[SYSTEM] Establishing network protocols...
[SYSTEM] Verifying system integrity...
[SYSTEM] Running diagnostics...
[SYSTEM] Checking dependencies...
[SYSTEM] Validating configuration...
[SYSTEM] All systems operational.
[SYSTEM] Ready for launch.

>>> BOOT SEQUENCE COMPLETE <<<
>>> ENTERING MAIN LOOP <<<
>>> SYSTEM ONLINE <<<

`;

// 启动动画
function startBootAnimation() {
    const bootScreen = document.getElementById('boot-screen');
    const bootTextElement = document.getElementById('boot-text');
    
    if (!bootScreen || !bootTextElement) return;
    
    // 逐字符显示效果
    let charIndex = 0;
    const chars = bootText.split('');
    let displayText = '';
    
    function typeChar() {
        if (charIndex < chars.length) {
            displayText += chars[charIndex];
            bootTextElement.textContent = displayText;
            charIndex++;
            
            // 随机添加闪烁效果
            if (Math.random() < 0.05) {
                bootTextElement.classList.add('boot-glitch');
                setTimeout(() => {
                    bootTextElement.classList.remove('boot-glitch');
                }, 100);
            }
            
            // 控制打字速度（标题部分超快，系统信息稍慢）
            let delay = 10;
            // 前300个字符（标题部分）显示超快
            if (charIndex < 300) {
                delay = 1; // 超快速度
            } else if (charIndex < 800) {
                delay = 8; // 系统信息稍慢
            } else {
                delay = 3; // 结尾部分快
            }
            
            setTimeout(typeChar, delay);
        } else {
            // 添加光标闪烁
            bootTextElement.innerHTML = displayText + '<span class="boot-cursor">█</span>';
        }
    }
    
    // 开始打字效果
    typeChar();
    
    // 5秒后隐藏启动画面
    setTimeout(() => {
        bootScreen.classList.add('hidden');
        // 触发主系统初始化
        console.log('启动动画完成，系统就绪');
    }, 5000);
}

// 页面加载时启动动画
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startBootAnimation);
} else {
    startBootAnimation();
}

// ASCII 字符集（从暗到亮）
const ASCII_CHARS = ' .:-=+*#%@';

// 场景设置
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // 黑色背景

// 相机设置
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 隐藏的 WebGL 渲染器（用于渲染 3D 场景）
const renderer = new THREE.WebGLRenderer({ 
    antialias: false,
    canvas: document.getElementById('hidden-canvas')
});
renderer.setSize(window.innerWidth, window.innerHeight);

// ASCII 显示设置
const asciiDisplay = document.getElementById('ascii-display');
// 增加 ASCII 分辨率，让显示更清晰
let ASCII_WIDTH = Math.floor(window.innerWidth / 3); // ASCII 字符宽度
let ASCII_HEIGHT = Math.floor(window.innerHeight / 6); // ASCII 字符高度

// 创建用于 ASCII 转换的 canvas
const asciiCanvas = document.createElement('canvas');
asciiCanvas.width = ASCII_WIDTH;
asciiCanvas.height = ASCII_HEIGHT;
const asciiCtx = asciiCanvas.getContext('2d');

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// 添加方向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.set(50, 100, 50);
scene.add(directionalLight);

// 轨道控制器（仰视视角）
// 使用 document.body 作为事件监听目标，因为渲染器 canvas 是隐藏的
const controls = new OrbitControls(camera, document.body);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;

// 无人机飞行动画系统
let flightAnimation = null;
let currentFlightPath = 0;
let flightTime = 0;
let modelSize = new THREE.Vector3();
let modelCenter = new THREE.Vector3();

// GLB 加载器
const loader = new GLTFLoader();
const loadingElement = document.getElementById('loading');
let modelLoaded = false;

// 添加加载超时
const loadTimeout = setTimeout(() => {
    if (!modelLoaded) {
        loadingElement.textContent = '加载超时，请检查网络连接或文件路径';
        loadingElement.style.color = 'red';
        console.error('模型加载超时');
    }
}, 60000); // 60秒超时

// 加载 GLB 模型
const modelPath = './washington_square_new_york_city.glb';
console.log('开始加载模型:', modelPath);

loader.load(
    modelPath,
    (gltf) => {
        clearTimeout(loadTimeout);
        console.log('模型文件加载成功');
        
        try {
            const model = gltf.scene;
            
            // 计算模型边界框
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            
            modelCenter = center;
            modelSize = size;
            
            // 将模型居中
            model.position.x = -center.x;
            model.position.y = -center.y;
            model.position.z = -center.z;
            
            // 启用阴影
            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            
            scene.add(model);
            
            // 设置初始相机位置（仰视视角）
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = camera.fov * (Math.PI / 180);
            let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
            cameraZ *= 1.5; // 稍微拉远一点
            
            camera.position.set(0, maxDim * 0.5, cameraZ);
            camera.lookAt(0, 0, 0);
            controls.target.set(0, 0, 0);
            controls.update();
            
            // 隐藏加载提示
            loadingElement.style.display = 'none';
            modelLoaded = true;
            
            console.log('模型加载成功！');
            console.log('模型尺寸:', size);
            console.log('模型中心:', center);
            
            // 保存模型尺寸和中心
            modelSize = size;
            modelCenter = center;
            
            // 禁用手动控制，启用自动飞行
            controls.enabled = false;
            
            // 开始无人机飞行动画
            startDroneFlight();
        } catch (error) {
            console.error('处理模型时出错:', error);
            loadingElement.textContent = '处理模型失败: ' + error.message;
            loadingElement.style.color = 'red';
        }
    },
    (progress) => {
        if (progress.total > 0) {
            const percent = (progress.loaded / progress.total * 100).toFixed(2);
            loadingElement.textContent = `正在加载模型... ${percent}%`;
            console.log('加载进度:', percent + '%');
        } else {
            loadingElement.textContent = `正在加载模型... ${(progress.loaded / 1024 / 1024).toFixed(2)} MB`;
        }
    },
    (error) => {
        clearTimeout(loadTimeout);
        console.error('加载模型时出错:', error);
        console.error('错误详情:', error.message);
        console.error('错误堆栈:', error.stack);
        
        let errorMsg = '加载失败: ';
        if (error.message) {
            errorMsg += error.message;
        } else {
            errorMsg += '请检查文件路径和网络连接';
        }
        
        // 检查是否是路径问题
        if (error.message && error.message.includes('404')) {
            errorMsg += '\n提示: 请确保通过本地服务器访问（如 python3 -m http.server）';
        }
        
        loadingElement.textContent = errorMsg;
        loadingElement.style.color = 'red';
        loadingElement.style.whiteSpace = 'pre-line';
    }
);

// 处理窗口大小变化
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // 更新 ASCII 显示尺寸
    ASCII_WIDTH = Math.floor(window.innerWidth / 3);
    ASCII_HEIGHT = Math.floor(window.innerHeight / 6);
    asciiCanvas.width = ASCII_WIDTH;
    asciiCanvas.height = ASCII_HEIGHT;
});

// 无人机飞行路径定义
const flightPaths = [
    // 路径1: 圆形环绕（高空）
    (t) => {
        const radius = Math.max(modelSize.x, modelSize.z) * 0.6;
        const height = modelSize.y * 0.7;
        const angle = t * Math.PI * 2;
        return {
            position: new THREE.Vector3(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            ),
            lookAt: new THREE.Vector3(0, modelSize.y * 0.2, 0)
        };
    },
    // 路径2: 8字形穿梭
    (t) => {
        const radius = Math.max(modelSize.x, modelSize.z) * 0.4;
        const height = modelSize.y * 0.3 + Math.sin(t * Math.PI * 4) * modelSize.y * 0.2;
        const angle = t * Math.PI * 4;
        return {
            position: new THREE.Vector3(
                Math.sin(angle) * radius,
                height,
                Math.sin(angle * 2) * radius * 0.5
            ),
            lookAt: new THREE.Vector3(0, modelSize.y * 0.1, 0)
        };
    },
    // 路径3: 螺旋上升
    (t) => {
        const radius = Math.max(modelSize.x, modelSize.z) * 0.5;
        const height = modelSize.y * 0.1 + t * modelSize.y * 0.6;
        const angle = t * Math.PI * 6;
        return {
            position: new THREE.Vector3(
                Math.cos(angle) * radius * (1 - t * 0.5),
                height,
                Math.sin(angle) * radius * (1 - t * 0.5)
            ),
            lookAt: new THREE.Vector3(0, height * 0.5, 0)
        };
    },
    // 路径4: 低空俯冲
    (t) => {
        const radius = Math.max(modelSize.x, modelSize.z) * 0.5;
        const height = modelSize.y * 0.4 + Math.sin(t * Math.PI) * modelSize.y * 0.3;
        const angle = t * Math.PI * 2;
        return {
            position: new THREE.Vector3(
                Math.cos(angle) * radius,
                height,
                Math.sin(angle) * radius
            ),
            lookAt: new THREE.Vector3(
                Math.cos(angle + Math.PI * 0.1) * radius * 0.3,
                modelSize.y * 0.1,
                Math.sin(angle + Math.PI * 0.1) * radius * 0.3
            )
        };
    },
    // 路径5: 波浪飞行
    (t) => {
        const radius = Math.max(modelSize.x, modelSize.z) * 0.4;
        const height = modelSize.y * 0.3 + Math.sin(t * Math.PI * 8) * modelSize.y * 0.15;
        const angle = t * Math.PI * 2;
        const wave = Math.sin(t * Math.PI * 4);
        return {
            position: new THREE.Vector3(
                Math.cos(angle) * radius + wave * radius * 0.2,
                height,
                Math.sin(angle) * radius
            ),
            lookAt: new THREE.Vector3(
                Math.cos(angle + Math.PI * 0.2) * radius * 0.5,
                modelSize.y * 0.15,
                Math.sin(angle + Math.PI * 0.2) * radius * 0.5
            )
        };
    },
    // 路径6: 对角线穿梭
    (t) => {
        const size = Math.max(modelSize.x, modelSize.z);
        const height = modelSize.y * 0.2 + Math.sin(t * Math.PI * 2) * modelSize.y * 0.2;
        return {
            position: new THREE.Vector3(
                (t - 0.5) * size * 0.8,
                height,
                (t - 0.5) * size * 0.8
            ),
            lookAt: new THREE.Vector3(
                (t - 0.5) * size * 0.4,
                modelSize.y * 0.1,
                (t - 0.5) * size * 0.4
            )
        };
    }
];

// 开始无人机飞行
function startDroneFlight() {
    if (!modelLoaded || modelSize.length() === 0) return;
    
    let pathDuration = 0; // 每个路径的持续时间
    let transitionProgress = 1; // 路径切换过渡进度 (0-1)
    let nextPathIndex = 0;
    let currentTargetPos = new THREE.Vector3();
    let currentTargetLookAt = new THREE.Vector3();
    let nextTargetPos = new THREE.Vector3();
    let nextTargetLookAt = new THREE.Vector3();
    
    // 初始化目标位置
    const initialPath = flightPaths[0];
    const initialData = initialPath(0);
    currentTargetPos.copy(initialData.position);
    currentTargetLookAt.copy(initialData.lookAt);
    camera.position.copy(initialData.position);
    controls.target.copy(initialData.lookAt);
    
    function animate() {
        if (!modelLoaded) return;
        
        // 当前路径的进度 (0-1)
        const pathProgress = pathDuration;
        
        // 获取当前飞行路径
        const currentPath = flightPaths[currentFlightPath];
        const currentData = currentPath(pathProgress);
        
        // 检查是否需要切换到下一个路径（提前准备过渡）
        if (pathProgress >= 0.9 && transitionProgress >= 1) {
            // 开始过渡到下一个路径
            nextPathIndex = (currentFlightPath + 1) % flightPaths.length;
            const nextPath = flightPaths[nextPathIndex];
            const nextData = nextPath(0);
            
            // 保存当前实际位置作为过渡起点（不是目标位置）
            currentTargetPos.copy(camera.position);
            currentTargetLookAt.copy(controls.target);
            
            // 设置下一个目标位置
            nextTargetPos.copy(nextData.position);
            nextTargetLookAt.copy(nextData.lookAt);
            
            // 开始过渡
            transitionProgress = 0;
        }
        
        // 路径切换过渡
        if (transitionProgress < 1) {
            // 平滑过渡（使用缓动函数 - smoothstep）
            const t = transitionProgress;
            const ease = t * t * (3 - 2 * t);
            
            // 插值位置（从当前位置平滑过渡到下一个路径的起始位置）
            camera.position.lerpVectors(currentTargetPos, nextTargetPos, ease);
            controls.target.lerpVectors(currentTargetLookAt, nextTargetLookAt, ease);
            
            // 更新过渡进度（更慢的过渡速度，更平滑）
            transitionProgress += 0.015; // 过渡速度（约67帧完成过渡）
            
            if (transitionProgress >= 1) {
                // 过渡完成，切换到新路径
                pathDuration = 0;
                currentFlightPath = nextPathIndex;
                currentTargetPos.copy(nextTargetPos);
                currentTargetLookAt.copy(nextTargetLookAt);
            }
        } else {
            // 正常飞行模式
            // 计算目标位置（使用平滑插值）
            const targetPos = currentData.position;
            const targetLookAt = currentData.lookAt;
            
            // 使用更平滑的插值（根据距离动态调整，但变化更平缓）
            const posDistance = camera.position.distanceTo(targetPos);
            const lookDistance = controls.target.distanceTo(targetLookAt);
            
            // 动态调整插值系数，但变化更平缓，避免突然加速
            // 使用更小的系数范围，确保平滑
            const baseLerp = 0.08; // 基础插值系数
            const posLerpFactor = Math.min(baseLerp + posDistance * 0.0005, 0.12);
            const lookLerpFactor = Math.min(baseLerp + lookDistance * 0.0005, 0.12);
            
            // 平滑更新相机位置
            camera.position.lerp(targetPos, posLerpFactor);
            controls.target.lerp(targetLookAt, lookLerpFactor);
        }
        
        controls.update();
        
        // 增加时间（使用更平滑的速度）
        pathDuration += 0.003; // 控制飞行速度（更慢更平滑）
        
        // 确保路径进度在 0-1 之间
        if (pathDuration >= 1) {
            pathDuration = 0;
        }
        
        flightAnimation = requestAnimationFrame(animate);
    }
    
    animate();
    console.log('无人机飞行开始，共', flightPaths.length, '条路径');
}

// 将 3D 渲染转换为 ASCII
function renderToASCII() {
    try {
        // 渲染 3D 场景到隐藏的 canvas
        renderer.render(scene, camera);
        
        // 将渲染结果绘制到 ASCII canvas（缩小）
        // 确保 canvas 尺寸正确
        if (asciiCanvas.width !== ASCII_WIDTH || asciiCanvas.height !== ASCII_HEIGHT) {
            asciiCanvas.width = ASCII_WIDTH;
            asciiCanvas.height = ASCII_HEIGHT;
        }
        
        asciiCtx.drawImage(renderer.domElement, 0, 0, ASCII_WIDTH, ASCII_HEIGHT);
        
        // 获取像素数据
        const imageData = asciiCtx.getImageData(0, 0, ASCII_WIDTH, ASCII_HEIGHT);
        const data = imageData.data;
        
        // 转换为 ASCII
        let ascii = '';
        for (let y = 0; y < ASCII_HEIGHT; y++) {
            for (let x = 0; x < ASCII_WIDTH; x++) {
                const index = (y * ASCII_WIDTH + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                
                // 计算亮度
                const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
                
                // 映射到 ASCII 字符
                const charIndex = Math.floor(brightness * (ASCII_CHARS.length - 1));
                ascii += ASCII_CHARS[charIndex];
            }
            ascii += '\n';
        }
        
        // 显示 ASCII
        asciiDisplay.textContent = ascii;
    } catch (error) {
        console.error('渲染 ASCII 时出错:', error);
        // 显示错误信息
        asciiDisplay.textContent = '渲染错误: ' + error.message;
    }
}


// 添加一个测试立方体，确保场景有内容可渲染
const testGeometry = new THREE.BoxGeometry(2, 2, 2);
const testMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const testCube = new THREE.Mesh(testGeometry, testMaterial);
testCube.position.set(0, 1, 0);
scene.add(testCube);

// 添加一个地面
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// 动画循环
let frameCount = 0;
function animate() {
    requestAnimationFrame(animate);
    
    frameCount++;
    
    // 每60帧输出一次调试信息
    if (frameCount % 60 === 0) {
        console.log('渲染中... 模型已加载:', modelLoaded, '场景对象数:', scene.children.length);
    }
    
    if (modelLoaded) {
        // 模型加载后移除测试立方体
        if (testCube.parent) {
            scene.remove(testCube);
        }
        if (ground.parent) {
            scene.remove(ground);
        }
    }
    
    renderToASCII();
}

// 确保渲染立即开始
console.log('开始动画循环');
animate();

// ==================== 电波调频系统 ====================

// 音频文件列表（24个）
const audioFiles = [
    './220624_0005.wav',
    './220624_0006.wav',
    './220624_0007.wav',
    './220624_0011.wav',
    './220624_0012.wav',
    './220626_0013.wav',
    './220626_0014.wav',
    './220626_0015.wav',
    './220626_0016.wav',
    './220626_0017.wav',
    './220626_0018.wav',
    './220626_0019.wav',
    './220626_0020.wav',
    './220626_0021.wav',
    './220626_0022.wav',
    './220626_0023.wav',
    './220626_0024.wav',
    './220626_0025.wav',
    './220626_0026.wav',
    './220626_0027.wav',
    './220626_0028.wav',
    './220626_0029.wav',
    './220626_0030.wav',
    './220626_0031.wav'
];

// 频率列表（对应24个频道，从88.0到111.5，每1MHz一个）
const frequencies = [];
for (let i = 0; i < 24; i++) {
    frequencies.push((88.0 + i * 1.0).toFixed(1));
}

// 下雨频道索引（0013, 0014, 0015 对应索引 5, 6, 7）
const rainChannels = [5, 6, 7];

// 频道对应的小时（随机生成）
const channelHours = [];
let currentHour = 0;

// 生成24个小时（0-23），雨声频道对应17, 18, 19点
function generateRandomHours() {
    const hours = [];
    
    // 先确定雨声频道（0013, 0014, 0015）对应17, 18, 19点
    // 0013在索引5，0014在索引6，0015在索引7
    const rainHours = [17, 18, 19];
    
    // 生成剩余的21个小时（0-16, 20-23）
    const remainingHours = [];
    for (let i = 0; i < 24; i++) {
        if (!rainHours.includes(i)) {
            remainingHours.push(i);
        }
    }
    
    // 随机打乱剩余的21个小时
    for (let i = remainingHours.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingHours[i], remainingHours[j]] = [remainingHours[j], remainingHours[i]];
    }
    
    // 构建24个频道对应的小时数组
    let remainingIndex = 0;
    for (let i = 0; i < 24; i++) {
        if (i === 5) { // 0013 -> 17点
            hours.push(17);
        } else if (i === 6) { // 0014 -> 18点
            hours.push(18);
        } else if (i === 7) { // 0015 -> 19点
            hours.push(19);
        } else {
            // 其他频道随机分配剩余的小时
            hours.push(remainingHours[remainingIndex]);
            remainingIndex++;
        }
    }
    
    return hours;
}

// 初始化小时
channelHours.push(...generateRandomHours());
console.log('频道对应小时:', channelHours);
console.log('雨声频道(5,6,7)对应小时:', [channelHours[5], channelHours[6], channelHours[7]]);

// 音频对象
let audioContext = null;
let audioSource = null;
let gainNode = null;
let currentChannel = 0;
let isPlaying = false;
let currentAudio = null;

// 初始化音频上下文
function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        console.log('音频上下文初始化成功');
    } catch (error) {
        console.error('音频初始化失败:', error);
    }
}

// 加载并播放音频
function loadAndPlayAudio(channelIndex) {
    if (!audioContext) {
        initAudio();
    }
    
    // 停止当前播放
    stopAudio();
    
    // 创建新的音频对象
    currentAudio = new Audio(audioFiles[channelIndex]);
    currentAudio.loop = true;
    currentAudio.volume = 0.7;
    
    // 播放音频
    currentAudio.play().then(() => {
        isPlaying = true;
        console.log('播放频道', channelIndex + 1);
    }).catch(error => {
        console.error('播放失败:', error);
    });
}

// 停止音频
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    isPlaying = false;
}

// 当前显示频率（用于平滑滚动）
let currentDisplayFrequency = 88.5;
let targetChannel = 0;
let isDragging = false;
let dragStartY = 0;
let dragStartFrequency = 0;
let animationFrame = null;

// 更新小时显示（带翻页动画）
function updateHourDisplay() {
    const timeHour = document.getElementById('time-hour');
    const rainIcon = document.getElementById('rain-icon');
    
    if (timeHour) {
        const hour = channelHours[currentChannel];
        const newHour = hour.toString().padStart(2, '0');
        
        // 如果小时改变了，添加翻页动画
        if (timeHour.textContent !== newHour && timeHour.textContent !== '') {
            // 添加翻页动画类
            timeHour.classList.add('flip');
            
            // 在动画中间切换数字（50%处，即250ms）
            setTimeout(() => {
                timeHour.textContent = newHour;
            }, 250); // 在动画中间（50%）切换
            
            // 动画结束后移除类
            setTimeout(() => {
                timeHour.classList.remove('flip');
            }, 500);
        } else {
            // 首次加载或没有变化时直接显示
            timeHour.textContent = newHour;
        }
        
        currentHour = hour;
    }
    
    // 更新下雨图标显示
    if (rainIcon) {
        if (rainChannels.includes(currentChannel)) {
            rainIcon.style.display = 'block';
        } else {
            rainIcon.style.display = 'none';
        }
    }
}

// 切换频道
function switchChannel(channelIndex) {
    if (channelIndex < 0 || channelIndex >= audioFiles.length) return;
    
    currentChannel = channelIndex;
    targetChannel = channelIndex;
    
    // 更新小时显示
    updateHourDisplay();
    
    // 自动播放新频道
    loadAndPlayAudio(channelIndex);
    
    console.log('切换到频道', channelIndex + 1, frequencies[channelIndex] + ' MHz', '对应小时:', channelHours[channelIndex]);
}

// 更新频率显示（平滑滚动）
function updateFrequencyDisplay() {
    const frequencyText = document.getElementById('frequency-text');
    if (!frequencyText) return;
    
    // 平滑过渡到目标频率
    const targetFrequency = parseFloat(frequencies[targetChannel]);
    const diff = targetFrequency - currentDisplayFrequency;
    
    // 使用缓动函数实现平滑滚动
    if (Math.abs(diff) > 0.01) {
        currentDisplayFrequency += diff * 0.15; // 调整速度
        frequencyText.textContent = currentDisplayFrequency.toFixed(1);
        
        // 继续动画
        animationFrame = requestAnimationFrame(updateFrequencyDisplay);
    } else {
        // 到达目标，精确设置
        currentDisplayFrequency = targetFrequency;
        frequencyText.textContent = currentDisplayFrequency.toFixed(1);
    }
}

// 初始化电波调频界面
function initRadioPanel() {
    const frequencyText = document.getElementById('frequency-text');
    
    if (frequencyText) {
        // 初始化显示
        currentDisplayFrequency = parseFloat(frequencies[0]);
        frequencyText.textContent = currentDisplayFrequency.toFixed(1);
        
        // 鼠标拖动事件
        let isDragging = false;
        let startY = 0;
        let startFrequency = 0;
        let sensitivity = 0.5; // 拖动灵敏度
        
        frequencyText.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startFrequency = currentDisplayFrequency;
            frequencyText.classList.add('dragging');
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaY = startY - e.clientY; // 向上拖动增加频率
            const frequencyDelta = deltaY * sensitivity;
            let newFrequency = startFrequency + frequencyDelta;
            
            // 限制频率范围
            const minFreq = parseFloat(frequencies[0]);
            const maxFreq = parseFloat(frequencies[frequencies.length - 1]);
            newFrequency = Math.max(minFreq, Math.min(maxFreq, newFrequency));
            
            // 更新显示
            currentDisplayFrequency = newFrequency;
            frequencyText.textContent = newFrequency.toFixed(1);
            
            // 找到最接近的频道
            let closestChannel = 0;
            let minDiff = Math.abs(newFrequency - parseFloat(frequencies[0]));
            
            for (let i = 0; i < frequencies.length; i++) {
                const diff = Math.abs(newFrequency - parseFloat(frequencies[i]));
                if (diff < minDiff) {
                    minDiff = diff;
                    closestChannel = i;
                }
            }
            
            // 如果接近某个频道（误差小于0.5），切换到该频道
            if (minDiff < 0.5 && closestChannel !== targetChannel) {
                targetChannel = closestChannel;
                switchChannel(closestChannel);
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                frequencyText.classList.remove('dragging');
                
                // 平滑滚动到最近的频道
                const targetFreq = parseFloat(frequencies[targetChannel]);
                currentDisplayFrequency = parseFloat(frequencyText.textContent);
                
                // 启动平滑滚动动画
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                updateFrequencyDisplay();
            }
        });
        
        // 触摸事件支持
        frequencyText.addEventListener('touchstart', (e) => {
            isDragging = true;
            startY = e.touches[0].clientY;
            startFrequency = currentDisplayFrequency;
            frequencyText.classList.add('dragging');
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const deltaY = startY - e.touches[0].clientY;
            const frequencyDelta = deltaY * sensitivity;
            let newFrequency = startFrequency + frequencyDelta;
            
            const minFreq = parseFloat(frequencies[0]);
            const maxFreq = parseFloat(frequencies[frequencies.length - 1]);
            newFrequency = Math.max(minFreq, Math.min(maxFreq, newFrequency));
            
            currentDisplayFrequency = newFrequency;
            frequencyText.textContent = newFrequency.toFixed(1);
            
            let closestChannel = 0;
            let minDiff = Math.abs(newFrequency - parseFloat(frequencies[0]));
            
            for (let i = 0; i < frequencies.length; i++) {
                const diff = Math.abs(newFrequency - parseFloat(frequencies[i]));
                if (diff < minDiff) {
                    minDiff = diff;
                    closestChannel = i;
                }
            }
            
            if (minDiff < 0.5 && closestChannel !== targetChannel) {
                targetChannel = closestChannel;
                switchChannel(closestChannel);
            }
            
            e.preventDefault();
        });
        
        document.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
                frequencyText.classList.remove('dragging');
                
                const targetFreq = parseFloat(frequencies[targetChannel]);
                currentDisplayFrequency = parseFloat(frequencyText.textContent);
                
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                updateFrequencyDisplay();
            }
        });
        
        // 初始化
        switchChannel(0);
        
        // 初始化小时显示
        updateHourDisplay();
    }
    
    console.log('绿色电波调频界面初始化完成');
    console.log('频道对应小时:', channelHours);
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRadioPanel);
} else {
    initRadioPanel();
}
