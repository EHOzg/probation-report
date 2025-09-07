<template>
  <section class="tech-barrage-section">
    <svg ref="svgRef" class="background-svg"></svg>

    <div
      class="barrage-container"
      @mouseenter="pauseBarrage"
      @mouseleave="resumeBarrage">
      <div
        v-for="(item, index) in attitudes"
        :key="index"
        class="barrage-item"
        :style="{
          top: item.top + '%',
          fontSize: item.size + 'px',
          color: item.color,
          left: item.left + 'px',
        }">
        <i v-if="item.icon" :class="item.icon"></i>
        {{ item.title }}
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

// ---------------------- 背景动态点线 ----------------------
const svgRef = ref(null)
const width = window.innerWidth
const height = window.innerHeight
const points = []
const pointCount = 80
const maxDistance = 120

// ---------------------- 弹幕 ----------------------
const attitudes = ref([])
const barrageTweens = []

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomColor() {
  const colors = [
    '#00d4ff',
    '#ff6a00',
    '#ff00cc',
    '#00ff88',
    '#ffcc00',
    '#33ccff',
    '#ff33cc',
    '#00ffcc',
    '#ff6600',
    '#cc00ff',
  ]
  return colors[randomInt(0, colors.length - 1)]
}

for (let i = 0; i < 40; i++) {
  attitudes.value.push({
    title: [
      '认真负责 ✅ 保证每一行代码都高质量！',
      '主动学习 📚 不断探索新技术',
      '积极沟通 💬 与团队无缝协作',
      '团队协作 🤝 共同成长',
      '创新思维 💡 敢于尝试新方案',
      '高效执行 ⚡ 快速完成任务',
      '持续优化 🔄 不断改进',
      '关注细节 🔍 精益求精',
      '积极反馈 💌 分享经验与问题',
      '乐于分享 🎉 知识传递很重要',
    ][randomInt(0, 9)],
    icon: '',
    color: randomColor(),
    top: randomInt(0, 90),
    size: randomInt(14, 22),
    left: width + randomInt(0, 500),
  })
}

// ---------------------- 动画控制 ----------------------
let paused = false
function pauseBarrage() {
  paused = true
  barrageTweens.forEach((t) => t.pause())
}
function resumeBarrage() {
  paused = false
  barrageTweens.forEach((t) => t.resume())
}

// ---------------------- 初始化 ----------------------
onMounted(async () => {
  await nextTick()

  // --- SVG 点线背景 ---
  const svg = svgRef.value
  svg.setAttribute('width', width)
  svg.setAttribute('height', height)
  svg.style.position = 'fixed'
  svg.style.top = 0
  svg.style.left = 0
  svg.style.zIndex = 0

  // 创建点
  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    })
  }

  const svgNS = 'http://www.w3.org/2000/svg'
  const circles = points.map((p) => {
    const c = document.createElementNS(svgNS, 'circle')
    c.setAttribute('cx', p.x)
    c.setAttribute('cy', p.y)
    c.setAttribute('r', 2)
    c.setAttribute('fill', '#00ffcc')
    svg.appendChild(c)
    return c
  })

  const lines = []

  function drawLines() {
    // 清理旧线
    lines.forEach((l) => svg.removeChild(l))
    lines.length = 0

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxDistance) {
          const line = document.createElementNS(svgNS, 'line')
          line.setAttribute('x1', points[i].x)
          line.setAttribute('y1', points[i].y)
          line.setAttribute('x2', points[j].x)
          line.setAttribute('y2', points[j].y)
          line.setAttribute('stroke', '#00ffcc')
          line.setAttribute('stroke-opacity', 0.2)
          line.setAttribute('stroke-width', 1)
          svg.appendChild(line)
          lines.push(line)
        }
      }
    }
  }

  function animatePoints() {
    points.forEach((p) => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0 || p.x > width) p.vx *= -1
      if (p.y < 0 || p.y > height) p.vy *= -1
    })
    circles.forEach((c, i) => {
      c.setAttribute('cx', points[i].x)
      c.setAttribute('cy', points[i].y)
    })
    drawLines()
    requestAnimationFrame(animatePoints)
  }
  animatePoints()

  // --- 弹幕漂浮 ---
  const items = document.querySelectorAll('.barrage-item')
  items.forEach((item, index) => {
    const duration = 10 + Math.random() * 10
    const t = gsap.to(item, {
      x: -window.innerWidth - item.offsetWidth,
      duration,
      repeat: -1,
      ease: 'linear',
      delay: index * 0.3,
    })
    barrageTweens.push(t)
  })
})
</script>

<style scoped lang="scss">
.tech-barrage-section {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: #0b0c17;
}

.background-svg {
  z-index: 0;
}

.barrage-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none; /* 避免遮挡鼠标事件 */
}

.barrage-item {
  position: absolute;
  white-space: nowrap;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
