<template>
  <section class="duty-section">
    <h1 class="section-title">前端工程师职责</h1>
    <div class="container">
      <div class="left-panel">
        <h4 class="row-title">核心职责</h4>
        <div class="duties-row">
          <div
            v-for="(duty, index) in duties"
            :key="'duty-' + index"
            class="card">
            <div class="card-content">
              <div class="title-with-icon">
                <i :class="duty.icon" class="icon"></i>
                <span class="skill-name">{{ duty.title }}</span>
              </div>
              <p class="duty-description">{{ duty.description }}</p>
            </div>
          </div>
        </div>
        <h4 class="row-title">技能掌握</h4>
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
      <div class="right-panel">
        <h4 class="row-title">项目技术展示</h4>
        <div class="projects-container">
          <div class="projects-row">
            <div
              v-for="(project, index) in projects"
              :key="'project-' + index"
              class="card project-card">
              <div class="card-content">
                <div class="title-with-icon">
                  <i class="fas fa-project-diagram icon"></i>
                  <span class="skill-name">{{ project.name }}</span>
                </div>
                <p class="project-description">{{ project.description }}</p>
                <div class="tech-list">
                  <div
                    v-for="(tech, techIndex) in project.technologies"
                    :key="'tech-' + techIndex"
                    class="tech-item"
                    :class="'tech-' + techIndex">
                    <div class="tech-title">
                      <i :class="tech.icon" class="tech-icon"></i>
                      <span class="tech-name">{{ tech.name }}</span>
                    </div>
                    <div class="progress-container">
                      <div class="progress-bar">
                        <div
                          class="progress"
                          :style="{ width: tech.percentage + '%' }"></div>
                      </div>
                      <span class="percentage">{{ tech.percentage }}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from '../TextLogo/index.vue'

gsap.registerPlugin(ScrollTrigger)

const skills = ref([
  { name: 'React', percentage: 95, icon: 'fab fa-react' },
  { name: 'TypeScript', percentage: 90, icon: 'fab fa-js' },
  { name: 'Vue.js', percentage: 88, icon: 'fab fa-vuejs' },
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
      '与UI设计师和后端开发紧密合作，确保页面功能和视觉效果一致，同时高效解决开发中遇到的问题。',
    icon: 'fas fa-users',
  },
  {
    title: '优化维护',
    description:
      '对前端代码和页面进行优化，提高加载速度与响应性能，并持续维护和修复前端问题，确保系统稳定运行。',
    icon: 'fas fa-tools',
  },
])

const projects = ref([
  {
    name: '银安通',
    description:
      '一个金融服务类跨平台应用，支持多端部署，提供用户账户管理、交易查询等功能，注重性能优化和用户体验。',
    technologies: [
      { name: 'Vue.js', percentage: 30, icon: 'fab fa-vuejs' },
      { name: 'H5+', percentage: 20, icon: 'fab fa-html5' },
      { name: 'Uniapp', percentage: 20, icon: 'fas fa-mobile-alt' },
      { name: 'uni-ui', percentage: 20, icon: 'fab fa-node-js' },
      { name: 'TypeScript', percentage: 10, icon: 'fab fa-js' },
    ],
  },
  {
    name: '企业管理系统',
    description:
      '一个内部管理系统，用于员工管理和数据分析，采用组件化开发，注重代码复用和可维护性。',
    technologies: [
      { name: 'React', percentage: 35, icon: 'fab fa-react' },
      { name: 'TypeScript', percentage: 25, icon: 'fab fa-js' },
      { name: 'CSS/SCSS', percentage: 20, icon: 'fab fa-css3-alt' },
      { name: 'Node.js', percentage: 20, icon: 'fab fa-node-js' },
    ],
  },
  {
    name: '电商平台',
    description:
      '一个在线购物平台，支持商品展示、购物车和支付功能，强调响应式设计和快速加载。',
    technologies: [
      { name: 'Vue.js', percentage: 30, icon: 'fab fa-vuejs' },
      { name: 'JavaScript', percentage: 25, icon: 'fab fa-js-square' },
      { name: 'CSS/SCSS', percentage: 25, icon: 'fab fa-css3-alt' },
      { name: 'Webpack', percentage: 20, icon: 'fas fa-cogs' },
    ],
  },
])

onMounted(() => {
  // General card animation for all cards
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

  // Auto-scrolling for project cards
  const projectCards = document.querySelectorAll('.project-card')
  const totalCards = projectCards.length
  if (totalCards > 0) {
    const cardHeight = projectCards[0].offsetHeight + 20 // Card height + gap
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

    // Initialize the auto-scroll
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
}

.left-panel {
  width: 70%;
  position: relative;
}

.right-panel {
  width: 30%;
  position: relative;
}

.projects-container {
  height: 400px; /* Fixed height to show one card */
  overflow: hidden;
  position: relative;
}

.projects-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.card {
  background: #090e1a;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
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

.card-content {
  text-align: left;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.icon {
  font-size: 20px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.row-title {
  position: relative;
  font-size: 1.2rem;
  margin: 1.5rem 0 1rem 0;
  padding-left: 20px;
  text-align: left;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background: linear-gradient(to bottom, #00ffcc, #00d4ff);
    border-radius: 2px;
  }
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

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 20px;
  }

  .left-panel,
  .right-panel {
    width: 100%;
    max-width: none;
  }

  .projects-container {
    height: 400px;
  }

  .skills-row,
  .duties-row {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .section-title {
    font-size: 2rem;
  }

  .skill-name {
    font-size: 16px;
  }

  .project-description,
  .duty-description {
    font-size: 13px;
  }

  .tech-name {
    font-size: 13px;
  }

  .tech-icon {
    font-size: 14px;
  }

  .percentage {
    font-size: 11px;
    min-width: 35px;
  }
}
</style>
