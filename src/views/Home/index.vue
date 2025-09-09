```vue
<template>
  <div class="home-container">
    <section class="page">
      <Culture />
    </section>
    <section class="page page1">
      <div class="content">
        <div class="avatar"></div>
        <h1 class="gradient-primary font-size-96">前端开发</h1>
        <h1 class="gradient-primary font-size-96">述职报告</h1>
        <div class="font-size-24 text-muted-foreground margin-top-16">
          展示我在前端开发领域的技能成长、项目经验与技术贡献
        </div>
        <div class="info-row">
          <div class="info-item">
            <i class="fas fa-calendar-alt icon"></i>
            <span class="font-size-20 text-muted-foreground"
              >汇报时间：2025年09月</span
            >
          </div>
          <span class="separator">·</span>
          <div class="info-item">
            <i class="fas fa-user icon"></i>
            <span class="font-size-20 text-muted-foreground">汇报人：赵耿</span>
          </div>
        </div>
      </div>
    </section>
    <section class="page section-title">
      <div class="avatar"></div>
      <h1 class="gradient-primary font-size-96">试用期工作总结</h1>
    </section>
    <section class="page">
      <Duty />
    </section>
    <section class="page">
      <MainItem />
    </section>
    <section class="page">
      <Study />
    </section>
    <section class="page">
      <Status />
    </section>
    <section class="page section-title">
      <div class="avatar"></div>
      <h1 class="gradient-primary font-size-96">试用期自我评价</h1>
    </section>
    <section class="page">
      <Advance />
    </section>
    <section class="page">
      <Weakness />
    </section>
    <section class="page">
      <Attitude />
    </section>
    <section class="page section-title">
      <div class="avatar"></div>
      <h1 class="gradient-primary font-size-96">试用期工作体会</h1>
    </section>
    <section class="page">
      <Experience />
    </section>
    111
    <section class="page">
      <Responsibility />
    </section>
    <section class="page">
      <Suggestions />
    </section>
    <section class="page section-title">
      <div class="avatar"></div>
      <h1 class="gradient-primary font-size-96">未来规划与展望</h1>
    </section>

    <section class="page">
      <Career />
    </section>
    <section class="page">
      <Goals />
    </section>
    <section class="page">
      <NextStep />
    </section>
    <section class="page">
      <TheEnd />
    </section>
  </div>

  <!-- <div class="dot-nav">
    <div v-for="(title, index) in pageTitles" :key="index" class="dot-wrapper">
      <div
        :class="['dot', { active: currentIndex === index }]"
        @click="scrollToPage(index)"></div>
      <span class="dot-tooltip">{{ title }}</span>
    </div>
  </div> -->
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Duty from '@/components/Duty/index.vue'
import MainItem from '@/components/Item/index.vue'
import Study from '@/components/Study/index.vue'
import Status from '@/components/Status/index.vue'
import Advance from '@/components/Advance/index.vue'
import Weakness from '@/components/Weakness/index.vue'
import Attitude from '@/components/Attitude/index.vue'
import Experience from '@/components/Experience/index.vue'
import Culture from '@/components/Culture/index.vue'
import Responsibility from '@/components/Responsibility/index.vue'
import Suggestions from '@/components/Suggestions/index.vue'
import Career from '@/components/Career/index.vue'
import Goals from '@/components/Goals/index.vue'
import NextStep from '@/components/NextStep/index.vue'
import TheEnd from '@/components/TheEnd/index.vue'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const pageTitles = [
  '前端岗位职责',
  '主要工作事项',
  '自主学习情况',
  '工作心得体会',
  '总结与展望',
]

const currentIndex = ref(0)

onMounted(() => {
  const sections = gsap.utils.toArray('.page')

  sections.forEach((page, i) => {
    ScrollTrigger.create({
      trigger: page,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      pinSpacing: false,
      snap: 1,
      onUpdate: (self) => {
        if (self.isActive) currentIndex.value = i
      },
      onEnter: () => (currentIndex.value = i),
      onEnterBack: () => (currentIndex.value = i),
    })
  })

  const handleResize = () => ScrollTrigger.refresh()
  window.addEventListener('resize', handleResize)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  })

  ScrollTrigger.refresh()

  gsap.to('.avatar', {
    y: -2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.to('.avatar', {
    scaleY: 1.1,
    scaleX: 0.95,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.from('.info-item', {
    opacity: 0,
    x: -20,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.page1',
      start: 'top 80%',
    },
  })
})

function scrollToPage(index) {
  const sections = gsap.utils.toArray('.page')
  const target = sections[index]
  if (!target) return

  let scrollY = target.offsetTop
  const maxScroll = document.body.scrollHeight - window.innerHeight
  if (scrollY > maxScroll) scrollY = maxScroll

  gsap.to(window, {
    duration: 0.8,
    scrollTo: { y: scrollY, autoKill: false },
    ease: 'power2.out',
    onStart: () => (currentIndex.value = index),
    onComplete: () => ScrollTrigger.refresh(),
  })
}
</script>

<style scoped>
.home-container {
  width: 100%;
}

.page {
  height: 100vh;
  width: 100%;
}

.section-title {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 64px;
  font-weight: bold;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  color: #fff;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page1 {
  background: #1abc9c;
  background-image: url('../../assets/hero-bg.jpg');
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar {
  width: 120px;
  height: 120px;
  background-image: url('../../assets/logo-secxun.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 8px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.separator {
  color: #a0a0a0;
  font-size: 20px;
}

.icon {
  font-size: 18px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dot-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 100;
}

.dot-wrapper {
  position: relative;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #fff;
  transform: scale(1.4);
}

.dot-tooltip {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.dot-wrapper:hover .dot-tooltip {
  opacity: 1;
}

.font-size-96 {
  font-size: 96px;
}

.font-size-24 {
  font-size: 24px;
}

.font-size-20 {
  font-size: 20px;
}

.text-muted-foreground {
  color: #a0a0a0;
}

.margin-top-16 {
  margin-top: 16px;
}
</style>
```
