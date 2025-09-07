<template>
  <section class="work-plan-section">
    <h1 class="section-title">下一步工作计划</h1>
    <div class="cards-container">
      <div
        v-for="(category, index) in workCategories"
        :key="'category-' + index"
        class="card">
        <div class="card-content">
          <div class="title-with-icon">
            <i :class="category.icon" class="icon"></i>
            <span class="category-title">{{ category.title }}</span>
          </div>
          <ul class="task-list">
            <li
              v-for="(task, taskIndex) in category.tasks"
              :key="task.id"
              class="task-item">
              <div class="task-header">
                <input
                  type="checkbox"
                  v-model="task.completed"
                  @change="updateTaskProgress(task, $event, taskIndex)" />
                <i
                  :class="task.priorityIcon"
                  class="priority-icon"
                  @click="togglePriority(task)"></i>
                <span class="task-name">{{ task.name }}</span>
                <div class="task-controls">
                  <i
                    class="fas fa-arrow-up"
                    :class="{ disabled: taskIndex === 0 }"
                    @click="moveTaskUp(category, taskIndex)"></i>
                  <i
                    class="fas fa-arrow-down"
                    :class="{
                      disabled: taskIndex === category.tasks.length - 1,
                    }"
                    @click="moveTaskDown(category, taskIndex)"></i>
                  <i
                    :class="
                      task.expanded
                        ? 'fas fa-chevron-up'
                        : 'fas fa-chevron-down'
                    "
                    class="expand-icon"
                    @click="task.expanded = !task.expanded"></i>
                </div>
              </div>
              <div class="task-details" v-if="task.expanded">
                <span class="task-timeline">{{ task.timeline }}</span>
                <span
                  class="task-status"
                  :ref="(el) => setStatusRef(task.id, el)"
                  >{{ task.status }}</span
                >
                <div v-if="task.progress !== null" class="progress-container">
                  <div class="progress-bar">
                    <div
                      class="progress"
                      :style="{
                        width: task.progress + '%',
                        background: category.gradient,
                      }"
                      :ref="(el) => setProgressRef(task.id, el)"></div>
                  </div>
                  <span class="percentage">{{ task.progress }}%</span>
                </div>
                <div class="task-notes">
                  <textarea
                    v-model="task.notes"
                    placeholder="添加备注..."
                    @blur="debouncedSaveTasks"></textarea>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const workCategories = ref([
  {
    title: '正在进行中的',
    icon: 'fas fa-circle-notch',
    gradient: 'linear-gradient(90deg, #00ffcc, #ff00cc)',
    tasks: [
      {
        id: 'ongoing-1',
        name: '新功能开发',
        timeline: '2025 Q1',
        progress: 20,
        completed: false,
        priority: 'high',
        priorityIcon: 'fas fa-exclamation-circle',
        status: '进行中',
        notes: '',
        expanded: false,
      },
      {
        id: 'ongoing-2',
        name: '页面加载提速',
        timeline: '2025 Q1',
        progress: 25,
        completed: false,
        priority: 'medium',
        priorityIcon: 'fas fa-info-circle',
        status: '进行中',
        notes: '优化首屏渲染',
        expanded: false,
      },
      {
        id: 'ongoing-3',
        name: '修复已知bug',
        timeline: '2025 Q1',
        progress: 20,
        completed: true,
        priority: 'high',
        priorityIcon: 'fas fa-exclamation-circle',
        status: '已完成',
        notes: '修复表单验证问题',
        expanded: false,
      },
    ],
  },
  {
    title: '准备中的',
    icon: 'fas fa-tools',
    gradient: 'linear-gradient(90deg, #007bff, #00ffcc)',
    tasks: [
      {
        id: 'prep-1',
        name: 'UI组件优化',
        timeline: '2025 Q2',
        progress: 10,
        completed: false,
        priority: 'medium',
        priorityIcon: 'fas fa-info-circle',
        status: '待启动',
        notes: '',
        expanded: false,
      },
      {
        id: 'prep-2',
        name: 'CSS重构',
        timeline: '2025 Q2',
        progress: 5,
        completed: false,
        priority: 'low',
        priorityIcon: 'fas fa-circle',
        status: '规划中',
        notes: '使用CSS变量',
        expanded: false,
      },
      {
        id: 'prep-3',
        name: '代码审查',
        timeline: '2025 Q2',
        progress: 0,
        completed: false,
        priority: 'medium',
        priorityIcon: 'fas fa-info-circle',
        status: '待启动',
        notes: '',
        expanded: false,
      },
    ],
  },
  {
    title: '计划中的',
    icon: 'fas fa-clipboard-list',
    gradient: 'linear-gradient(90deg, #ffcc00, #ff6600)',
    tasks: [
      {
        id: 'plan-1',
        name: '跨平台支持',
        timeline: '2025 Q3',
        progress: null,
        completed: false,
        priority: 'low',
        priorityIcon: 'fas fa-circle',
        status: '计划中',
        notes: '',
        expanded: false,
      },
      {
        id: 'plan-2',
        name: '学习新框架',
        timeline: '2025 Q3',
        progress: null,
        completed: false,
        priority: 'medium',
        priorityIcon: 'fas fa-info-circle',
        status: '计划中',
        notes: '目标：Vue 4.0',
        expanded: false,
      },
      {
        id: 'plan-3',
        name: '技术分享会',
        timeline: '2025 Q4',
        progress: null,
        completed: false,
        priority: 'low',
        priorityIcon: 'fas fa-circle',
        status: '计划中',
        notes: '',
        expanded: false,
      },
    ],
  },
])

