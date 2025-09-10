<template>
  <section class="thank-you-section">
    <!-- 背景设计 -->
    <div class="bg-design">
      <span class="year">2025</span> <span class="company">SECXUN</span>
    </div>
    <!-- 中心文字 -->
    <div class="content">
      <h1 class="main-title">汇报结束</h1>
      <h2 class="subtitle">感谢聆听</h2>
      <p class="description">安巽科技 · 前端工程师 · 赵耿</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.thank-you-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0c1324, #040813, #0d1425);
  color: #fff;
  overflow: hidden;
  padding: 2rem;
  text-align: center;
}
.bg-design {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
}
.year {
  display: block;
  font-size: 25rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.05);
  line-height: 1;
}
.company {
  display: block;
  font-size: 8rem;
  font-weight: bold;
  color: rgba(0, 255, 255, 0.08);
  margin-top: -2rem; /* 拉近年份和公司缩写 */
  letter-spacing: 1rem;
}
.content {
  position: relative;
  z-index: 1;
}
.main-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.subtitle {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #a0a0a0;
}
.description {
  font-size: 1.2rem;
  color: #a0a0a0;
}
</style>
