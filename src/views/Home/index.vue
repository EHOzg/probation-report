<template>
  <div class="home-container">
    <section v-for="(comp, i) in pages" :key="i" class="page">
      <component :is="comp" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// 引入所有页面组件
import Start from '@/components/Start/index.vue'
import TitleSectionOne from '@/components/SectionTitle/one.vue'
import Duty from '@/components/Duty/index.vue'
import TimeLine from '@/components/TimeLine/index.vue'
import Study from '@/components/Study/index.vue'
import Status from '@/components/Status/index.vue'
import TitleSectionTwo from '@/components/SectionTitle/two.vue'
import Advance from '@/components/Advance/index.vue'
import Weakness from '@/components/Weakness/index.vue'
import Attitude from '@/components/Attitude/index.vue'
import TitleSectionThree from '@/components/SectionTitle/three.vue'
import Experience from '@/components/Experience/index.vue'
import Culture from '@/components/Culture/index.vue'
import Responsibility from '@/components/Responsibility/index.vue'
import Suggestions from '@/components/Suggestions/index.vue'
import TitleSectionFour from '@/components/SectionTitle/four.vue'
import Career from '@/components/Career/index.vue'
import Goals from '@/components/Goals/index.vue'
import NextStep from '@/components/NextStep/index.vue'
import TheEnd from '@/components/TheEnd/index.vue'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const pages = ref([
  Start,
  TitleSectionOne,
  Duty,
  TimeLine,
  Study,
  Status,
  TitleSectionTwo,
  Advance,
  Weakness,
  Attitude,
  TitleSectionThree,
  Experience,
  Culture,
  Responsibility,
  Suggestions,
  TitleSectionFour,
  Career,
  Goals,
  NextStep,
  TheEnd,
])

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
      onEnter: () => (currentIndex.value = i),
      onEnterBack: () => (currentIndex.value = i),
    })
  })

  const handleResize = () => ScrollTrigger.refresh()
  window.addEventListener('resize', handleResize)

  ScrollTrigger.refresh()
})

const currentIndex = ref(0)

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
}
</style>
