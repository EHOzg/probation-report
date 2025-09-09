<template>
  <section class="hero-section">
    <!-- 上半部分：标题 + 圈选 -->
    <div class="hero-wrapper">
      <h1 class="hero-title">
        塑造你的
        <span ref="highlightRef" class="highlight">职业规划</span> 以<br />
        目标与愿景为指引
      </h1>

      <!-- 动态 SVG 圈选 -->
      <svg
        v-if="ellipse.rx > 0"
        class="circle"
        :viewBox="`0 0 ${ellipse.cx * 2} ${ellipse.cy * 2}`">
        <ellipse
          ref="ellipseRef"
          :cx="ellipse.cx"
          :cy="ellipse.cy"
          :rx="ellipse.rx"
          :ry="ellipse.ry" />
      </svg>
    </div>

    <!-- 下半部分：图片网格 -->
    <div class="grid-wrapper">
      <div class="grid-item accent"></div>
      <div class="grid-item">
        <img src="https://placekitten.com/400/250" alt="career path" />
      </div>
      <div class="grid-item">
        <img src="https://placekitten.com/401/250" alt="skills development" />
      </div>
      <div class="grid-item white"></div>
      <div class="grid-item">
        <img src="https://placekitten.com/402/250" alt="goal setting" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

// refs
const highlightRef = ref(null)
const ellipseRef = ref(null)
const ellipse = ref({ cx: 0, cy: 0, rx: 0, ry: 0 })

onMounted(async () => {
  await nextTick()
  const rect = highlightRef.value.getBoundingClientRect()
  const parentRect = highlightRef.value.parentElement.getBoundingClientRect()

  // 计算 ellipse 参数，确保环绕“职业规划”
  ellipse.value = {
    cx: rect.left - parentRect.left + rect.width / 2,
    cy: rect.top - parentRect.top + rect.height / 2,
    rx: rect.width / 2 + 15,
    ry: rect.height / 2 + 10,
  }

  // SVG 动画
  const path = ellipseRef.value
  const length = path.getTotalLength()
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  })
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.out',
  })
})
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(
    to bottom right,
    #0c1324,
    #040813,
    #0d1425
  ); /* 深色渐变背景 */
  color: #e6e6e6; /* 浅灰色文字，适配深色背景 */
  padding: 80px 20px;
  min-height: 100vh;
}

.hero-title {
  font-size: 64px;
  font-weight: 900;
  line-height: 1.3;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.highlight {
  position: relative;
  z-index: 1;
  font-size: 68px;
  color: #00d4ff; /* 与第二渐变色调协调 */
}

.circle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

ellipse {
  fill: none;
  stroke: #ff4d4d; /* 保留红色圈选以突出 */
  stroke-width: 3;
  stroke-linecap: round;
}

.hero-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 80px;
}

/* 图片网格 */
.grid-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  max-width: 1200px;
  width: 100%;
}

.grid-item {
  background: #1a1f2e; /* 深色背景，与主渐变协调 */
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-10px);
}

.grid-item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.grid-item.accent {
  background: linear-gradient(
    135deg,
    #00ffcc,
    #00d4ff
  ); /* 第二渐变用于强调块 */
  min-height: 220px;
}

.grid-item.white {
  background: #e6e6e6; /* 浅灰色，适配深色背景 */
  min-height: 220px;
}
</style>
