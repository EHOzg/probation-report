<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div class="text-4xl font-bold gradient-text">前端工程师职责</div>

    <div class="flex flex-col gap-4">
      <h4 class="primary-title">核心职责</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-200">
        <div
          v-for="(duty, index) in duties"
          :key="'duty-' + index"
          class="card">
          <div class="flex items-center gap-2.5 mb-3">
            <i :class="duty.icon" class="primary-icon text-xl"></i>
            <span class="text-lg text-white">{{ duty.title }}</span>
          </div>
          <p class="text-xs text-muted-white mt-2.5">{{ duty.description }}</p>
        </div>
      </div>
      <h4 class="primary-title">技能掌握</h4>
      <div class="skills-row">
        <div v-for="(skill, index) in skills" :key="index" class="card">
          <div class="card-content">
            <div class="title-with-icon">
              <i :class="skill.icon" class="icon"></i>
              <span class="skill-name">{{ skill.name }}</span>
              <span class="percentage">{{ skill.percentage }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress"
                :style="{ width: skill.percentage + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from '../TextLogo/index.vue'

gsap.registerPlugin(ScrollTrigger)

const skills = ref([
  { name: 'Vue.js', percentage: 88, icon: 'fab fa-vuejs' },
  { name: 'React', percentage: 95, icon: 'fab fa-react' },
  { name: 'TypeScript', percentage: 90, icon: 'fab fa-js' },
  { name: 'JavaScript', percentage: 95, icon: 'fab fa-js-square' },
  { name: 'CSS/SCSS', percentage: 92, icon: 'fab fa-css3-alt' },
  { name: 'Node.js', percentage: 85, icon: 'fab fa-node-js' },
  { name: 'uniapp', percentage: 85, icon: 'fas fa-mobile-alt' },
  { name: 'H5+', percentage: 85, icon: 'fab fa-html5' },
])

const duties = ref([
  {
    title: '开发页面',
    description:
      '负责前端页面搭建与功能实现，根据设计稿完成交互和视觉效果，保证用户体验流畅与一致性。',
    icon: 'fas fa-code',
  },
  {
    title: '团队协作',
    description:
      '与UI设计和后端开发紧密合作，确保页面功能和视觉效果一致，同时高效解决开发中遇到的问题。',
    icon: 'fas fa-users',
  },
  {
    title: '优化维护',
    description:
      '对前端代码和页面进行优化，提高加载速度与响应性能，并持续维护和修复前端问题，确保系统稳定运行。',
    icon: 'fas fa-tools',
  },
])

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.duty-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })

  tl.from('.card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  })

  // Hover animations for all cards
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        rotation: 0,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        rotation: 0,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })

  const projectCards = document.querySelectorAll('.project-card')
  const totalCards = projectCards.length
  if (totalCards > 0) {
    const cardHeight = projectCards[0].offsetHeight + 20
    let currentIndex = 0

    const scrollProjects = () => {
      gsap.to('.projects-row', {
        y: -currentIndex * cardHeight,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
          currentIndex = (currentIndex + 1) % totalCards
          setTimeout(scrollProjects, 5000) // Auto-scroll every 5 seconds
        },
      })
    }

    scrollProjects()
  }
})
</script>

<style lang="scss" scoped>
.duty-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  padding: 2rem;
  color: #fff;
  position: relative;
  overflow: hidden;
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

.container {
  display: flex;
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.left-panel {
  width: 70%;
  position: relative;
}

.right-panel {
  width: 30%;
  position: relative;
  // height: 80%;
}

.projects-container {
  // height: 80%;
  overflow: hidden;
  position: relative;
}

.projects-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.project-card {
  min-height: 350px;
  flex-shrink: 0; /* Prevent cards from shrinking */
}

.skills-row,
.duties-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
}

.skill-name {
  font-size: 18px;
  color: #fff;
}

