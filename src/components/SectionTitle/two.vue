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
        <div class="text-8xl font-bold gradient-text">试用期自我评价</div>
        <div class="mt-2 text-2xl text-muted-white">
          展示我在前端开发领域的技能成长、项目经验与技术贡献
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/logo-secxun.png'
</script>

<style scoped>
.gradient-text {
  font-weight: 800;
  font-size: 6rem;
  background: linear-gradient(135deg, hsl(263, 70%, 50%), hsl(142, 76%, 36%));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.text-muted-white {
  color: rgba(255, 255, 255, 0.7);
}
</style>
