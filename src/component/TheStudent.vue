<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps<{
  num: number;
  fio: string;
}>();

const checked = ref(false);
</script>

<template>

  <div :class="checked ? 'bg-green-200' : 'bg-red-200'" class="flex flex-row items-center justify-between rounded-md gap-2 py-2  mx-3 my-2" >
    <div class="flex flex-row gap-2 pl-2  rounded-md text-black">
      <span>{{ num }}</span>
      <div class="bg-gray-950 w-[1px] h-6"></div>
    </div>
    

    <div class="text-black px-1 w-72">
      <span>{{ fio }}</span>
    </div>

    <ion-checkbox  :checked="checked" @ionChange="checked = !checked" label-placement="end" class="md px-2 "></ion-checkbox>
  </div>


</template>

<style>
  ion-checkbox {
    --checkbox-background-checked: #ffffff;
    --border-color-checked: #000000;
    --checkmark-color: #000000;

  }

</style>