.project-description {
  font-size: 14px;
  color: #a0a0a0;
  margin-bottom: 12px;
  line-height: 1.4;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.tech-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tech-icon {
  font-size: 16px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tech-name {
  font-size: 14px;
  color: #fff;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-bar {
  flex-grow: 1;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, #00ffcc, #ff00cc);
  transition: width 0.3s ease;
}

.percentage {
  font-size: 12px;
  color: #fff;
  min-width: 40px;
  text-align: right;
}

.duty-description {
  font-size: 14px;
  color: #a0a0a0;
  margin-top: 10px;
  line-height: 1.4;
}

.commits-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 15px 0;
  padding: 12px;
  // background: rgba(0, 255, 204, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(0, 255, 204, 0.2);
}

.commit-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.commit-value {
  font-size: 18px;
  font-weight: bold;
  color: #00ffcc;
  margin-bottom: 4px;
}

.commit-label {
  font-size: 12px;
  color: #a0a0a0;
}

/* Gradient styles for skills cards */
.skills-row .card:nth-child(1) .progress {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
}
.skills-row .card:nth-child(1) .icon {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(2) .progress {
  background: linear-gradient(90deg, #007bff, #00ffcc);
}
.skills-row .card:nth-child(2) .icon {
  background: linear-gradient(90deg, #007bff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(3) .progress {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
}
.skills-row .card:nth-child(3) .icon {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(4) .progress {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
}
.skills-row .card:nth-child(4) .icon {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(5) .progress {
  background: linear-gradient(90deg, #ff00cc, #cc00ff);
}
.skills-row .card:nth-child(5) .icon {
  background: linear-gradient(90deg, #ff00cc, #cc00ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(6) .progress {
  background: linear-gradient(90deg, #00ff00, #00cc00);
}
.skills-row .card:nth-child(6) .icon {
  background: linear-gradient(90deg, #00ff00, #00cc00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(7) .progress {
  background: linear-gradient(90deg, #ff6600, #ffcc00);
}
.skills-row .card:nth-child(7) .icon {
  background: linear-gradient(90deg, #ff6600, #ffcc00);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.skills-row .card:nth-child(8) .progress {
  background: linear-gradient(90deg, #cc00ff, #ff00cc);
}
.skills-row .card:nth-child(8) .icon {
  background: linear-gradient(90deg, #cc00ff, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Gradient styles for project cards */
.projects-row .card:nth-child(1) .tech-item.tech-0 .progress {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
}
.projects-row .card:nth-child(1) .tech-item.tech-1 .progress {
  background: linear-gradient(90deg, #ff00cc, #cc00ff);
}
.projects-row .card:nth-child(1) .tech-item.tech-2 .progress {
  background: linear-gradient(90deg, #00ff00, #00cc00);
}
.projects-row .card:nth-child(1) .tech-item.tech-3 .progress {
  background: linear-gradient(90deg, #ff6600, #ffcc00);
}
.projects-row .card:nth-child(1) .tech-item.tech-4 .progress {
  background: linear-gradient(90deg, #007bff, #00ffcc);
}

.projects-row .card:nth-child(2) .tech-item.tech-0 .progress {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
}
.projects-row .card:nth-child(2) .tech-item.tech-1 .progress {
  background: linear-gradient(90deg, #007bff, #00ffcc);
}
.projects-row .card:nth-child(2) .tech-item.tech-2 .progress {
  background: linear-gradient(90deg, #ff00cc, #cc00ff);
}
.projects-row .card:nth-child(2) .tech-item.tech-3 .progress {
  background: linear-gradient(90deg, #00ff00, #00cc00);
}

.projects-row .card:nth-child(3) .tech-item.tech-0 .progress {
  background: linear-gradient(90deg, #00ffcc, #00d4ff);
}
.projects-row .card:nth-child(3) .tech-item.tech-1 .progress {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
}
.projects-row .card:nth-child(3) .tech-item.tech-2 .progress {
  background: linear-gradient(90deg, #00d4ff, #ff00cc);
}
.projects-row .card:nth-child(3) .tech-item.tech-3 .progress {
  background: linear-gradient(90deg, #007bff, #00ffcc);
}

/* Duties card icon theme */
.duties-row .card .icon {
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
