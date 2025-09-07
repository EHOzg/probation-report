<template>
  <section class="career-chat-section">
    <h1 class="section-title">职业规划</h1>
    <div class="chat-container">
      <div
        v-for="(dialog, index) in dialogs"
        :key="index"
        class="chat-box"
        :class="index % 2 === 0 ? 'left' : 'right'">
        <div class="avatar" :style="{ backgroundColor: dialog.color }">
          <i :class="dialog.icon"></i>
        </div>
        <div class="chat-content">
          <h4 class="chat-title">{{ dialog.title }}</h4>
          <p class="chat-text">{{ dialog.description }}1</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const dialogs = ref([
  {
    title: '技术精进',
    description:
      '深入掌握 Vue、React、TypeScript 等前端技术栈，提高组件化和性能优化能力，持续提升工程水平。',
    icon: 'fas fa-laptop-code',
    color: '#00d4ff',
  },
  {
    title: '团队协作',
    description:
      '积极参与团队项目，与设计、后端和产品保持高效沟通，推动协作流程优化，提升整体开发效率和代码质量。',
    icon: 'fas fa-users',
    color: '#ff6a00',
  },
  {
    title: '项目管理',
    description:
      '尝试独立负责中小型项目，管理开发进度、文档和版本控制，积累项目管理经验，为未来领导岗位做准备。',
    icon: 'fas fa-project-diagram',
    color: '#ff00cc',
  },
  {
    title: '职业发展',
    description:
      '明确职业发展目标，持续关注前端新技术和行业趋势，提升软硬技能，逐步成长为高级前端工程师或技术负责人。',
    icon: 'fas fa-rocket',
    color: '#00ff88',
  },
])

onMounted(async () => {
  await nextTick()

  const boxes = document.querySelectorAll('.chat-box')
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: 'back.out(1.7)' },
  })

  boxes.forEach((box, index) => {
    const fromX = index % 2 === 0 ? -200 : 200
    tl.fromTo(
      box,
      { opacity: 0, x: fromX, scale: 0.5 },
      { opacity: 1, x: 0, scale: 1 },
      '+=0.5'
    )
  })
})

const attitudes = ref([
  {
    title: '认真负责 ✅ 保证每一行代码都高质量！',
    icon: 'fas fa-check-circle',
    color: '#00d4ff',
    top: 5,
    size: 18,
  },
  {
    title: '主动学习 📚 不断探索新技术',
    icon: 'fas fa-book',
    color: '#ff6a00',
    top: 15,
    size: 20,
  },
  {
    title: '积极沟通 💬 与团队无缝协作',
    icon: 'fas fa-comments',
    color: '#ff00cc',
    top: 25,
    size: 18,
  },
  {
    title: '团队协作 🤝 共同成长',
    icon: 'fas fa-users',
    color: '#00ff88',
    top: 35,
    size: 19,
  },
  {
    title: '创新思维 💡 敢于尝试新方案',
    icon: 'fas fa-lightbulb',
    color: '#ffcc00',
    top: 45,
    size: 18,
  },
  {
    title: '高效执行 ⚡ 快速完成任务',
    icon: 'fas fa-bolt',
    color: '#33ccff',
    top: 55,
    size: 20,
  },
  {
    title: '持续优化 🔄 不断改进',
    icon: 'fas fa-sync-alt',
    color: '#ff33cc',
    top: 65,
    size: 18,
  },
  {
    title: '关注细节 🔍 精益求精',
    icon: 'fas fa-search',
    color: '#00ffcc',
    top: 75,
    size: 19,
  },
  {
    title: '积极反馈 💌 分享经验与问题',
    icon: 'fas fa-comment-dots',
    color: '#ff6600',
    top: 85,
    size: 18,
  },
  {
    title: '乐于分享 🎉 知识传递很重要',
    icon: 'fas fa-share-alt',
    color: '#cc00ff',
    top: 95,
    size: 18,
  },

  {
    title: '责任心强 ❤️ 对项目全程负责',
    icon: 'fas fa-handshake',
    color: '#00ffff',
    top: 10,
    size: 16,
  },
  {
    title: '代码优雅 ✨ 写出可维护的代码',
    icon: 'fas fa-code',
    color: '#ff99cc',
    top: 20,
    size: 17,
  },
  {
    title: '快速响应 🏃‍♂️ 即时处理问题',
    icon: 'fas fa-tachometer-alt',
    color: '#ff9933',
    top: 30,
    size: 18,
  },
  {
    title: '技术分享 🗣️ 分享最佳实践',
    icon: 'fas fa-chalkboard-teacher',
    color: '#33ff99',
    top: 40,
    size: 16,
  },
  {
    title: '持续学习 📖 永远保持好奇心',
    icon: 'fas fa-graduation-cap',
    color: '#ccff33',
    top: 50,
    size: 18,
  },
  {
    title: '勇于挑战 🎯 接受高难度任务',
    icon: 'fas fa-flag',
    color: '#ff33aa',
    top: 60,
    size: 17,
  },
  {
    title: '善于沟通 💡 解决冲突',
    icon: 'fas fa-comments',
    color: '#00ccff',
    top: 70,
    size: 18,
  },
  {
    title: '独立思考 🧠 自主解决问题',
    icon: 'fas fa-brain',
    color: '#ff6600',
    top: 80,
    size: 16,
  },
  {
    title: '保持热情 🔥 永不熄灭',
    icon: 'fas fa-fire',
    color: '#ff4444',
    top: 12,
    size: 16,
  },
  {
    title: '敢于尝试 🌟 不怕失败',
    icon: 'fas fa-star',
    color: '#ffcc00',
    top: 18,
    size: 17,
  },
  {
    title: '关注用户 ❤️ 用户体验优先',
    icon: 'fas fa-user',
    color: '#00ffcc',
    top: 22,
    size: 18,
  },
  {
    title: '整理文档 📝 代码与思路清晰',
    icon: 'fas fa-file-alt',
    color: '#cc00ff',
    top: 32,
    size: 16,
  },
  {
    title: '保持专注 🎯 深入解决问题',
    icon: 'fas fa-bullseye',
    color: '#33ccff',
    top: 38,
    size: 17,
  },
])
</script>

<style lang="scss" scoped>
.career-chat-section {
  min-height: 100vh;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.section-title {
  font-size: 2.5rem;
  color: #00ffcc;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.chat-box {
  display: flex;
  gap: 12px;
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.05);
  align-items: flex-start;

  background: #090e1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.chat-box.left {
  flex-direction: row;
  margin-right: auto;
}

.chat-box.right {
  flex-direction: row-reverse;
  margin-left: auto;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
}

.chat-content {
  flex: 1;
}

.chat-box.left .chat-content {
  text-align: left; /* 左侧气泡文字靠左 */
}

.chat-box.right .chat-content {
  text-align: left; /* 右侧气泡文字靠右 */
}

.chat-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 4px;
  background: linear-gradient(135deg, #00ffcc, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.chat-text {
  font-size: 14px;
  color: #c0c0c0;
  line-height: 1.5;
}
</style>
