<template>
  <div
    class="w-full min-h-screen relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div
      ref="timelineContainer"
      class="timeline-container"
      style="height: 100vh; overflow-y: auto; scroll-behavior: smooth">
      <div class="relative w-full max-w-6xl mx-auto py-12">
        <div class="section-title">主要工作事项</div>
        <div
          class="w-0.5 bg-cyan-400 rounded-full absolute left-1/2 transform -translate-x-1/2 h-full"
          ref="progressBar"></div>
        <div
          v-for="(item, index) in timelineItems"
          :key="index"
          class="relative flex items-center mb-12"
          id="timeline-item">
          <div
            class="w-1/2 p-4 flex"
            :style="{
              order: index % 2 === 0 ? 2 : 1,
              textAlign: index % 2 === 0 ? 'left' : 'right',
              justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
            }">
            <div class="card w-60">
              <div class="text-4xl font-bold text-white whitespace-pre-line">
                {{ item.year.replace('~', '\n') }}
              </div>
              <div class="text-gray-200 mt-2">{{ item.description }}</div>
            </div>
          </div>
          <div class="w-1/2" :class="{ 'order-1': index % 2 !== 0 }"></div>
          <div
            class="absolute w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2"
            :style="{
              backgroundColor: index % 2 === 0 ? 'white' : '#10b981',
            }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const progressBar = ref(null)
const timelineContainer = ref(null)
const timelineItems = ref([
  { year: '04-07', description: '广州市局-档案配置-Figma原型-项目交接' },
  { year: '04-09', description: '金钟罩-天地图-mark&search' },
  { year: '04-10~04-29', description: '广州市局-人员档案弹窗' },
  {
    year: '04-15',
    description: '肇庆银安通-app-项目交接',
  },
  { year: '04-17', description: '肇庆银安通-app-ocr-tesseract.js' },
  { year: '04-24~05-07', description: '肇庆银安通-app-线索上报' },
  { year: '04-28', description: '肇庆银安通-app-hybird-文件上传混合开发' },
  { year: '04-29', description: '肇庆银安通-app-外携审批' },
  { year: '05-07~05-12', description: '肇庆银安通-app-持续开发' },
  { year: '05-13', description: '肇庆银安通-app-1.0.0上线' },
  { year: '05-15', description: '肇庆银安通-app-截图监听-ext.api引入' },
  { year: '05-18', description: '肇庆银安通-app-plus处理二进制文件流下载' },
  { year: '05-20', description: '肇庆银安通-app-1.2.0发布' },
  { year: '05-26', description: '肇庆银安通-app-点位上报' },
  {
    year: '06-10~06-16',
    description: '肇庆银安通-web-1.2.0交接',
  },
  { year: '06-30', description: '肇庆银安通-web-细节交接' },
  { year: '07-01~08-01', description: '肇庆银安通-app/web-1.3.0' },
  { year: '08-14', description: '肇庆银安通-web/app-1.3.0上线' },
])

onMounted(() => {
  // Timeline items animation
  gsap.utils.toArray('#timeline-item').forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: item,
          scroller: timelineContainer.value, // 关键：指定内部滚动容器
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    )
  })

  // Progress bar animation
  gsap.to(progressBar.value, {
    height: '100%',
    scrollTrigger: {
      trigger: timelineContainer.value,
      scroller: timelineContainer.value, // 关键：内部滚动容器
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
    },
  })

  // 阻止父组件 ScrollTrigger 在 TimeLine 内滚动时触发
  timelineContainer.value.addEventListener('wheel', (e) => {
    const container = timelineContainer.value
    const delta = e.deltaY
    if (
      (delta > 0 &&
        container.scrollTop + container.clientHeight >=
          container.scrollHeight) ||
      (delta < 0 && container.scrollTop <= 0)
    ) {
      // 到达顶部或底部，让父组件继续滚动
      return
    }
    e.stopPropagation() // 阻止事件冒泡到父组件
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((t) => t.kill())
})
</script>

<style scoped>
/* For modern browsers */
.timeline-container {
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
}

/* Chrome, Edge, Safari */
.timeline-container::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>
