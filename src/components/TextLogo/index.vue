<template>
  <canvas ref="canvasRef" class="particle-logo"></canvas>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const canvasRef = ref(null)
let ctx,
  width,
  height,
  particles = [],
  animationId

// 优化颜色列表，支持暗色和亮色主题
const colors = ['#00ffcc', '#007bff', '#ff00cc', '#00d4ff', '#ff6600']

class Particle {
  constructor(x, y) {
    this.destX = x
    this.destY = y
    this.reset()
  }

  reset() {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.radius = Math.random() * 1.5 + 0.5 // 随机半径，增加层次感
    this.opacity = Math.random() * 0.5 + 0.5 // 随机透明度
  }

  update() {
    const dx = this.destX - this.x
    const dy = this.destY - this.y
    this.x += dx * 0.05 // 减慢移动速度，增加平滑感
    this.y += dy * 0.05
  }

  draw(color) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.globalAlpha = this.opacity // 动态透明度
    ctx.fill()
  }
}

// 初始化粒子数组
const initParticles = () => {
  const textCanvas = document.createElement('canvas')
  const textCtx = textCanvas.getContext('2d')
  textCanvas.width = width
  textCanvas.height = height

  textCtx.font = 'bold 80px "Noto Sans CJK SC", sans-serif' // 使用中文友好字体
  textCtx.textAlign = 'center'
  textCtx.textBaseline = 'middle'
  textCtx.fillStyle = 'white'
  textCtx.fillText('巽', width / 2, height / 2)

  const imgData = textCtx.getImageData(0, 0, width, height)
  particles = []

  // 减小步长，增加粒子密度
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const idx = (y * width + x) * 4
      if (imgData.data[idx + 3] > 128) {
        particles.push(new Particle(x, y))
      }
    }
  }
}

// 动画循环
let currentColor = colors[0]
const animate = () => {
  ctx.clearRect(0, 0, width, height)
  particles.forEach((p) => p.update())
  particles.forEach((p) => p.draw(currentColor))
  animationId = requestAnimationFrame(animate)
}

// 切换颜色
const changeColor = () => {
  let newColor
  do {
    newColor = colors[Math.floor(Math.random() * colors.length)]
  } while (newColor === currentColor)
  currentColor = newColor
}

// 重组粒子动画
const regroupParticles = () => {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  // 粒子散开
  tl.to(particles, {
    duration: 1,
    x: (i) => particles[i].x + (Math.random() - 0.5) * 100,
    y: (i) => particles[i].y + (Math.random() - 0.5) * 100,
    opacity: 0.2,
    ease: 'power2.in',
  })

  // 粒子回到目标位置
  tl.to(
    particles,
    {
      duration: 1.5,
      x: (i) => particles[i].destX,
      y: (i) => particles[i].destY,
      opacity: (i) => particles[i].opacity,
      ease: 'elastic.out(1, 0.3)', // 弹性缓动，增加趣味性
      onStart: changeColor, // 在动画开始时切换颜色
      onComplete: () => {
        setTimeout(regroupParticles, 2000) // 延长重组间隔
      },
    },
    '-=0.5' // 重叠部分动画，增加流畅感
  )
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')

  // 设置高分辨率 Canvas
  const dpr = window.devicePixelRatio || 1
  width = canvas.width = 400 * dpr // 提高分辨率
  height = canvas.height = 400 * dpr
  canvas.style.width = '400px'
  canvas.style.height = '400px'
  ctx.scale(dpr, dpr) // 适配高 PPI 屏幕

  initParticles()
  animate()
  regroupParticles()

  // 添加交互性：鼠标悬停放大
  canvas.addEventListener('mouseenter', () => {
    gsap.to(particles, {
      duration: 0.5,
      radius: (i) => particles[i].radius * 1.5,
      ease: 'power2.out',
    })
  })
  canvas.addEventListener('mouseleave', () => {
    gsap.to(particles, {
      duration: 0.5,
      radius: (i) => particles[i].radius,
      ease: 'power2.out',
    })
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.particle-leaf {
  width: 400px;
  height: 400px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 100;
}
</style>
