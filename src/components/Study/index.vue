```vue
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
        :default-viewport="{ x: 400, y: 300, zoom: 1 }"
        class="vue-flow-mindmap">
        <template #node-custom="{ data }">
          <div class="study-node" :class="{ 'central-node': data.isCentral }">
            <Handle
              v-if="data.isCentral"
              type="source"
              position="right"
              id="right"
              class="custom-handle" />
            <Handle
              v-if="!data.isCentral"
              type="source"
              position="right"
              id="right"
              class="custom-handle" />
            <Handle
              v-if="!data.isCentral"
              type="target"
              position="left"
              id="left"
              class="custom-handle" />
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
import { VueFlow, Handle } from '@vue-flow/core'
import '@vue-flow/core/dist/style.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const studyItems = ref([
  {
    id: '1',
    title: '产品分析',
    description: '产品的类型展示型、交互型、流程型',
    icon: 'fas fa-chart-pie', // Represents analysis and data-driven insights
    branches: [
      {
        id: '1-1',
        title: '输入与输出',
        description:
          '输入：系统要处理哪些数据，输出：最终要呈现的 UI / 交互结果是什么',
        icon: 'fas fa-exchange-alt', // Represents data flow (input/output)
      },
      {
        id: '1-2',
        title: '分析用户路径',
        description: '用户最先看到什么、用户可能怎么操作、系统要如何响应',
        icon: 'fas fa-user-cog', // Represents user interaction and behavior analysis
      },
      {
        id: '1-3',
        title: '代码实现',
        description: '写代码：布局方式、数据结构、组件选择、性能考虑',
        icon: 'fas fa-code', // Represents coding and implementation
      },
    ],
  },
  {
    id: '2',
    title: '技术实现',
    description: '从项目实践中沉淀技术点，解决实际问题',
    icon: 'fas fa-cogs', // Represents technical processes and mechanisms
    branches: [
      {
        id: '2-1',
        title: 'App-WebSocket',
        description:
          '通过pinia状态管理，stores集中管理，通过生命周期开始时候进行连接',
        icon: 'fas fa-network-wired', // Represents network connectivity (WebSocket)
      },
      {
        id: '2-2',
        title: '离线地图',
        description: '通过ol插件加载地图瓦片，只需渲染出当前市/省，来提高性能',
        icon: 'fas fa-map', // Represents maps and geographic data
      },
      {
        id: '2-3',
        title: '文件上传',
        description:
          '通过hybird混合开发，使用webview实现H5与app的信息通讯，实现文件的增删改查',
        icon: 'fas fa-upload', // Represents file upload operations
      },
    ],
  },
  {
    id: '3',
    title: '框架插件使用',
    description:
      '从uni-ui升级到使用各类插件，到整体的ui框架组件更换，再到结合原生hooks',
    icon: 'fas fa-plug', // Represents plugins and framework extensions
    branches: [
      {
        id: '3-1',
        title: '组件库',
        description:
          '广州侦察中心审批app升级使用sard-uniapp，页面更加美观，像搜索项也用简单的下拉菜单代替',
        icon: 'fas fa-puzzle-piece', // Represents modular components
      },
      {
        id: '3-2',
        title: 'zui-svg',
        description: '一个icon的组件库解决了每次icon都必须手动引入的问题',
        icon: 'fas fa-icons', // Represents a collection of icons
      },
    ],
  },
  {
    id: '4',
    title: '综合提升',
    description: '复杂业务处理、考虑代码质量以及运行的逻辑，提高整体项目水平。',
    icon: 'fas fa-chart-line', // Represents growth and improvement
    branches: [
      {
        id: '4-1',
        title: '代码质量',
        description:
          '通过封装hooks，提高代码复用性，如列表的上拉加载、下拉刷新，通过适配器+TS实现了任意列表都能使用',
        icon: 'fas fa-code-branch', // Represents code quality and branching logic
      },
      {
        id: '4-2',
        title: '性能优化',
        description:
          '发现一些导致操作卡顿的地方，比如上传地理位置的请求变更至上报线索之后等',
        icon: 'fas fa-tachometer-alt', // Represents performance and speed
      },
    ],
  },
])

const nodes = ref([
  {
    id: 'central',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: { title: '学习路线图', isCentral: true },
    style: { width: '120px', height: '120px' },
  },
  ...studyItems.value.map((item, index) => {
    const angles = [45, 135, 225, 315]
    const radius = 250
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
  ...studyItems.value.flatMap((item, index) =>
    item.branches.map((branch, branchIndex) => ({
      id: branch.id,
      type: 'custom',
      position: {
        x: 450 + branchIndex * 250,
        y: index * 150 - 225,
      },
      data: { ...branch, isCentral: false },
      style: { width: '180px', minHeight: '100px' },
    }))
  ),
])

const edges = ref([
  ...studyItems.value.map((item, index) => ({
    id: `e-central-${item.id}`,
    source: 'central',
    target: item.id,
    type: 'smoothstep',
    sourceHandle: 'right',
    targetHandle: 'left',
    style: {
      stroke: 'url(#edgeGradient)',
      strokeWidth: 3,
    },
  })),
  ...studyItems.value.flatMap((item) =>
    item.branches.map((branch) => ({
      id: `e-${item.id}-${branch.id}`,
      source: item.id,
      target: branch.id,
      type: 'smoothstep',
      sourceHandle: 'right',
      targetHandle: 'left',
      style: {
        stroke: 'url(#edgeGradient)',
        strokeWidth: 2,
      },
    }))
  ),
])

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.self-study-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  tl.from('.study-node', {
    scale: 0,
    opacity: 0,
    duration: 0.7,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  })

  tl.from(
    '.vue-flow__edge-path',
    {
      drawSVG: '0%',
      duration: 1.5,
      ease: 'power2.out',
    },
    '-=1'
  )

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
  justify-content: center;
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
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: relative;
}

.central-node {
  border-radius: 50%;
  width: 130px;
  height: 130px;
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

.custom-handle {
  width: 10px;
  height: 10px;
  background: #00ffcc;
  border: 1px solid #00d4ff;
  border-radius: 50%;
}

.study-node:not(.central-node):nth-child(1) .icon,
.study-node:not(.central-node):nth-child(5) .icon,
.study-node:not(.central-node):nth-child(6) .icon {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(2) .icon,
.study-node:not(.central-node):nth-child(7) .icon,
.study-node:not(.central-node):nth-child(8) .icon {
  background: linear-gradient(90deg, #007bff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(3) .icon,
.study-node:not(.central-node):nth-child(9) .icon,
.study-node:not(.central-node):nth-child(10) .icon {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.study-node:not(.central-node):nth-child(4) .icon,
.study-node:not(.central-node):nth-child(11) .icon,
.study-node:not(.central-node):nth-child(12) .icon {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

@media (max-width: 768px) {
  .self-study-section {
    padding: 1rem 0;
  }

  .section-title {
    font-size: 2rem;
  }

  .mindmap-container {
    height: 800px;
    max-width: 100%;
  }

  .study-node {
    width: 160px;
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

  .custom-handle {
    width: 8px;
    height: 8px;
  }
}
</style>
```
