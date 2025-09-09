<template>
  <section class="work-completion-section">
    <h1 class="section-title">工作完成情况</h1>
    <div class="cards-container">
      <div
        v-for="(project, index) in projects"
        :key="'project-' + index"
        class="card">
        <div class="card-content">
          <div class="title-with-icon">
            <i :class="project.icon" class="icon"></i>
            <span class="project-name">{{ project.title }}</span>
          </div>
          <p class="project-description">{{ project.description }}</p>
          <VChart
            class="chart"
            :option="getChartOption(project.percentage, project.gradient)"
            autoresize />
        </div>
      </div>
    </div>
    <div class="">
      <Contribution />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VChart from 'vue-echarts'
import 'echarts'
import * as echarts from 'echarts' // For LinearGradient
import Contribution from '../Contribution/index.vue'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    title: '银安通',
    description:
      '金融服务类跨平台应用，支持多端部署，用户账户管理、交易查询等功能。',
    percentage: 100,
    icon: 'fas fa-check-circle',
    gradient: [
      { offset: 0, color: '#00ffcc' },
      { offset: 1, color: '#ff00cc' },
    ],
  },
  {
    title: '企业管理系统',
    description: '内部管理系统，用于员工管理和数据分析，组件化开发。',
    percentage: 80,
    icon: 'fas fa-business-time',
    gradient: [
      { offset: 0, color: '#007bff' },
      { offset: 1, color: '#00ffcc' },
    ],
  },
  {
    title: '电商平台',
    description: '在线购物平台，支持商品展示、购物车和支付功能，响应式设计。',
    percentage: 90,
    icon: 'fas fa-shopping-cart',
    gradient: [
      { offset: 0, color: '#00ffcc' },
      { offset: 1, color: '#00d4ff' },
    ],
  },
  {
    title: '其他项目',
    description: '各种前端优化和维护任务，确保系统稳定和性能提升。',
    percentage: 95,
    icon: 'fas fa-tools',
    gradient: [
      { offset: 0, color: '#ffcc00' },
      { offset: 1, color: '#ff6600' },
    ],
  },
])

// ECharts gauge chart options with matching gradient
const getChartOption = (percentage, gradient) => ({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      radius: '80%',
      center: ['50%', '50%'], // Center the gauge
      axisLine: {
        lineStyle: {
          width: 10,
          color: [
            [
              percentage / 100,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, gradient),
            ],
            [1, 'rgba(255, 255, 255, 0.2)'],
          ],
        },
      },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      pointer: { show: false },
      detail: {
        valueAnimation: true,
        formatter: '{value}%',
        color: '#fff',
        fontSize: 16,
        offsetCenter: [0, '20%'], // Align text below gauge
      },
      data: [{ value: percentage }],
    },
  ],
})

onMounted(() => {
  // GSAP Timeline for cards
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.work-completion-section',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none none', // Prevent reversal
      markers: false, // Disable in production
    },
  })

  // Animate cards
  tl.fromTo(
    '.card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
    }
  )

  // Hover animations for cards
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })

  // Log chart rendering
  console.log('Charts rendered:', document.querySelectorAll('.chart').length)
})
</script>

<style lang="scss" scoped>
.work-completion-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  padding: 2rem;
  color: #fff;
  position: relative;
  overflow: visible; /* Prevent clipping */
  height: 100%; /* Full viewport height */
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cards-container {
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  justify-content: center; /* Center cards horizontally */
  padding: 0 1rem; /* Prevent edge clipping */
}

.card {
  background: #090e1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between; /* Distribute content */
  height: 320px; /* Fixed height for consistency */
  opacity: 1 !important; /* Force visibility */
  visibility: visible; /* Ensure visibility */
  transform: translateY(0); /* Prevent animation reset */
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  flex: 1; /* Fill card */
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
  height: 40px; /* Fixed height for icon alignment */
}

.icon {
  font-size: 20px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  align-self: center; /* Center vertically */
  flex-shrink: 0; /* Prevent resizing */
}

.project-name {
  font-size: 18px;
  color: #fff;
  white-space: nowrap; /* Prevent wrapping */
}

.project-description {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 10px;
  line-height: 1.4;
  min-height: 70px; /* Consistent text height */
  display: -webkit-box;
  -webkit-line-clamp: 4; /* Allow 4 lines */
  -webkit-box-orient: vertical;
  overflow: hidden; /* Prevent overflow */
}

.chart {
  width: 100%;
  max-width: 180px; /* Constrain chart size */
  height: 120px;
  margin: 0 auto; /* Center chart */
}

/* Gradient styles for icons */
.card:nth-child(1) .icon {
  background: linear-gradient(90deg, #00ffcc, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card:nth-child(2) .icon {
  background: linear-gradient(90deg, #007bff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card:nth-child(3) .icon {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card:nth-child(4) .icon {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design */
@media (max-width: 768px) {
  .work-completion-section {
    padding: 1rem;
    min-height: auto; /* Dynamic height */
    justify-content: flex-start; /* Start from top */
  }

  .cards-container {
    grid-template-columns: 1fr;
    justify-content: center;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .card {
    height: 300px; /* Smaller for mobile */
  }

  .project-name {
    font-size: 16px;
  }

  .project-description {
    font-size: 13px;
    min-height: 65px; /* Adjust for smaller font */
    -webkit-line-clamp: 4;
  }

  .icon {
    font-size: 18px;
  }

  .chart {
    max-width: 150px;
    height: 100px;
  }
}
</style>
