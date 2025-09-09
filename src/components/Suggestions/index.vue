<template>
  <section class="postcard-section">
    <svg class="background-cityscape" viewBox="0 0 1000 1000">
      <path class="city-line" d="M0,300 Q250,250 500,300 T1000,300" />
      <path class="city-line" d="M0,500 Q250,450 500,500 T1000,500" />
      <circle class="city-light" cx="200" cy="400" r="10" />
      <circle class="city-light" cx="800" cy="450" r="8" />
      <path
        class="cloud"
        d="M150,150 Q200,100 250,150 T350,150 Q300,100 250,150" />
      <path
        class="cloud"
        d="M650,200 Q700,150 750,200 T850,200 Q800,150 750,200" />
    </svg>
    <div class="postcard-container">
      <div class="postcard">
        <div class="postcard-decor">
          <div class="stamp stamp-1"></div>
          <div class="stamp stamp-2"></div>
          <div class="postmark"></div>
        </div>
        <h1 class="postcard-title">对公司的意见与建议</h1>
        <div class="messages">
          <div
            v-for="(suggestion, index) in suggestions"
            :key="'suggestion-' + index"
            class="message"
            @mouseenter="expandMessage(index)"
            @mouseleave="collapseMessage(index)"
            @click="toggleMessage(index)">
            <div
              class="message-inner"
              :class="{ expanded: expandedMessages[index] }">
              <div class="message-front">
                <i :class="suggestion.icon" class="message-icon"></i>
                <h3>{{ suggestion.title }}</h3>
              </div>
              <div class="message-content">
                <h3>{{ suggestion.title }}</h3>
                <p class="suggestion-opinion">
                  <strong>观点：</strong> {{ suggestion.opinion }}
                </p>
                <p class="suggestion-detail">
                  <strong>建议：</strong> {{ suggestion.suggestion }}
                </p>
                <p class="suggestion-hotspot">
                  <strong>热点关联：</strong> {{ suggestion.hotspot }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const suggestions = ref([
  {
    title: '加强数据安全',
    opinion: '强化数据安全是我们打造可信数字社会使命的核心，增强用户信任。',
    suggestion:
      '部署AI驱动的威胁检测和高级加密技术，定期进行合规性审计，确保符合数据保护法规。',
    hotspot:
      '应对数据泄露和AI换脸诈骗等热点问题，巩固企业在网络安全领域的领导地位。',
    icon: 'fas fa-lock',
  },
  {
    title: '推动持续创新',
    opinion: '在AI与安全技术上的创新驱动我们实现竞争未来的愿景。',
    suggestion: '建立AI创新实验室，激励员工提出突破性想法，加速技术研发。',
    hotspot: '响应AI驱动行业的需求，通过垂直模型构建技术壁垒，提升竞争力。',
    icon: 'fas fa-lightbulb',
  },
  {
    title: '促进员工成长',
    opinion: '支持员工学习与韧性赋能团队发展，践行我们的价值观。',
    suggestion:
      '提供导师制、AI与安全培训课程，以及心理健康项目以缓解职场压力。',
    hotspot: '应对“大厂裁员潮”和“职业焦虑”热点，助力员工建立成长导向心态。',
    icon: 'fas fa-user-graduate',
  },
  {
    title: '增强团队协作',
    opinion: '加强协作体现尊重与团结的价值观，提升效率与目标达成。',
    suggestion: '推广团队建设活动和跨职能项目，使用实时协作工具提高透明度。',
    hotspot: '对抗“内卷”文化，倡导团队协作而非个人竞争，提升整体效能。',
    icon: 'fas fa-users',
  },
])

const expandedMessages = ref({})

const expandMessage = (index) => {
  if (window.innerWidth > 768) {
    expandedMessages.value[index] = true
  }
}

const collapseMessage = (index) => {
  if (window.innerWidth > 768) {
    expandedMessages.value[index] = false
  }
}

const toggleMessage = (index) => {
  expandedMessages.value[index] = !expandedMessages.value[index]
}

onMounted(() => {
  gsap.from('.postcard', {
    opacity: 0,
    scale: 0.7,
    rotation: 5,
    duration: 1.8,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '.postcard-container',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.from('.message', {
    opacity: 0,
    x: -50,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.messages',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  gsap.to('.postcard', {
    rotation: -3,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.to('.city-line', {
    strokeDashoffset: 0,
    duration: 5,
    repeat: -1,
    ease: 'none',
  })

  gsap.to('.city-light', {
    r: 13,
    opacity: 0.8,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.3,
  })

  gsap.to('.cloud', {
    x: 60,
    duration: 12,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })

  gsap.to('.stamp', {
    rotation: 12,
    scale: 1.1,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    stagger: 0.2,
  })
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');

.postcard-section {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0a1122, #1a2333);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.postcard-container {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.postcard {
  background: #2a3a5a
    url('https://www.transparenttextures.com/patterns/paper-fibers.png') repeat;
  border: 3px solid linear-gradient(135deg, #00d4ff, #9b59b6);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.postcard-decor {
  .stamp {
    position: absolute;
    width: 70px;
    height: 90px;
    background: linear-gradient(135deg, #00d4ff, #9b59b6);
    border: 2px solid #7a4686;
    border-radius: 8px;
    z-index: 2;
  }

  .stamp-1 {
    top: 20px;
    right: 20px;
    transform: rotate(10deg);
  }

  .stamp-2 {
    top: 90px;
    right: 30px;
    transform: rotate(-8deg);
  }

  .postmark {
    position: absolute;
    top: 60px;
    right: 60px;
    width: 50px;
    height: 50px;
    background: url('https://www.transparenttextures.com/patterns/stamp.png')
      center/contain no-repeat;
    opacity: 0.6;
  }
}

.postcard-title {
  font-size: 2.8rem;
  font-family: 'Caveat', cursive;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #00d4ff, #9b59b6);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.message {
  perspective: 1000px;
  height: 90px;
  transition: height 0.5s ease;
}

.message-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease, height 0.5s ease, box-shadow 0.5s ease;
  transform-style: preserve-3d;
  background: #2a3a5a;
  border: 1px solid #7a4686;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.message-inner.expanded {
  height: 320px;
  transform: translateY(-10px) rotateY(180deg);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

.message-front,
.message-content {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 1rem;
  display: flex;
  align-items: center;
  text-align: left;
}

.message-front {
  .message-icon {
    font-size: 1.8rem;
    color: #00d4ff;
    margin-right: 1rem;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.3rem;
    color: #fff;
    font-family: 'Caveat', cursive;
  }

  .message:hover & .message-icon {
    transform: scale(1.2);
  }
}

.message-content {
  display: none;
  flex-direction: column;
  padding: 1.5rem;
  font-family: 'Caveat', cursive;

  h3 {
    font-size: 1.2rem;
    color: #00d4ff;
    margin-bottom: 1rem;
  }

  .suggestion-opinion,
  .suggestion-detail {
    font-size: 1rem;
    color: #a0a0a0;
    line-height: 1.5;
    margin-bottom: 0.8rem;
  }

  .suggestion-hotspot {
    font-size: 0.9rem;
    color: #6b2d5c;
    line-height: 1.4;
  }
}

.message-inner.expanded .message-front {
  display: none;
}

.message-inner.expanded .message-content {
  display: flex;
}

.background-cityscape {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.15;

  .city-line {
    stroke: #00d4ff;
    stroke-width: 3;
    fill: none;
    stroke-dasharray: 60;
    stroke-dashoffset: 60;
  }

  .city-light {
    fill: #00d4ff;
    opacity: 0.5;
  }

  .cloud {
    fill: #4a5b8c;
    opacity: 0.3;
  }
}

@media (max-width: 768px) {
  .postcard-container {
    max-width: 95%;
  }

  .postcard-title {
    font-size: 2.2rem;
  }

  .message {
    height: 80px;
  }

  .message-inner.expanded {
    height: 280px;
  }

  .message-front .message-icon {
    font-size: 1.5rem;
  }

  .message-front h3 {
    font-size: 1.1rem;
  }

  .message-content h3 {
    font-size: 1rem;
  }

  .message-content .suggestion-opinion,
  .message-content .suggestion-detail {
    font-size: 0.9rem;
  }

  .message-content .suggestion-hotspot {
    font-size: 0.8rem;
  }

  .stamp {
    width: 60px;
    height: 80px;
  }

  .postmark {
    width: 40px;
    height: 40px;
  }
}
</style>
