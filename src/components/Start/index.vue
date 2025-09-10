<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center bg-cover bg-center"
    :style="{ backgroundImage: `url(${heroBg})` }">
    <div
      class="w-28 h-28 bg-contain bg-no-repeat bg-center"
      :style="{ backgroundImage: `url(${logo})` }"
      id="avatar"></div>
    <div
      class="text-8xl font-bold bg-clip-text text-transparent mt-2 primary-text">
      前端开发
    </div>
    <div class="text-8xl font-bold bg-clip-text text-transparent primary-text">
      述职报告
    </div>

    <div class="mt-6 text-2xl text-muted-white">
      展示我在前端开发领域的技能成长、项目经验与技术贡献
    </div>

    <div class="flex items-center mt-6 text-muted-white text-xl" id="info">
      <div class="flex items-center gap-2">
        <i class="fas fa-calendar-alt text-cyan-400"></i>
        <span>汇报时间：2025年09月</span>
      </div>
      <div class="w-6 flex justify-center">·</div>
      <div class="flex items-center gap-2">
        <i class="fas fa-user text-cyan-400"></i>
        <span>汇报人：赵耿</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import heroBg from '@/assets/hero-bg.jpg'
import logo from '@/assets/logo-secxun.png'

onMounted(() => {
  gsap.from('#info', {
    x: -20,
    opacity: 0,
    duration: 2,
    ease: 'power2.out',
  })

  gsap.to('#avatar', {
    y: -2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.to('#avatar', {
    scaleY: 1.1,
    scaleX: 0.95,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
})
</script>
