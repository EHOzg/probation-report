<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div class="section-title">对企业文化的理解</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [
      { title: '以客户为中心', desc: '创造用户价值，追求卓越体验。' },
      { title: '拥抱变化', desc: '快速响应市场，保持灵活性。' },
      { title: '长期主义', desc: '稳健推进未来，坚持长期价值。' },
    ],
  },
  interval: {
    type: Number,
    default: 4000, // 每张卡停留时间
  },
  duration: {
    type: Number,
    default: 1000, // 滚动动画时间
  },
})

const currentIndex = ref(0)
const isTransitioning = ref(true)
let timer = null

function next() {
  if (currentIndex.value < props.items.length) {
    // 正常向下
    currentIndex.value++
  }
}

function handleTransitionEnd() {
  // 如果到达克隆卡片（最后一张）
  if (currentIndex.value === props.items.length) {
    // 立刻跳回真正第一张
    isTransitioning.value = false
    currentIndex.value = 0
    // 下一帧恢复 transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  }
}

function start() {
  stop()
  timer = setInterval(() => {
    next()
  }, props.interval)
}

function stop() {
  if (timer) clearInterval(timer)
}

onMounted(start)
onBeforeUnmount(stop)
</script>

<style scoped lang="scss">
.center-switcher {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f7fa;
}

.stage {
  width: 800px; // 原来 600px
  height: 500px; // 原来 300px
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
}

.cards {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1e293b;
}

.card-desc {
  font-size: 18px;
  color: #475569;
  line-height: 1.5;
  max-width: 80%;
}
</style>
