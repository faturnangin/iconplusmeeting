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
    File,Plus,ListFilter, MinusCircle,Pencil
} from 'lucide-vue-next';
const isLoading = ref(false);

</script>

<template>
<Toaster/>
  <NuxtLayout>
    <div class="flex items-center justify-between w-full">
        <div class="flex flex-col gap-1">
          <h1 class="text-lg font-bold md:text-[28px]">
            Ruang Meeting
          </h1>
          <span class="text-[#4A8394] font-normal text-sm">Ruang Meeting</span>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink to="/add">
          <Button class="h-[43px] w-[163px] gap-2 flex items-center bg-[#4A8394] hover:bg-[#3b6c7a]">
            <Plus class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Pesan Ruangan
            </span>
          </Button>
          </NuxtLink>
        </div>
    </div>
    <Card class="w-full mx-auto">
      
      <CardContent>
        <div class="grid gap-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            
          </div>
        </div>
      </CardContent>
    </Card>
  </NuxtLayout>
</template>