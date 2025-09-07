<template>
  <section class="career-improve-section">
    <h1 class="section-title">前端工程师成长展示</h1>
    <div class="improve-container">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="improve-box"
        :class="index % 2 === 0 ? 'left' : 'right'">
        <div class="icon-wrapper" :style="{ background: item.color }">
          <i :class="item.icon"></i>
        </div>
        <div class="content-wrapper">
          <h4 class="item-title">{{ item.title }}</h4>
          <p class="item-desc">{{ item.description }}</p>
          <div class="progress-ring">
            <svg viewBox="0 0 36 36">
              <circle class="bg" cx="18" cy="18" r="15.9155" />
              <circle
                class="progress"
                cx="18"
                cy="18"
                r="15.9155"
                :stroke-dasharray="item.percent + ', 100'" />
            </svg>
            <span class="percent">{{ item.percent }}%</span>
          </div>
          <div class="tags">
            <span
              v-for="(tag, tIndex) in item.tags"
              :key="tIndex"
              class="tag"
              >{{ tag }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = ref([
  {
    title: '技术深度不足',
    description:
      '需要进一步掌握 Vue3、React Hooks、TypeScript 高级类型，提高组件复用和性能优化能力。',
    icon: 'fas fa-laptop-code',
    color: 'linear-gradient(135deg, #ff4d4d, #ff8c4d)',
    percent: 40,
    tags: ['技术', '组件', '性能'],
  },
  {
    title: '团队协作能力',
    description: '沟通与协作效率有待提升，更主动参与团队代码评审和方案讨论。',
    icon: 'fas fa-users',
    color: 'linear-gradient(135deg, #4da6ff, #4dffcc)',
    percent: 55,
    tags: ['团队', '沟通', '协作'],
  },
  {
    title: '项目管理经验',
    description: '对中小型项目的进度管理、任务拆解和文档整理能力需要加强。',
    icon: 'fas fa-project-diagram',
    color: 'linear-gradient(135deg, #ff4dff, #ff99cc)',
    percent: 35,
    tags: ['项目', '管理', '经验'],
  },
  {
    title: '职业规划意识',
    description:
      '目标和路径不够明确，需要制定清晰的个人成长计划和技能提升路线。',
    icon: 'fas fa-rocket',
    color: 'linear-gradient(135deg, #33ff99, #33ccff)',
    percent: 60,
    tags: ['规划', '目标', '成长'],
  },
])

onMounted(async () => {
  await nextTick()

  const boxes = document.querySelectorAll('.improve-box')
  const tl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'back.out(1.7)' },
    scrollTrigger: {
      trigger: '.career-improve-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  boxes.forEach((box, index) => {
    const fromX = index % 2 === 0 ? -200 : 200
    tl.fromTo(
      box,
      { opacity: 0, x: fromX, scale: 0.7 },
      { opacity: 1, x: 0, scale: 1 },
      index * 0.3
    )
  })
})
</script>

<style scoped lang="scss">
.career-improve-section {
  min-height: 100vh;
  padding: 3rem 2rem;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;

  .section-title {
    font-size: 2.8rem;
    margin-bottom: 2.5rem;
    text-align: center;
    background: linear-gradient(135deg, #00ffcc, #ff00cc);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.improve-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 900px;

  .improve-box {
    display: flex;
    gap: 16px;
    padding: 16px 20px;
    border-radius: 16px;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.05);
    align-items: flex-start;
    max-width: 80%;

    &.left {
      flex-direction: row;
      margin-right: auto;
    }

    &.right {
      flex-direction: row-reverse;
      margin-left: auto;
    }

    .icon-wrapper {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      color: #fff;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
      flex-shrink: 0;
      background-clip: border-box;
    }

    .content-wrapper {
      flex: 1;

      .item-title {
        font-size: 1.4rem;
        font-weight: bold;
        margin-bottom: 6px;
        background: linear-gradient(135deg, #00ffcc, #ff00cc);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: left;
      }

      .item-desc {
        font-size: 14px;
        color: #c0c0c0;
        margin-bottom: 12px;
        line-height: 1.5;
        text-align: left;
      }

      .improve-box.right & .item-title,
      .improve-box.right & .item-desc {
        text-align: right;
      }

      .progress-ring {
        position: relative;
        width: 50px;
        height: 50px;
        margin-bottom: 10px;

        svg {
          transform: rotate(-90deg);
          width: 50px;
          height: 50px;

          circle.bg {
            fill: none;
            stroke: rgba(255, 255, 255, 0.2);
            stroke-width: 4;
          }

          circle.progress {
            fill: none;
            stroke: #00ffcc;
            stroke-width: 4;
            stroke-linecap: round;
            transition: stroke-dasharray 0.6s ease;
          }
        }

        .percent {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: bold;
          color: #fff;
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;

        .tag {
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }
      }
    }
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .improve-container .improve-box {
    max-width: 100%;
    flex-direction: column !important;
    text-align: left !important;

    .content-wrapper .item-title,
    .content-wrapper .item-desc {
      text-align: left !important;
    }

    .icon-wrapper {
      margin-bottom: 8px;
    }
  }
}
</style>
