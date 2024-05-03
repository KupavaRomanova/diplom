<script setup lang="ts">
import TheCard from "@/component/TheCard.vue";
import TheTag from "@/component/TheTag.vue";
import { onBeforeMount, ref } from "vue";
import { ChevronLeft } from 'lucide-vue-next';
import { createRouter, createWebHistory } from 'vue-router';
import Result from '@/views/Result.vue';

interface ScheduleRecord {
  num: number,
  group: string[],
  type_les:boolean,
  aud: string,
  name_les: string,
}
const list = ref<ScheduleRecord[]>([]);


onBeforeMount(() => {
  list.value = [
    {
      group: ['609-01'],
      num: 1,
      type_les:true,
      aud: 'А320',
      name_les: 'Теория разработки программного обеспечения',

    },

    {
      group: ['609-01', '605-01'],
      num: 2,
      type_les:false,
      aud: 'Y420',
      name_les: 'Программируемые логические контроллеры',
    },

    {
      group: ['609-01'],
      num: 3,
      type_les:true,
      aud: 'Y403',
      name_les: 'Mexатронные комплекты',
    }
  ]
})
</script>

<template>
  <ion-page>
    <ion-content>

      <div class="flex flex-col gap-2 mx-2">
        <a href="/home" style="color: black" class="py-3">
          <ChevronLeft :size="32" />
        </a>
        

        <TheCard v-for="({num, group, type_les, aud, name_les}) in list"
        :num="num"
        :group="group"
        :type_les="type_les"
        :aud="aud"
        :name_les="name_les"
        />

      </div>
    </ion-content>
  </ion-page>
</template>

