<template>
    <div class="flex flex-col items-start">
      <!-- Label -->
      <span class="text-lg font-medium">{{ label }}</span>
      <!-- Bar -->
      <div class="flex-1 h-4 bg-gray-200 rounded">
        <div
          :class="color"
          class="h-2 rounded"
          :style="{ width: `${barWidth}px` }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  // Definisikan props dengan validasi
  const props = defineProps({
    label: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      default: 'bg-blue-500'
    }
  })
  
  // Hitung lebar bar dalam proporsi maxValue
  const barWidth = computed(() => (props.value / props.maxValue) * 100)
  </script>
  
  <script>
  export default {
    name: 'HorizontalBarChart'
  }
  </script>