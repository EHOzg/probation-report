<template>
  <section class="work-completion-section">
    <div class="section-title">工作完成情况</div>

    <!-- 卡片容器 -->
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

    <!-- Contribution 组件 -->
    <div class="contribution-wrapper">
      <Contribution />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import Contribution from '../Contribution/index.vue'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    title: '银安通',
    description:
      '1.3.0版本已上线，60+页面，完成 webview 文件上传、H5 二进制流处理、websocket 实时推送。',
    percentage: 100,
    icon: 'fas fa-shield-alt',
    gradient: [
      { offset: 0, color: '#00ffcc' },
      { offset: 1, color: '#ff00cc' },
    ],
  },
  {
    title: '广州侦查中心app',
    description:
      '1.0.0版本已上线，完成 uni-ui 到 sard-uniapp 升级、内网广播收集、tabs+swiper滑动切换等。',
    percentage: 100,
    icon: 'fas fa-business-time',
    gradient: [
      { offset: 0, color: '#007bff' },
      { offset: 1, color: '#00ffcc' },
    ],
  },
  {
    title: '其他项目',
    description: '广州省厅反馈组件、任务详情、银安通web1.2.0、金钟罩地图更换。',
    percentage: 80,
    icon: 'fas fa-tools',
    gradient: [
      { offset: 0, color: '#ffcc00' },
      { offset: 1, color: '#ff6600' },
    ],
  },
])

const getChartOption = (percentage, gradient) => ({
  series: [
    {
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      radius: '80%',
      center: ['50%', '50%'],
      axisLine: {
        lineStyle: {
          width: 10,
          color: [
            [
              percentage / 100,
              new echarts.graphic.LinearGradient(0, 0, 1, 0, gradient),
            ],
            [1, 'rgba(255,255,255,0.2)'],
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
        offsetCenter: [0, '20%'],
      },
      data: [{ value: percentage }],
    },
  ],
})

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.work-completion-section',
      start: 'top 90%',
      end: 'bottom 10%',
      toggleActions: 'play none none none',
    },
  })

  tl.fromTo(
    '.card',
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' }
  )

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mouseenter', () =>
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
        duration: 0.3,
      })
    )
    card.addEventListener('mouseleave', () =>
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        duration: 0.3,
      })
    )
  })
})
</script>

<style scoped lang="scss">
.work-completion-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  color: #fff;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  justify-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 60px; /* 卡片与 Contribution 之间间距 */
}

.card {
  background: #090e1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 320px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  flex: 1;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
  height: 40px;
}

.icon {
  font-size: 20px;
  background: linear-gradient(90deg, #00ffcc, #ff00cc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.project-name {
  font-size: 18px;
  color: #fff;
  white-space: nowrap;
}

.project-description {
  font-size: 14px;
  color: #a0a0a0;
  line-height: 1.4;
  min-height: 70px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 10px;
}

.chart {
  width: 100%;
  max-width: 180px;
  height: 120px;
  margin: 0 auto;
}
</style>
