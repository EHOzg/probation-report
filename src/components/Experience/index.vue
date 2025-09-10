<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div class="section-title">工作心得</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const insights = ref([
  {
    title: '高效沟通与团队协作',
    text: '在项目开发过程中，积极沟通可以避免重复劳动和低效协作，通过每日站会、文档共享与同步讨论，团队整体效率显著提升。',
    image: '/illustrations/collaboration.png',
  },
  {
    title: '技术精进与持续学习',
    text: '前端技术更新迅速，持续学习新技术和优化旧代码能够保持竞争力，学习并实践最新框架、工具和设计模式，让项目质量不断提高。',
    image: '/illustrations/learning.png',
  },
  {
    title: '项目管理与经验总结',
    text: '独立管理小型项目可以锻炼时间规划、任务分配和风险预判能力，定期总结经验和复盘项目，有助于未来更大规模项目管理。',
    image: '/illustrations/project.png',
  },
])
</script>

<style scoped lang="scss">
.work-insight-section {
  min-height: 100vh;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom, #0c1324, #040813);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.insights-container {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 1000px;
}

.insight-card {
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  padding: 2rem;
  border-radius: 16px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.insight-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 255, 255, 0.3);
}

.flex-row {
  flex-direction: row;
}

.flex-row-reverse {
  flex-direction: row-reverse;
}

.insight-illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    max-width: 300px;
    border-radius: 12px;
  }
}

.insight-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.insight-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ffcc, #ff33cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.insight-text {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #c0c0c0;
}
</style>