const progressRefs = ref({})
const statusRefs = ref({})

function setProgressRef(id, el) {
  if (el) progressRefs.value[id] = el
}

function setStatusRef(id, el) {
  if (el) statusRefs.value[id] = el
}

function updateTaskProgress(task, event, taskIndex) {
  if (event.target.checked) {
    task.progress = task.progress !== null ? 100 : task.progress
    task.status = '已完成'
    gsap.to(progressRefs.value[task.id], {
      width: '100%',
      duration: 0.5,
      ease: 'power2.out',
    })
    gsap.to(statusRefs.value[task.id], {
      backgroundColor: 'rgba(0, 255, 204, 0.2)',
      duration: 0.3,
      ease: 'power2.out',
    })
  } else {
    task.progress = task.progress === 100 ? 0 : task.progress
    task.status = task.progress ? '进行中' : '待启动'
    gsap.to(progressRefs.value[task.id], {
      width: `${task.progress}%`,
      duration: 0.5,
      ease: 'power2.out',
    })
    gsap.to(statusRefs.value[task.id], {
      backgroundColor: 'transparent',
      duration: 0.3,
      ease: 'power2.out',
    })
  }
  debouncedSaveTasks()
}

function togglePriority(task) {
  const priorities = [
    { name: 'high', icon: 'fas fa-exclamation-circle' },
    { name: 'medium', icon: 'fas fa-info-circle' },
    { name: 'low', icon: 'fas fa-circle' },
  ]
  const currentIndex = priorities.findIndex((p) => p.name === task.priority)
  const nextIndex = (currentIndex + 1) % priorities.length
  task.priority = priorities[nextIndex].name
  task.priorityIcon = priorities[nextIndex].icon
  debouncedSaveTasks()
}

function moveTaskUp(category, index) {
  if (index === 0) return
  const tasks = category.tasks
  const [task] = tasks.splice(index, 1)
  tasks.splice(index - 1, 0, task)
  gsap.from(`.task-item:nth-child(${index})`, {
    y: 20,
    duration: 0.3,
    ease: 'power2.out',
  })
  debouncedSaveTasks()
}

function moveTaskDown(category, index) {
  if (index === category.tasks.length - 1) return
  const tasks = category.tasks
  const [task] = tasks.splice(index, 1)
  tasks.splice(index + 1, 0, task)
  gsap.from(`.task-item:nth-child(${index + 2})`, {
    y: -20,
    duration: 0.3,
    ease: 'power2.out',
  })
  debouncedSaveTasks()
}

function debounce(fn, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}

const debouncedSaveTasks = debounce(() => {
  console.log('Saving tasks:', workCategories.value)
  localStorage.setItem('workCategories', JSON.stringify(workCategories.value))
}, 500)

