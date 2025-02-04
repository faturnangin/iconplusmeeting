<script setup lang="ts">

useHead({
  title: "Home - nMeeting",
});

definePageMeta({
  layout: 'dashboard',
});
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { Separator } from '@/components/ui/separator'

const { toast } = useToast()
import { reactive, ref } from 'vue'
import api from '~/services/api'
import {
    File,Plus,ListFilter, MinusCircle,Pencil,Settings
} from 'lucide-vue-next';
const isLoading = ref(false);
const period = ref('Jan-2024');
const { data: datas, refresh } = api.getData();
import CircleChart from '~/components/CircleChart.vue'
import HorizontalBarChart from '~/components/HorizontalBarChart.vue'
const filteredData = computed(() => {
  if (!datas.value) return null
  return datas.value.find(item => item.period === period.value)
})

const calculateOccupancyPercentage = (room) => {
  return Math.round((room.averageOccupancyPerMonth / room.capacity) * 100)
}

const calculateTotalConsumption = (consumptions) => {
  return consumptions.reduce((total, item) => total + parseInt(item.totalPrice), 0)
}

const calculateConsumptionPercentage = (price, consumptions) => {
  const total = calculateTotalConsumption(consumptions)
  return Math.round((parseInt(price) / total) * 100)
}
</script>

<template>
<Toaster/>
  <NuxtLayout>
    <div class="flex items-center justify-between w-full">
      <div className="pb-3 gap-3 border-b border-[#ECF0F2] flex items-center w-full">
        <Settings class="w-8 h-8"/>
        <span className="text-[#343A40] font-bold text-[18px]">DASHBOARD</span>
      </div>
    </div>

    <div class="flex flex-col max-w-xs gap-2">
        <span className="text-xs text-[#4E4E4E]">Periode</span>
        <Select v-model="period">
          <SelectTrigger id="period">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="data in datas" :key="data.id" :value="data.period">
              {{ data.period }}
            </SelectItem>
          </SelectContent>
        </Select>
    </div>
    
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col w-full justify-center items-start gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div v-for="office in filteredData.data" :key="office.officeName">
                <div class="flex gap-3 px-[6px] py-[6px]">
                  <img src="/images/lightning.svg" alt="" />
                  <span class="text-[#868E96] text-base font-bold">{{ office.officeName }}</span>
                </div>
                
                <div class="flex flex-col gap-4">
                  <div 
                    v-for="room in office.detailSummary" 
                    :key="room.roomName"
                    class="flex min-w-[230px] flex-col p-3 bg-[#F2F2F2] dark:bg-neutral-950 rounded-[8px] gap-[10px]"
                  >
                    <span class="text-sm font-normal text-[#4E4E4E]">{{ room.roomName }}</span>
                    <div class="flex items-center justify-between">
                      <div class="flex flex-col">
                        <span class="text-[11px]">Persentase Pemakaian</span>
                        <span class="text-xl font-bold text-black dark:text-white">
                          {{ calculateOccupancyPercentage(room) }}%
                        </span>
                      </div>
                      <CircleChart :percentage="calculateOccupancyPercentage(room)" />
                    </div>
                    <div class="flex flex-col">
                      <span class="text-[11px]">Nominal Konsumsi</span>
                      <span class="text-xl font-bold text-black">
                        Rp {{ calculateTotalConsumption(room.totalConsumption).toLocaleString() }}
                      </span>
                      <div 
                        v-for="consumption in room.totalConsumption" 
                        :key="consumption.name"
                        class="flex items-center gap-[21px]"
                      >
                        <span class="text-[10px] w-16 font-medium">{{ consumption.name }}</span>
                        <HorizontalBarChart 
                          :label="calculateConsumptionPercentage(consumption.totalPrice, room.totalConsumption)"
                          :value="calculateConsumptionPercentage(consumption.totalPrice, room.totalConsumption)"
                          :max-value="100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>