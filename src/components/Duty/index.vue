```vue
<template>
  <div
    id="duty"
    class="w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-6 py-12 duty-section"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <!-- 标题 -->
    <div class="section-title">前端工程师职责</div>

    <div class="flex flex-col gap-8 w-full max-w-6xl">
      <!-- 核心职责 -->
      <div>
        <div class="primary-title text-2xl font-semibold text-cyan-400 mb-6">
          核心职责
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <template v-for="(duty, index) in duties" :key="'duty-' + index">
            <div class="card w-full rounded-2xl p-5 shadow-lg">
              <div class="flex items-center gap-3">
                <i :class="[duty.icon, 'text-2xl', duty.color]"></i>
                <span class="text-xl font-medium text-white">{{
                  duty.title
                }}</span>
              </div>

              <div class="text-sm text-gray-300 leading-relaxed mt-2">
                {{ duty.description }}
              </div>
            </div>
          </template>
        </div>
      </div>

      <div>
        <div class="primary-title text-2xl font-semibold text-cyan-400 mb-6">
          技能掌握
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <template v-for="(skill, index) in skills" :key="index">
            <div
              class="card bg-[#141a2e]/80 rounded-2xl p-5 shadow-lg hover:scale-105 hover:shadow-xl">
              <div class="flex flex-col gap-3">
                <!-- 卡片头部：左右分布 -->
                <div class="flex justify-between items-start">
                  <!-- 左上角：技能图标 + 名称 -->
                  <div class="flex items-center gap-1">
                    <i :class="[skill.icon, 'text-2xl', skill.color]"></i>
                    <span class="text-lg font-medium text-white">{{
                      skill.name
                    }}</span>
                  </div>

                  <!-- 右上角：星级 -->
                  <div class="flex items-center gap-1 mt-1">
                    <i
                      v-for="n in 5"
                      :key="n"
                      class="fas fa-star text-sm"
                      :class="
                        n <= skill.rating ? 'text-yellow-400' : 'text-gray-600'
                      "></i>
                  </div>
                </div>

                <!-- 下方技能标签 -->
                <div class="flex flex-wrap gap-2 mt-4">
                  <span
                    v-for="tag in skill.tags"
                    :key="tag"
                    class="px-2.5 py-1 text-xs text-white bg-cyan-600/70 rounded-full">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div></template
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 核心职责数据
const duties = ref([
  {
    title: '开发页面',
    description:
      '负责前端页面搭建与功能实现，根据设计稿完成交互和视觉效果，保证用户体验流畅与一致性。',
    icon: 'fas fa-code',
    color: 'text-green-400',
  },
  {
    title: '团队协作',
    description:
      '与UI设计和后端开发紧密合作，确保页面功能和视觉效果一致，同时高效解决开发中遇到的问题。',
    icon: 'fas fa-users',
    color: 'text-blue-400',
  },
  {
    title: '优化维护',
    description:
      '对前端代码和页面进行优化，提高加载速度与响应性能，并持续维护和修复前端问题，确保系统稳定运行。',
    icon: 'fas fa-tools',
    color: 'text-orange-400',
  },
])

const skills = ref([
  {
    name: 'Vue.js',
    rating: 5,
    icon: 'fab fa-vuejs',
    color: 'text-green-400',
    tags: ['组件开发', 'Vuex', 'Composition API'],
  },
  {
    name: 'JavaScript',
    rating: 5,
    icon: 'fab fa-js-square',
    color: 'text-yellow-500',
    tags: ['ES6+', '闭包', '异步编程'],
  },
  {
    name: 'CSS/SCSS',
    rating: 4,
    icon: 'fab fa-css3-alt',
    color: 'text-blue-500',
    tags: ['Flex/Grid', '动画', '响应式'],
  },

  {
    name: 'uniapp',
    rating: 4,
    icon: 'fas fa-mobile-alt',
    color: 'text-purple-400',
    tags: ['H5', '跨端', '组件封装'],
  },

  {
    name: 'HTML5',
    rating: 4,
    icon: 'fab fa-html5',
    color: 'text-red-400',
    tags: ['语义化', 'Canvas', '表单控件'],
  },

  {
    name: 'TypeScript',
    rating: 3,
    icon: 'fab fa-js',
    color: 'text-blue-400',
    tags: ['类型安全', '接口定义', '泛型'],
  },
  {
    name: 'Node.js',
    rating: 2,
    icon: 'fab fa-node-js',
    color: 'text-green-600',
    tags: ['Express', 'API开发', '文件操作'],
  },
  {
    name: 'React',
    rating: 2,
    icon: 'fab fa-react',
    color: 'text-blue-400',
    tags: ['Hooks', 'Redux', '组件复用'],
  },
])

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#duty',
      start: 'top top',
      end: 'bottom bottom',
      toggleActions: 'play none none none',
    },
  })

  tl.from('.card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'back.out(1.7)',
  })

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
})
</script>

<style scoped lang="scss"></style>
