<template>
  <section class="self-study-section">
    <h1 class="section-title">自组学习情况</h1>
    <div class="mindmap-container">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :default-zoom="1"
        :min-zoom="0.5"
        :max-zoom="2"
        fit-view
        class="vue-flow-mindmap">
        <template #node-custom="{ data }">
          <div class="study-node" :class="{ 'central-node': data.isCentral }">
            <div class="node-content">
              <div v-if="!data.isCentral" class="title-with-icon">
                <i :class="data.icon" class="icon"></i>
                <span class="node-title">{{ data.title }}</span>
              </div>
              <span v-else class="node-title">{{ data.title }}</span>
              <p v-if="!data.isCentral" class="node-description">
                {{ data.description }}
              </p>
            </div>
          </div>
        </template>
      </VueFlow>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const studyItems = ref([
  {
    id: '1',
    title: '业务逻辑',
    description: '如web到移动端的转换，优化业务流程，减少冗余内容，提高效率。',
    icon: 'fas fa-sitemap',
  },
  {
    id: '2',
    title: '技术',
    description:
      '文件webview上传、H5二进制流原生处理、websocket实时通讯信息推送。',
    icon: 'fas fa-code-branch',
  },
  {
    id: '3',
    title: '框架升级',
    description:
      'uniapp黑盒模型处理、sard-uniapp组件库运用，提升开发效率和兼容性。',
    icon: 'fas fa-arrow-up',
  },
  {
    id: '4',
    title: '综合提升',
    description: '复杂业务处理、考虑代码质量以及运行的逻辑，提高整体项目水平。',
    icon: 'fas fa-chart-line',
  },
])

const nodes = ref([
  {
    id: 'central',
    type: 'custom',
    position: { x: 0, y: 0 }, // Center of the mind map
    data: { title: 'tech-mind', isCentral: true },
    style: { width: '120px', height: '120px' },
  },
  ...studyItems.value.map((item, index) => {
    const angles = [45, 135, 225, 315] // Radial angles
    const radius = 250 // Increased radius for better spacing
    const x = radius * Math.cos((angles[index] * Math.PI) / 180)
    const y = radius * Math.sin((angles[index] * Math.PI) / 180)
    return {
      id: item.id,
      type: 'custom',
      position: { x, y },
      data: { ...item, isCentral: false },
      style: { width: '200px', minHeight: '120px' },
    }
  }),
])

const edges = ref(
  studyItems.value.map((item, index) => ({
    id: `e-central-${item.id}`,
    source: 'central',
    target: item.id,
    type: 'smoothstep',
    style: {
      stroke: 'url(#edgeGradient)',
      strokeWidth: 3,
    },
  }))
)

onMounted(() => {
  // GSAP Timeline for nodes
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.self-study-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  // Animate nodes
  tl.from('.study-node', {
    scale: 0,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  })

  // Animate edges
  tl.from(
    '.vue-flow__edge-path',
    {
      drawSVG: '0%',
      duration: 1.5,
      ease: 'power2.out',
    },
    '-=1'
  )

  // Hover animations for study nodes
  const nodes = document.querySelectorAll('.study-node:not(.central-node)')
  nodes.forEach((node) => {
    node.addEventListener('mouseenter', () => {
      gsap.to(node, {
        scale: 1.05,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    node.addEventListener('mouseleave', () => {
      gsap.to(node, {
        scale: 1,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })

  // Add gradient to SVG edges
  const svg = document.querySelector('.vue-flow__container svg')
  if (svg) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    defs.innerHTML = `
      <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:#00ffcc;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:1" />
      </linearGradient>
    `
    svg.appendChild(defs)
  }
})
</script>

<style lang="scss" scoped>
.self-study-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center vertically */
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  padding: 2rem 0;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  color: #00ffcc;
  margin-bottom: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mindmap-container {
  width: 100%;
  max-width: 800px; /* Constrain width for centering */
  height: 80vh; /* Use viewport height for vertical centering */
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  position: relative;
}

.vue-flow-mindmap {
  background: transparent;
  width: 100%;
  height: 100%;
}

.study-node {
  background: #090e1a;
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  width: 200px;
  min-height: 120px;
}

.central-node {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-content {
  text-align: center;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
}

.icon {
  font-size: 18px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.node-title {
  font-size: 18px;
  color: #fff;
}

.node-description {
  font-size: 13px;
  color: #a0a0a0;
  line-height: 1.4;
}

/* Gradient styles for icons */
.study-node:not(.central-node):nth-child(1) .icon {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(2) .icon {
  background: linear-gradient(90deg, #007bff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(3) .icon {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(4) .icon {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design */
@media (max-width: 768px) {
  .self-study-section {
    padding: 1rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .mindmap-container {
    height: 600px; /* Fixed height for smaller screens */
    max-width: 100%;
  }

  .study-node {
    width: 180px;
    min-height: 100px;
  }

  .central-node {
    width: 100px;
    height: 100px;
  }

  .node-title {
    font-size: 16px;
  }

  .node-description {
    font-size: 12px;
  }

  .icon {
    font-size: 16px;
  }
}
</style>
