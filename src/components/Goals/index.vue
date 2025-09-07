<template>
  <section class="goals-section">
    <!-- Three.js 粒子背景 -->
    <canvas ref="canvas" class="particle-canvas"></canvas>

    <!-- 前景内容 -->
    <div class="content">
      <h1 class="main-word">关键</h1>
      <h2 class="subtitle">创造高效、可维护且用户体验良好的前端应用</h2>

      <div class="cards-container">
        <div
          v-for="(point, index) in points"
          :key="'point-' + index"
          class="card">
          <div class="card-content">
            <i :class="point.icon" class="icon"></i>
            <h3 class="point-title">{{ point.title }}</h3>
            <p class="point-description">{{ point.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvas = ref(null)

const points = ref([
  {
    title: '代码质量与可维护性',
    description: '通过合理的组件化设计、清晰的架构，确保项目长期可维护。',
    icon: 'fas fa-code',
  },
  {
    title: '性能优化',
    description: '提升页面加载与交互性能，减少卡顿，保证流畅体验。',
    icon: 'fas fa-bolt',
  },
  {
    title: '用户体验',
    description: '打造美观且易用的界面，兼顾交互细节与可访问性。',
    icon: 'fas fa-user-check',
  },
  {
    title: '团队协作与工程化',
    description: '借助工具链和规范，提升协作效率与工程交付质量。',
    icon: 'fas fa-users-cog',
  },
])

onMounted(() => {
  /** Three.js 粒子文字背景 */
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 200

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas.value,
    alpha: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)

  // 创建粒子
  const particles = new THREE.BufferGeometry()
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 400
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x00ffcc,
    size: 2,
    transparent: true,
    opacity: 0.8,
  })

  const particleSystem = new THREE.Points(particles, material)
  scene.add(particleSystem)

  // 鼠标交互
  let mouseX = 0
  let mouseY = 0
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
  })

  function animate() {
    requestAnimationFrame(animate)
    particleSystem.rotation.x += 0.001
    particleSystem.rotation.y += 0.002
    particleSystem.rotation.x += mouseY * 0.001
    particleSystem.rotation.y += mouseX * 0.001
    renderer.render(scene, camera)
  }
  animate()

  // 监听窗口变化
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  })

  /** GSAP 前景动画 */
  gsap.from('.main-word', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.goals-section',
      start: 'top 80%',
      once: true,
    },
  })

  gsap.from('.subtitle', {
    opacity: 0,
    y: 30,
    duration: 1,
    delay: 0.3,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.goals-section',
      start: 'top 80%',
      once: true,
    },
  })

  //   gsap.from('.card', {
  //     opacity: 0,
  //     y: 50,
  //     duration: 1,
  //     stagger: 0.2,
  //     ease: 'back.out(1.7)',
  //     scrollTrigger: {
  //       trigger: '.goals-section',
  //       start: 'top 75%',
  //       once: true,
  //     },
  //   })

  gsap.fromTo(
    '.card',
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '.goals-section',
        start: 'top 80%',
        toggleActions: 'play none none none', // 播放一次，不会反复隐藏
      },
    }
  )
})
</script>

<style scoped lang="scss">
.goals-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0c1324;
  overflow: hidden;
  color: #fff;
  padding: 2rem;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1000px;
}

.main-word {
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #a0a0a0;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  margin-top: 2rem;
}

.card {
  background: rgba(9, 14, 26, 0.8);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.5);
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.point-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.point-description {
  font-size: 0.9rem;
  color: #a0a0a0;
  line-height: 1.4;
}
</style>
