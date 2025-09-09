<template>
  <section class="center-switcher">
    <div class="stage">
      <div
        class="cards"
        :style="{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: isTransitioning
            ? `transform ${duration}ms cubic-bezier(0.25,1,0.5,1)`
            : 'none',
        }"
        @transitionend="handleTransitionEnd">
        <!-- 正常卡片 -->
        <div v-for="(item, i) in items" :key="i" class="card">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="card-desc">{{ item.desc }}</p>
        </div>
        <!-- 克隆第一张，放在最后 -->
        <div class="card clone">
          <h3 class="card-title">{{ items[0].title }}</h3>
          <p class="card-desc">{{ items[0].desc }}</p>
        </div>
      </div>
    </div>
  </section>
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

.card {
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  box-sizing: border-box;
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
