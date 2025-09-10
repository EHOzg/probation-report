<template>
  <div
    class="w-full h-screen flex justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <!-- 内容卡片 -->
    <div class="flex items-center gap-8 p-8 z-10">
      <!-- Avatar -->
      <div
        id="avatar"
        class="w-28 h-28 bg-contain bg-no-repeat bg-center"
        :style="{ backgroundImage: `url(${logo})` }"></div>

      <!-- 标题文字 -->
      <div class="flex flex-col gap-2">
        <div class="text-8xl font-bold gradient-text">试用期工作总结</div>
        <div class="mt-2 text-2xl text-muted-white text-end">
          2025-04-07 - 2025-10-07
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/logo-secxun.png'
</script>
