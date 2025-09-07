<template>
  <section class="timeline-section">
    <h1 class="section-title">主要工作事项</h1>

    <div class="timeline-wrapper">
      <div
        class="timeline-track"
        ref="trackRef"
        :style="{ width: trackWidth + 'px', height: segmentHeight + 'px' }">
        <!-- SVG 曲线 -->
        <svg
          class="timeline-svg"
          :viewBox="`0 0 ${trackWidth} ${segmentHeight}`"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          :style="{ width: trackWidth + 'px', height: segmentHeight + 'px' }">
          <defs>
            <linearGradient
              id="lineGrad"
              :x1="0"
              y1="0"
              :x2="trackWidth"
              y2="0"
              gradientUnits="userSpaceOnUse">
              <stop offset="50%" stop-color="#00c9ff" />
              <stop offset="100%" stop-color="#845ef7" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            :d="pathD"
            stroke="url(#lineGrad)"
            stroke-width="4"
            fill="none"
            stroke-linecap="round"
            filter="url(#glow)" />
          <path
            :d="pathD"
            stroke="url(#lineGrad)"
            stroke-width="4"
            fill="none"
            stroke-linecap="round"
            :transform="`translate(${segmentWidth},0)`"
            filter="url(#glow)" />
        </svg>

        <!-- 第一组卡片 -->
        <div
          v-for="(item, index) in timelineData"
          :key="'a-' + index"
          class="work-card a"
          :style="getCardStyle(index, 0)">
          <h3>{{ item.title }}</h3>
          <p>
            <i :class="item.icon" class="icon"></i>
            {{ item.desc }}
          </p>
        </div>

        <!-- 第二组卡片 -->
        <div
          v-for="(item, index) in timelineData"
          :key="'b-' + index"
          class="work-card b"
          :style="getCardStyle(index, segmentWidth)">
          <h3>{{ item.title }}</h3>
          <p>
            <i :class="item.icon" class="icon"></i>
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const segmentWidth = 1600
const segmentHeight = 400
const segments = 2
const trackWidth = segmentWidth * segments
const timelineData = [
  {
    title: '初期对接',
    desc: '对项目整体业务逻辑与代码架构进行深入了解，快速熟悉团队代码规范和开发流程，确保项目顺利衔接。',
    icon: 'fas fa-handshake',
  },
  {
    title: '深入开发',
    desc: '独立承担核心功能模块开发，完成关键页面与组件实现，优化前端交互和性能，解决开发过程中出现的问题。',
    icon: 'fas fa-code',
  },
  {
    title: '迭代完善',
    desc: '参与项目迭代与优化，新增功能模块并修复已知缺陷，同时与后端和测试紧密协作，提升整体系统稳定性。',
    icon: 'fas fa-sync-alt',
  },
  {
    title: '项目上线',
    desc: '推动项目从开发到上线的完整流程，协调各方资源，确保功能按时上线，同时进行上线前的最终测试与优化。',
    icon: 'fas fa-rocket',
  },
  {
    title: '后续优化',
    desc: '持续关注用户反馈和性能指标，进行前端性能优化、交互改进及代码重构，提升用户体验和系统可维护性。',
    icon: 'fas fa-tachometer-alt',
  },
]
const pathD = `
  M 0,200
  C 280,130 480,270 800,200
  C 1120,130 1320,270 1600,200
`

const getCardStyle = (index, offsetX = 0) => {
  const spacing = segmentWidth / (timelineData.length + 1)
  const x = spacing * (index + 1) + offsetX
  const y = 200 + Math.sin(index * 0.9) * 70
  return { left: `${x}px`, top: `${y}px` }
}

const trackRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.timeline-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  tl.from('.work-card.a', {
    autoAlpha: 0,
    scale: 0.98,
    duration: 0.9,
    stagger: 0.25,
    ease: 'power3.out',
  })

  tl.to(trackRef.value, {
    x: -segmentWidth,
    duration: 20,
    ease: 'linear',
    repeat: -1,
    overwrite: true,
    modifiers: { x: (x) => `${parseFloat(x)}px` },
  })
})
</script>

<style scoped>
.timeline-section {
  padding: 2rem 0;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  color: #fff;
  overflow: hidden;
  height: 100%;
}

.section-title {
  font-size: 2.5rem;
  color: #00ffcc;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.timeline-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.timeline-track {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.timeline-svg {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
}

.work-card {
  position: absolute;
  width: 220px;
  padding: 16px;
  background: rgba(9, 14, 26, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  backdrop-filter: blur(6px);
  transform: translate(-50%, -50%);
  text-align: left;
  color: #e9eef8;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.45);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  z-index: 2;
}
.work-card:hover {
  transform: translate(-50%, -50%) scale(1.04);
  box-shadow: 0 12px 30px rgba(0, 200, 255, 0.18);
}

.work-card h3 {
  font-size: 16px;
  margin: 0 0 6px 0;
  background: linear-gradient(90deg, #00f5a0, #00c9ff, #845ef7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
}

.work-card p {
  margin: 0;
  color: #bfcbe6;
  font-size: 13px;
  line-height: 1.4;
  display: flex;
  align-items: center;
}

.work-card p .icon {
  margin-right: 6px;
  color: #00f5a0;
  font-size: 14px;
  width: 18px;
  text-align: center;
}

@media (max-width: 1000px) {
  .timeline-wrapper {
    max-width: 100%;
  }
  .work-card {
    width: 180px;
    padding: 12px;
  }
}

.timeline-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(90deg, #00c9ff, #845ef7);
  box-shadow: 0 0 6px rgba(0, 201, 255, 0.6);
}
</style>
