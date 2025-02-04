<template>
    <div class="flex flex-col items-center">
      <svg
        class="w-11 h-11"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Lingkaran Background -->
        <circle
          cx="60"
          cy="60"
          :r="radius"
          fill="none"
          stroke="#e5e7eb"
          stroke-width="20"
        />
        <!-- Lingkaran Foreground -->
        <circle
          cx="60"
          cy="60"
          :r="radius"
          fill="none"
          stroke="#3b82f6"
          stroke-width="20"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          stroke-linecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
    </div>
</template>
  
<script setup>
import { computed } from 'vue'
// Gunakan defineProps dengan destructuring
const props = defineProps({
  percentage: {
    type: Number,
    required: true,
  },
});

const radius = 50; // Jari-jari lingkaran
const circumference = 2 * Math.PI * radius; // Keliling lingkaran

// Gunakan computed dari vue
const strokeDashoffset = computed(() => 
  circumference - (props.percentage / 100) * circumference
);
</script>