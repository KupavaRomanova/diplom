<template>
  <div :class="checked ? 'bg-green-200' : 'bg-red-100'" class="flex flex-row items-center rounded-md gap-2 px-2 py-2">
    <div class="flex flex-row gap-2 rounded-md text-black">

<!--      <div class="bg-gray-950 w-[1px] h-6 items-center"></div>-->
    </div>

    <div class="text-black px-1 text-left w-full flex flex-row justify-between">
      <span>{{ formatShortFio(fio) }}</span>
      <span class="w-fit">{{ num }}</span>
    </div>

    <ion-checkbox :checked="checked" @ionChange="handleCheckboxChange" label-placement="end" class="md px-2"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  num: number;
  fio: string;
  checked: boolean;
}>();

const emit = defineEmits<{
  (e: 'onChecked', value: boolean): void
}>()

const handleCheckboxChange = () => {
  checked.value = !checked.value;
  emit('onChecked', checked.value);
}

const formatShortFio = (fio: string) => {
  const s = fio.split(/[ ]+/);
  return `${s[0]} ${s[1][0]}. ${s[2][0]}.`
}

const checked = ref(props.checked);

</script>

<style>
ion-checkbox {
  --checkbox-background-checked: #ffffff;
  --border-color-checked: #000000;
  --checkmark-color: #000000;
}
</style>