onMounted(() => {
  // Load from localStorage
  const saved = localStorage.getItem('workCategories')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      workCategories.value.forEach((category, i) => {
        category.tasks = parsed[i]?.tasks || category.tasks
      })
      console.log('Loaded tasks from localStorage:', parsed)
    } catch (e) {
      console.error('Failed to load tasks from localStorage:', e)
    }
  }

  // GSAP animation for cards
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.work-plan-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none none',
      markers: false,
    },
  })

  tl.from('.card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
    onComplete: () => {
      gsap.set('.card', { opacity: 1, y: 0 })
      console.log('Work plan cards animated, should be visible')
    },
  })

  // Animate progress bars and status badges
  workCategories.value.forEach((category) => {
    category.tasks.forEach((task) => {
      if (task.progress !== null && progressRefs.value[task.id]) {
        gsap.from(progressRefs.value[task.id], {
          width: 0,
          duration: 1,
          ease: 'power2.out',
          delay: 0.5,
        })
      }
      if (statusRefs.value[task.id] && task.status === '已完成') {
        gsap.from(statusRefs.value[task.id], {
          backgroundColor: 'transparent',
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.5,
        })
      }
    })
  })

  // Hover animations for cards and notes
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        scale: 1.05,
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.5)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })

  const textareas = document.querySelectorAll('.task-notes textarea')
  textareas.forEach((textarea) => {
    textarea.addEventListener('mouseenter', () => {
      gsap.to(textarea, {
        background: 'rgba(255, 255, 255, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
    textarea.addEventListener('mouseleave', () => {
      gsap.to(textarea, {
        background: 'rgba(255, 255, 255, 0.05)',
        duration: 0.3,
        ease: 'power2.out',
      })
    })
  })
})
</script>

<style lang="scss" scoped>
.work-plan-section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
  padding: 2rem;
  color: #fff;
  position: relative;
  overflow: hidden;
}

.section-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cards-container {
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  justify-content: center;
  padding: 0 1rem;
}

.card {
  background: #090e1a;
  border-radius: 12px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 400px;
  max-width: 350px;
  opacity: 1 !important;
  visibility: visible;
  transform: translateY(0);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  width: 100%;
}

.title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.icon {
  font-size: 18px;
  background: linear-gradient(135deg, #00ffcc, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.category-title {
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
}

.task-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-header input[type='checkbox'] {
  margin: 0;
  cursor: pointer;
}

.priority-icon {
  font-size: 14px;
  color: #ff4444; /* High priority */
  cursor: pointer;
}
.priority-icon.fa-info-circle {
  color: #00d4ff; /* Medium priority */
}
.priority-icon.fa-circle {
  color: #a0a0a0; /* Low priority */
}

.task-name {
  flex-grow: 1;
  font-size: 13px;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-controls {
  display: flex;
  align-items: center;
  gap: 6px;
}

.task-controls i {
  font-size: 12px;
  color: #a0a0a0;
  cursor: pointer;
}
.task-controls i.disabled {
  color: #4a4a4a;
  cursor: not-allowed;
}

.expand-icon {
  font-size: 12px;
  color: #a0a0a0;
  cursor: pointer;
}

.task-details {
  margin-top: 8px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.task-timeline,
.task-status {
  font-size: 12px;
  color: #a0a0a0;
}

.task-status {
  padding: 2px 6px;
  border-radius: 4px;
}
.task-status.completed {
  background: rgba(0, 255, 204, 0.2);
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.progress-bar {
  flex-grow: 1;
  height: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
  min-width: 50px;
}

.progress {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.percentage {
  font-size: 11px;
  color: #fff;
  min-width: 35px;
  text-align: right;
}

.task-notes textarea {
  width: 100%;
  min-height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  font-size: 12px;
  padding: 6px;
  resize: vertical;
}

.task-notes textarea::placeholder {
  color: #a0a0a0;
}

/* Gradient styles for icons and progress bars */
.card:nth-child(1) .icon,
.card:nth-child(1) .progress {
  background: linear-gradient(90deg, #00ffcc, #ff00cc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card:nth-child(2) .icon,
.card:nth-child(2) .progress {
  background: linear-gradient(90deg, #007bff, #00ffcc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card:nth-child(3) .icon,
.card:nth-child(3) .progress {
  background: linear-gradient(90deg, #ffcc00, #ff6600);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Responsive design */
@media (max-width: 768px) {
  .work-plan-section {
    padding: 1rem;
    min-height: auto;
    justify-content: flex-start;
  }

  .cards-container {
    grid-template-columns: 1fr;
    padding: 0 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .card {
    min-height: 300px;
    max-width: none;
  }

  .category-title {
    font-size: 15px;
  }

  .task-name {
    font-size: 12px;
  }

  .task-timeline,
  .task-status {
    font-size: 11px;
  }

  .progress-container {
    gap: 4px;
  }

  .progress-bar {
    min-width: 40px;
  }

  .percentage {
    font-size: 10px;
    min-width: 30px;
  }

  .icon {
    font-size: 16px;
  }

  .priority-icon,
  .expand-icon,
  .task-controls i {
    font-size: 12px;
  }

  .task-notes textarea {
    font-size: 11px;
  }
}
</style>
