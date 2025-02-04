<script setup lang="ts">
useHead({
  title: "Schedule a Meeting - nMeeting",
});
definePageMeta({
  layout: 'dashboard',
});
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
import { reactive, ref } from 'vue'
import api from '~/services/api'
import {
    File,PlusCircle,ListFilter, MinusCircle,Pencil, CalendarRange, ChevronRight
} from 'lucide-vue-next';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '~/lib/utils'
const isLoading = ref(false);
const addForm = reactive({
  meeting_title: '',
  description: '',
  room: '',
  department: '',
  date_start: '' as DateValue,
  date_end: '' as DateValue,
  });
  
const newForm = reactive({
  unit: '',
  room: '',
  capacity: '',
  date: '' as DateValue,
  time_start: '',
  time_end: '',
  participant: 0,
  foods:[],
  foods_value: 0
});

const formatMeetingData = (reactiveData) => {
  // Ambil komponen tanggal dari date_start
  const { year, month, day } = reactiveData.date_start;
  
  // Buat string tanggal dalam format YYYY-MM-DD
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
  // Gabungkan tanggal dengan waktu
  const dateTimeStart = `${dateStr} ${reactiveData.time_start}:00`;
  const dateTimeEnd = `${dateStr} ${reactiveData.time_ends}:00`;

  // Format data sesuai kebutuhan API
  return {
    meeting_title: reactiveData.meeting_title,
    description: reactiveData.description,
    room: reactiveData.room,
    department: reactiveData.department,
    date_start: dateTimeStart,
    date_end: dateTimeEnd
  };
};
// const { data: rooms, refreshrooms } = api.getRooms();
// const { data: departments, refreshdepartments } = api.getDepartments();
const { data: offices, refresh } = api.getMasterOffice();
const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})
const createMeeting = async () => {
  isLoading.value = true;
  const formattedData = formatMeetingData(addForm);
  console.log(formattedData)
  try {
    const response = await api.createMeeting(formattedData);
    console.log('Success:', response);
    toast({
      title: 'Success',
      description: addForm.meeting_title + ' added',
    });
    addForm.meeting_title = '';
    addForm.description = '';
    addForm.date_start = '';
    addForm.date_end = '';
    addForm.time_start = '';
    addForm.time_ends = '';
    addForm.department = '';
  } catch (error) {
    console.error('Error:', error.response);
    toast({
      title: 'Error',
      description: error.response?._data?.message || 'Failed to delete room',
      variant: 'destructive'
    })
  } finally {
    isLoading.value = false;
  }
}

</script>
<template>
<Toaster/>
  <NuxtLayout>
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-bold md:text-[28px]">
        Ruang Meeting
      </h1>
      <div class="flex items-center gap-2">
        <span class="text-[#868E96] font-normal text-sm">Ruang Meeting</span>
        <ChevronRight class="text-[#868E96]"/>
        <span class="text-[#4A8394] font-normal text-sm">Pesan Ruangan</span>
      </div>
    </div>
    <Card class="w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-xl">
          Informasi Ruang Meeting
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="grid gap-2">
              <Label for="unit">Unit</Label>
              <Select v-model="addForm.unit">
                <SelectTrigger id="unit">
                  <SelectValue placeholder="Pilih Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="office in offices" :key="office.id" :value="office.officeName">
                    {{ office.officeName }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="grid gap-2">
              <Label for="room">Ruang Meeting</Label>
              <Select v-model="newForm.room">
                <SelectTrigger id="room">
                  <SelectValue placeholder="Select room" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="room in rooms" :key="room.id" :value="room.room_name">
                    {{ room.room_name }}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="grid gap-2">
              <Label for="description">Capacity</Label>
              <Input v-model="addForm.description" id="description" placeholder="Description" required />
            </div>
          </div>

          <div class="w-full text-xl font-semibold text-start">
            Informasi Rapat
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            
            <div class="grid gap-2">
              <Label for="date_start">Date</Label>
              <Popover>
                <PopoverTrigger id="date_start" as-child>
                  <Button
                    variant="outline"
                    :class="cn(
                      'w-full justify-start text-left font-normal',
                      !addForm.date_start && 'text-muted-foreground',
                    )"
                  >
                    <CalendarRange class="w-4 h-4 mr-2" />
                    {{ addForm.date_start ? df.format(addForm.date_start.toDate(getLocalTimeZone())) : "Pick a date" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="addForm.date_start" initial-focus />
                </PopoverContent>
              </Popover>
            </div>

            <div class="grid gap-2">
              <Label for="time_start">Time Start</Label>
              <Input
                  id="time_start"
                  v-model="newForm.time_start"
                  type="time"
              />
            </div>
            <div class="grid gap-2">
              <Label for="time_ends">Time Ends</Label>
              <Input
                  id="time_ends"
                  v-model="newForm.time_ends"
                  type="time"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <div class="grid max-w-sm gap-2">
              <Label for="department">Jumlah Peserta</Label>
              <Input
                  id="participant"
                  v-model="newForm.participant"
                  type="text"
              />
            </div>

            <div class="space-y-2">
              <Label>Jenis Konsumsi</Label>
              <label class="flex items-center space-x-3">
                <input 
                  type="checkbox"
                  value="Snack Siang"
                  v-model="newForm.foods"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">Snack Siang</span>
              </label>

              <label class="flex items-center space-x-3">
                <input 
                  type="checkbox"
                  value="Makan Siang"
                  v-model="newForm.foods"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">Makan Siang</span>
              </label>

              <label class="flex items-center space-x-3">
                <input 
                  type="checkbox"
                  value="Snack Sore"
                  v-model="newForm.foods"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                >
                <span class="text-sm text-gray-700">Snack Sore</span>
              </label>
            </div>

            <div class="grid max-w-sm gap-2">
              <Label for="department">Nominal Konsumsi</Label>
              <Input
                  id="participant"
                  v-model="newForm.foods_value"
                  type="text"
              />
            </div>
            
          </div>
          
          <Button type="submit" @click="createMeeting" class="w-full">
            Create
          </Button>
          
        </div>
        
      </CardContent>
    </Card>
  </NuxtLayout>
</template>