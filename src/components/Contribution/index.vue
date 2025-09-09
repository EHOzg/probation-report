<template>
  <div class="contribution-graph">
    <div class="months">
      <span v-for="month in months" :key="month" class="month">{{
        month
      }}</span>
    </div>
    <div class="graph">
      <div class="week" v-for="(week, wIndex) in weeks" :key="wIndex">
        <div
          v-for="(day, dIndex) in week"
          :key="dIndex"
          class="day"
          :title="`${day.date}: ${day.count} activities`"
          :style="{ backgroundColor: getColor(day.count) }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Example months (adjusted to match a year cycle, starting from April 2025 to September 2025)
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']

// Generate data: 22 weeks x 7 days (approx. April to September 2025)
const weeks = ref([
  [
    // 第 1 周
    { date: '2025-W1-D1', count: 0 },
    { date: '2025-W1-D2', count: 0 },
    { date: '2025-W1-D3', count: 0 },
    { date: '2025-W1-D4', count: 0 },
    { date: '2025-W1-D5', count: 0 },
    { date: '2025-W1-D6', count: 0 },
    { date: '2025-W1-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W2-D1', count: 0 },
    { date: '2025-W2-D2', count: 0 },
    { date: '2025-W2-D3', count: 0 },
    { date: '2025-W2-D4', count: 0 },
    { date: '2025-W2-D5', count: 0 },
    { date: '2025-W2-D6', count: 0 },
    { date: '2025-W2-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W3-D1', count: 0 },
    { date: '2025-W3-D2', count: 0 },
    { date: '2025-W3-D3', count: 0 },
    { date: '2025-W3-D4', count: 0 },
    { date: '2025-W3-D5', count: 0 },
    { date: '2025-W3-D6', count: 0 },
    { date: '2025-W3-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W4-D1', count: 0 },
    { date: '2025-W4-D2', count: 0 },
    { date: '2025-W4-D3', count: 0 },
    { date: '2025-W4-D4', count: 0 },
    { date: '2025-W4-D5', count: 0 },
    { date: '2025-W4-D6', count: 0 },
    { date: '2025-W4-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W5-D1', count: 0 },
    { date: '2025-W5-D2', count: 1 },
    { date: '2025-W5-D3', count: 1 },
    { date: '2025-W5-D4', count: 1 },
    { date: '2025-W5-D5', count: 0 },
    { date: '2025-W5-D6', count: 0 },
    { date: '2025-W5-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W6-D1', count: 0 },
    { date: '2025-W6-D2', count: 0 },
    { date: '2025-W6-D3', count: 1 },
    { date: '2025-W6-D4', count: 0 },
    { date: '2025-W6-D5', count: 0 },
    { date: '2025-W6-D6', count: 1 },
    { date: '2025-W6-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W7-D1', count: 1 },
    { date: '2025-W7-D2', count: 0 },
    { date: '2025-W7-D3', count: 1 },
    { date: '2025-W7-D4', count: 0 },
    { date: '2025-W7-D5', count: 1 },
    { date: '2025-W7-D6', count: 1 },
    { date: '2025-W7-D7', count: 1 },
  ],
  [
    // 第 2 周
    { date: '2025-W8-D1', count: 0 },
    { date: '2025-W8-D2', count: 1 },
    { date: '2025-W8-D3', count: 1 },
    { date: '2025-W8-D4', count: 1 },
    { date: '2025-W8-D5', count: 1 },
    { date: '2025-W8-D6', count: 1 },
    { date: '2025-W8-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W9-D1', count: 0 },
    { date: '2025-W9-D2', count: 0 },
    { date: '2025-W9-D3', count: 1 },
    { date: '2025-W9-D4', count: 1 },
    { date: '2025-W9-D5', count: 1 },
    { date: '2025-W9-D6', count: 1 },
    { date: '2025-W9-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W10-D1', count: 0 },
    { date: '2025-W10-D2', count: 0 },
    { date: '2025-W10-D3', count: 0 },
    { date: '2025-W10-D4', count: 0 },
    { date: '2025-W10-D5', count: 0 },
    { date: '2025-W10-D6', count: 1 },
    { date: '2025-W10-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W11-D1', count: 0 },
    { date: '2025-W11-D2', count: 1 },
    { date: '2025-W11-D3', count: 1 },
    { date: '2025-W11-D4', count: 1 },
    { date: '2025-W11-D5', count: 0 },
    { date: '2025-W11-D6', count: 0 },
    { date: '2025-W11-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W12-D1', count: 0 },
    { date: '2025-W12-D2', count: 0 },
    { date: '2025-W12-D3', count: 1 },
    { date: '2025-W12-D4', count: 0 },
    { date: '2025-W12-D5', count: 0 },
    { date: '2025-W12-D6', count: 1 },
    { date: '2025-W12-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W13-D1', count: 0 },
    { date: '2025-W13-D2', count: 1 },
    { date: '2025-W13-D3', count: 1 },
    { date: '2025-W13-D4', count: 1 },
    { date: '2025-W13-D5', count: 1 },
    { date: '2025-W13-D6', count: 1 },
    { date: '2025-W13-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W14-D1', count: 0 },
    { date: '2025-W14-D2', count: 1 },
    { date: '2025-W14-D3', count: 0 },
    { date: '2025-W14-D4', count: 31 },
    { date: '2025-W14-D5', count: 8 },
    { date: '2025-W14-D6', count: 5 },
    { date: '2025-W14-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W15-D1', count: 0 },
    { date: '2025-W15-D2', count: 0 },
    { date: '2025-W15-D3', count: 1 },
    { date: '2025-W15-D4', count: 1 },
    { date: '2025-W15-D5', count: 0 },
    { date: '2025-W15-D6', count: 1 },
    { date: '2025-W15-D7', count: 5 },
  ],
  [
    // 第 2 周
    { date: '2025-W16-D1', count: 0 },
    { date: '2025-W16-D2', count: 1 },
    { date: '2025-W16-D3', count: 0 },
    { date: '2025-W16-D4', count: 0 },
    { date: '2025-W16-D5', count: 1 },
    { date: '2025-W16-D6', count: 1 },
    { date: '2025-W16-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W17-D1', count: 0 },
    { date: '2025-W17-D2', count: 1 },
    { date: '2025-W17-D3', count: 1 },
    { date: '2025-W17-D4', count: 1 },
    { date: '2025-W17-D5', count: 1 },
    { date: '2025-W17-D6', count: 1 },
    { date: '2025-W17-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W18-D1', count: 0 },
    { date: '2025-W18-D2', count: 1 },
    { date: '2025-W18-D3', count: 1 },
    { date: '2025-W18-D4', count: 1 },
    { date: '2025-W18-D5', count: 0 },
    { date: '2025-W18-D6', count: 0 },
    { date: '2025-W18-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W19-D1', count: 0 },
    { date: '2025-W19-D2', count: 0 },
    { date: '2025-W19-D3', count: 0 },
    { date: '2025-W19-D4', count: 1 },
    { date: '2025-W19-D5', count: 1 },
    { date: '2025-W19-D6', count: 1 },
    { date: '2025-W19-D7', count: 0 },
  ],
  [
    // 第 2 周
    { date: '2025-W20-D1', count: 4 },
    { date: '2025-W20-D2', count: 0 },
    { date: '2025-W20-D3', count: 8 },
    { date: '2025-W20-D4', count: 6 },
    { date: '2025-W20-D5', count: 1 },
    { date: '2025-W20-D6', count: 2 },
    { date: '2025-W20-D7', count: 7 },
  ],
  [
    // 第 2 周
    { date: '2025-W21-D1', count: 0 },
    { date: '2025-W21-D2', count: 1 },
    { date: '2025-W21-D3', count: 0 },
    { date: '2025-W21-D4', count: 1 },
    { date: '2025-W21-D5', count: 1 },
    { date: '2025-W21-D6', count: 0 },
    { date: '2025-W21-D7', count: 0 },
  ],
  // ...
  [
    // 第 22 周
    { date: '2025-W22-D1', count: 0 },
    { date: '2025-W22-D2', count: 0 },
    { date: '2025-W22-D3', count: 0 },
    { date: '2025-W22-D4', count: 0 },
    { date: '2025-W22-D5', count: 0 },
    { date: '2025-W22-D6', count: 0 },
    { date: '2025-W22-D7', count: 0 },
  ],
])

