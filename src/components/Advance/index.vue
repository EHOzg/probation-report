<template>
  <div ref="container" class="three-container"></div>

  <!-- 行星优势卡片 -->
  <div
    class="info-box card"
    v-if="selectedPlanet"
    :style="{ left: cardPos.x + 'px', top: cardPos.y + 'px' }">
    {{ selectedPlanet.advantage }}
  </div>

  <!-- 太阳卡片 -->
  <div
    class="info-box sun-card"
    @click="toggleSunInfo"
    :style="{ left: sunCardPos.x + 'px', top: sunCardPos.y + 'px' }">
    我的优势
    <div v-if="showSunInfo" class="sun-info">团队合作、技术能力、快速学习</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const container = ref<HTMLDivElement | null>(null)
const selectedPlanet = ref<Planet | null>(null)
const cardPos = reactive({ x: 0, y: 0 })
const sunCardPos = reactive({ x: 0, y: 0 })
const showSunInfo = ref(false)

interface Planet {
  group: THREE.Group
  mesh: THREE.Object3D
  a: number
  b: number
  angle: number
  speed: number
  advantage: string
  paused?: boolean
}

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  controls: OrbitControls,
  raycaster = new THREE.Raycaster(),
  mouse = new THREE.Vector2(),
  animationId: number

const planets: Planet[] = []
let solarSystem: THREE.Group

onMounted(() => {
  init()
  animate()
  window.addEventListener('click', onMouseClick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  renderer.dispose()
})

function toggleSunInfo() {
  showSunInfo.value = !showSunInfo.value
}

function onMouseClick(event: MouseEvent) {
  if (!container.value) return
  const rect = container.value.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(
    planets.map((p) => p.mesh),
    true
  )

  // 重置所有行星状态
  planets.forEach((p) => (p.paused = false))
  selectedPlanet.value = null

  if (intersects.length > 0) {
    const clicked = planets.find(
      (p) =>
        p.mesh === intersects[0].object ||
        p.mesh === intersects[0].object.parent
    )
    if (clicked) {
      selectedPlanet.value = clicked
      clicked.paused = true // 暂停被点击行星
    }
  }
}

function init() {
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  )
  camera.position.set(0, 50, 120)
  camera.lookAt(0, 0, 0)

  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value?.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true

  scene.add(new THREE.AmbientLight(0xffffff, 0.6))
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(50, 100, 50)
  scene.add(dirLight)

  // 创建顶层太阳系Group
  solarSystem = new THREE.Group()
  scene.add(solarSystem)

  // 太阳
  const sunGeometry = new THREE.SphereGeometry(4, 64, 64)
  const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0xffaa00,
    emissiveIntensity: 0.8,
    roughness: 0.4,
    metalness: 0.8,
  })
  const sun = new THREE.Mesh(sunGeometry, sunMaterial)
  solarSystem.add(sun)

  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  gltfLoader.setDRACOLoader(dracoLoader)

  const planetConfigs = [
    {
      file: '/models/planet1_draco.glb',
      distance: 25,
      scale: 5,
      speed: 0.01,
      advantage: '团队协作能力',
    },
    {
      file: '/models/planet2_draco.glb',
      distance: 45,
      scale: 6,
      speed: 0.008,
      advantage: '项目经验丰富',
    },
    {
      file: '/models/planet3_draco.glb',
      distance: 70,
      scale: 7,
      speed: 0.006,
      advantage: '基础技术技能',
    },
    {
      file: '/models/planet4_draco.glb',
      distance: 100,
      scale: 8,
      speed: 0.004,
      advantage: '快速学习能力',
    },
  ]

  planetConfigs.forEach((config) => {
    const a = config.distance
    const b = config.distance * (0.6 + Math.random() * 0.4)
    const angle = Math.random() * Math.PI * 2
    const segments = 128
    const points: THREE.Vector3[] = []
    const c = Math.sqrt(a * a - b * b)
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * 2 * Math.PI
      points.push(
        new THREE.Vector3(a * Math.cos(theta) - c, 0, b * Math.sin(theta))
      )
    }
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.3,
    })
    const orbitLine = new THREE.LineLoop(orbitGeometry, orbitMaterial)
    solarSystem.add(orbitLine)

    gltfLoader.load(config.file, (gltf) => {
      const planet = gltf.scene
      const box = new THREE.Box3().setFromObject(planet)
      const size = new THREE.Vector3()
      box.getSize(size)
      const center = box.getCenter(new THREE.Vector3())
      planet.position.sub(center)
      const maxAxis = Math.max(size.x, size.y, size.z)
      planet.scale.setScalar(config.scale / maxAxis)

      const group = new THREE.Group()
      solarSystem.add(group)
      const x = a * Math.cos(angle) - c
      const z = b * Math.sin(angle)
      planet.position.set(x, 0, z)
      group.add(planet)

      planets.push({
        group,
        mesh: planet,
        a,
        b,
        angle,
        speed: config.speed,
        advantage: config.advantage,
      })
    })
  })

  window.addEventListener('resize', onWindowResize)
}

// 屏幕坐标转换
function toScreenPosition(obj: THREE.Object3D) {
  const vector = new THREE.Vector3()
  obj.getWorldPosition(vector)
  vector.project(camera)
  const widthHalf = window.innerWidth / 2
  const heightHalf = window.innerHeight / 2
  return {
    x: vector.x * widthHalf + widthHalf,
    y: -vector.y * heightHalf + heightHalf,
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
  animationId = requestAnimationFrame(animate)

  // 行星运动
  planets.forEach((p) => {
    if (!p.paused) {
      p.angle += p.speed
      const c = Math.sqrt(p.a * p.a - p.b * p.b)
      const x = p.a * Math.cos(p.angle) - c
      const z = p.b * Math.sin(p.angle)
      p.mesh.position.set(x, 0, z)
      p.mesh.rotation.y += 0.01
    }
  })

  // 整个太阳系向前移动
  solarSystem.position.z -= 0.05

  // 更新行星卡片位置
  if (selectedPlanet.value) {
    const pos = toScreenPosition(selectedPlanet.value.mesh)
    cardPos.x = pos.x
    cardPos.y = pos.y - 50
  }

  // 太阳卡片位置固定在太阳上方
  const sunPos = toScreenPosition(solarSystem.children[0])
  sunCardPos.x = sunPos.x
  sunCardPos.y = sunPos.y - 50

  controls.update()
  renderer.render(scene, camera)
}
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 行星卡片 */
.info-box {
  position: absolute;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 8px;
  font-size: 1rem;
  pointer-events: none;
  white-space: nowrap;
  transform: translate(-50%, -100%);
  transition: all 0.1s ease;
}

/* 太阳卡片 */
.sun-card {
  pointer-events: auto;
  cursor: pointer;
}

.sun-info {
  margin-top: 5px;
  background: rgba(255, 170, 0, 0.8);
  color: #000;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  white-space: nowrap;
}
</style>
