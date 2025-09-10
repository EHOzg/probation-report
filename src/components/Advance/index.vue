```vue
<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div class="section-title">我的优势</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Floor {
  text?: string
  items?: string[]
}

// 定义金字塔每层的数据
const floors = ref<Floor[]>([
  { text: '独特优势' },
  { text: '核心竞争力' },
  { items: ['团队协作能力', '项目经验丰富'] },
  { items: ['基础技术技能', '快速学习能力', '问题解决能力'] },
  { text: 'Vue + TypeScript + 现代前端技术' },
])
</script>

<style scoped>
.pyramid-section {
  width: 100%;
  height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, #0c1324, #040813, #0d1425);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* align-items: center;
  justify-content: center; */
}

.pyramid {
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}

.pyramid-bg {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.3;
  z-index: 0;
}

.floor {
  border: 1px solid #a0a0a0;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-1 {
  height: 18%;
  width: 20%;
  border-radius: 99px;
}

.floor-2 {
  height: 18%;
  width: 40%;
  border-radius: 99px;
}

.floor-3 {
  height: 18%;
  width: 60%;
  border: none;
  display: flex;
  justify-content: space-around;
}

.floor-4 {
  height: 18%;
  width: 80%;
  border: none;
  display: flex;
  justify-content: space-around;
}

.floor-3-block {
  flex: 0 0 49%;
  border: 1px solid #a0a0a0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-4-block {
  flex: 0 0 33%;
  border: 1px solid #a0a0a0;
  border-radius: 99px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-5 {
  height: 18%;
  width: 100%;
  border-radius: 99px;
}

.floor-text {
  font-size: clamp(1rem, 2vw, 1.5rem); /* 自适应字体大小 */
  text-align: center;
  background: linear-gradient(135deg, #ffffff, #a0a0a0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  white-space: nowrap; /* 防止文字换行 */
  padding: 0.5rem;
}
</style>
```