// Color mapping based on activity count
const getColor = (count) => {
  if (count === 0) return '#1a2436' // Darker gray to match background
  if (count <= 2) return '#c6e48b'
  if (count <= 5) return '#7bc96f'
  if (count <= 7) return '#239a3b'
  return '#196127'
}

// Dynamic width calculation for months
let resizeObserver = null
onMounted(() => {
  const updateMonthWidth = () => {
    const graph = document.querySelector('.graph')
    const monthElements = document.querySelectorAll('.month')
    if (graph && monthElements.length) {
      const graphWidth = graph.offsetWidth
      const weeksPerMonth = Math.floor(22 / months.length) // Approximate weeks per month (April to September)
      const monthWidth = graphWidth / months.length
      monthElements.forEach((month) => {
        month.style.width = `${monthWidth}px`
        month.style.marginRight = '0' // Remove margin to avoid overlap
      })
    }
  }

  updateMonthWidth()
  resizeObserver = new ResizeObserver(updateMonthWidth)
  resizeObserver.observe(document.querySelector('.contribution-graph'))
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<style scoped>
.contribution-graph {
  font-family: sans-serif;
  background: linear-gradient(
    to bottom right,
    #0c1324,
    #040813,
    #0d1425
  ); /* Match page background */
  padding: 20px; /* Increased padding for better integration */
  border-radius: 12px; /* Optional: Add subtle rounding */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for depth */
}

.months {
  display: flex;
  justify-content: space-between; /* Distribute months evenly */
  margin-bottom: 8px; /* Increased margin for spacing */
  width: 100%; /* Ensure full width */
}

.month {
  font-size: 12px; /* Slightly larger for readability */
  color: #a0a0a0; /* Lighter gray to contrast with dark background */
  text-align: center; /* Center text within each month span */
  flex-shrink: 0; /* Prevent shrinking */
}

.graph {
  display: flex;
  width: 100%; /* Ensure graph takes full width */
}

.week {
  display: flex;
  flex-direction: column;
  margin-right: 4px; /* Increased margin for spacing */
}

.day {
  width: 14px;
  height: 14px;
  margin-bottom: 4px; /* Increased margin for spacing */
  border-radius: 3px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s; /* Added box-shadow transition */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for definition */
}

.day:hover {
  transform: scale(1.2);
  box-shadow: 0 0 8px rgba(0, 255, 204, 0.5); /* Cyan glow on hover, matching theme */
}
</style>
