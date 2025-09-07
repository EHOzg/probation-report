<template>
  <section class="pyramid-section">
    <h1 class="section-title">我的优势金字塔</h1>
    <div class="pyramid-container">
      <div class="pyramid">
        <div
          v-for="(layer, index) in pyramidLayers"
          :key="index"
          class="pyramid-layer"
          :style="getLayerStyle(index)">
          <i :class="layer.icon" class="icon"></i>
          <span class="layer-text">{{ layer.text }}</span>
        </div>
      </div>
      <div class="summary-panel">
        <div
          v-for="(summary, index) in summaries"
          :key="index"
          class="summary-card">
          <div class="summary-header">
            <i :class="summary.icon" class="icon"></i>
            <span class="summary-title">{{ summary.title }}</span>
          </div>
          <p class="summary-desc">{{ summary.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pyramidLayers = ref([
  { text: '基础技术技能', icon: 'fas fa-tools' },
  { text: '项目经验丰富', icon: 'fas fa-project-diagram' },
  { text: '团队协作能力', icon: 'fas fa-users' },
  { text: '创新能力突出', icon: 'fas fa-lightbulb' },
  { text: '独特优势', icon: 'fas fa-star' },
])

const summaries = ref([
  {
    title: '专业优势',
    description: '技术深度和项目经验丰富，能快速实现高质量功能并优化性能。',
    icon: 'fas fa-briefcase',
  },
  {
    title: '个人优势',
    description:
      '注重逻辑和代码质量，善于团队协作和持续学习，适应快速变化的技术环境。',
    icon: 'fas fa-user-check',
  },
])

const getLayerStyle = (index) => ({
  width: `${100 - index * 18}%`, // 逐层递减
  zIndex: pyramidLayers.value.length - index,
})

onMounted(() => {
  gsap.from('.pyramid-layer', {
    scrollTrigger: {
      trigger: '.pyramid-section',
      start: 'top 80%',
    },
    height: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out',
  })

  const layers = document.querySelectorAll('.pyramid-layer')
  layers.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale: 1.05,
        boxShadow: '0 12px 24px rgba(0,0,0,0.5)',
        duration: 0.3,
      })
    })
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        duration: 0.3,
      })
    })
  })
})
</script>

<style scoped lang="scss">
.pyramid-section {
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #0c1324, #040813, #0d1425);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-align: center;
}

.pyramid-container {
  display: flex;
  gap: 40px;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
}

.pyramid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
}

.pyramid-layer {
  background: #090e1a;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transition: all 0.3s ease;
}

.layer-text {
  font-size: 14px;
  color: #a0a0a0;
  margin-left: 8px;
}

.icon {
  font-size: 20px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.summary-panel {
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.summary-card {
  background: #090e1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.summary-title {
  font-size: 18px;
  color: #fff;
}

.summary-desc {
  font-size: 14px;
  color: #a0a0a0;
  margin-top: 10px;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 768px) {
  .pyramid-container {
    flex-direction: column;
    align-items: center;
  }

  .pyramid,
  .summary-panel {
    width: 100%;
  }

  .pyramid-layer {
    width: 100% !important;
    clip-path: none;
    border-radius: 8px;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
