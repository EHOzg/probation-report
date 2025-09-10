<template>
  <div
    class="w-full h-screen flex flex-col justify-center items-center relative overflow-hidden"
    style="
      background: linear-gradient(to bottom right, #0c1324, #040813, #0d1425);
    ">
    <div class="section-title">对责任的理解</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const duties = ref([
  {
    title: '公司使命',
    description:
      '责任是企业存在的意义，根植于承担社会责任、保护国家和人民安全的使命。只有主动为社会、国家和客户提供安全保障，企业才能赢得信任与尊重。',
    icon: 'fas fa-flag',
  },
  {
    title: '核心价值观',
    description:
      '责任体现为主动工作、敬职敬业，对成果负责，勇于担当挑战。员工应积极解决问题，将责任视为价值而非负担，落实到每一个行动中。',
    icon: 'fas fa-handshake',
  },
  {
    title: '团队合作',
    description:
      '责任不仅是个人职责，也是团队协作的基石。尊重、信任、团结、互助的团队文化要求每人尽职尽责，相互支持，确保高效协作与目标达成。',
    icon: 'fas fa-users',
  },
  {
    title: '员工要求',
    description:
      '责任要求自律力、执行力、学习力和抗压力。员工需通过自我管理、持续学习和兑现承诺，勇敢面对挑战，以行动诠释责任担当。',
    icon: 'fas fa-user-check',
  },
])

const flippedCards = ref({})

const flipCard = (index) => {
  flippedCards.value[index] = true
}

const resetCard = (index) => {
  flippedCards.value[index] = false
}

const toggleFlip = (index) => {
  flippedCards.value[index] = !flippedCards.value[index]
}

onMounted(() => {
  gsap.from('.responsibility-card', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.responsibility-grid',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  })
})
</script>

<style lang="scss" scoped>
.responsibility-section {
  min-height: 100vh;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #0a1122, #1a2333);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.responsibility-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.responsibility-card {
  perspective: 1000px;
  height: 300px;
  cursor: pointer;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #121a2b;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid rgba(0, 247, 255, 0.2);
}

.card-front {
  .duty-icon {
    font-size: 2.5rem;
    color: #00f7ff;
    margin-bottom: 1rem;
    transition: transform 0.3s ease;
  }

  h3 {
    font-size: 1.4rem;
    color: #fff;
  }

  &:hover .duty-icon {
    transform: scale(1.2);
  }
}

.card-back {
  transform: rotateY(180deg);
  padding: 1.5rem;

  h3 {
    font-size: 1.2rem;
    color: #00f7ff;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.9rem;
    color: #a0a0a0;
    line-height: 1.5;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }

  .responsibility-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .responsibility-card {
    height: 250px;
  }

  .card-front .duty-icon {
    font-size: 2rem;
  }

  .card-front h3 {
    font-size: 1.2rem;
  }

  .card-back h3 {
    font-size: 1rem;
  }

  .card-back p {
    font-size: 0.8rem;
  }
}
</style>
