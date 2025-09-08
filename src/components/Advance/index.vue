<template>
  <section class="pyramid-section">
    <h1 class="section-title">我的优势金字塔</h1>
    <div class="pyramid">
      <div class="floor floor-1">
        <div class="floor-text">独特优势</div>
      </div>

      <div class="floor floor-2">
        <span class="floor-text">独特优势</span>
      </div>

      <div class="floor floor-3">
        <div class="floor-3-block">
          <span class="floor-text">团队协作能力</span>
        </div>
        <div class="floor-3-block">
          <span class="floor-text">项目经验丰富</span>
        </div>
      </div>

      <div class="floor floor-4">
        <div class="floor-4-block">
          <span class="floor-text">基础技术技能</span>
        </div>
        <div class="floor-4-block">
          <span class="floor-text">快速学习能力</span>
        </div>
        <div class="floor-4-block">
          <span class="floor-text">问题解决能力</span>
        </div>
      </div>

      <div class="floor floor-5">
        <span class="floor-text">vue+typescript+</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>
<style scoped>
.pyramid-section {
  width: 100%;
  height: 100%;
  padding: 2rem 0;
  background: linear-gradient(135deg, #0c1324, #040813, #0d1425);

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.section-title {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(0, 255, 204, 0.5);
}

.pyramid {
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.floor {
  border: 1px solid #a0a0a0;
  border-radius: 20px;
}

.floor-1 {
  height: 18%;
  width: 20%;
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-2 {
  height: 18%;
  width: 40%;
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-4-block {
  flex: 0 0 33%;
  border: 1px solid #a0a0a0;
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-5 {
  height: 18%;
  width: 100%;
  border-radius: 99px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.floor-text {
  font-size: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #a0a0a0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
