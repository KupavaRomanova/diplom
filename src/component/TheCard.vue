<template>
  <div class="flex flex-row items-center bg-gray-50 rounded-md border border-gray-200 gap-2 px-1 py-1">
    <div class="bg-slate-200 px-2 py-2 rounded-md text-slate-600">
      <span>{{ props.num }}</span>
    </div>
    <div class="bg-gray-300 w-[1px] h-16"></div>

    <div class="flex flex-col justify-between w-full gap-1">
      <div class="flex flex-row justify-between">
        <div class="flex justify-start gap-1">
          <TheTag v-for="tag in props.group" :key="tag"> <span>{{ tag }} </span></TheTag>
        </div>

        <TheTag class="bg-cyan-200 border-cyan-300 text-xs">
          <span>{{ props.type_les ? "Лекция" : "Практика" }}</span>
        </TheTag>
      </div>
      <div class="bg-slate-50 text-black">
        <span>{{ props.name_les }}</span>
      </div>
      <div class="text-xs text-neutral-400"></div>
    </div>

    <div class="bg-blue-400 text-white px-2 py-2 rounded-md">
      <span>{{ props.aud }}</span>
    </div>

    <router-link
        :to="{
        name: 'Camera',
        params: {
          lesson_id: props.id,
          num: props.num,
          group: JSON.stringify(props.group), // Serialize group array to pass as string
          type_les: props.type_les.toString(),
          aud: props.aud,
          name_les: props.name_les,
        },
      }"
    >
      <svg
          width="45"
          height="45"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Path data for the icon -->
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.72656 9.10793V5.38048C1.72656 3.34303 3.4246 1.68545 5.51172 1.68545H9.33008C9.80684 1.68545 10.1934 1.30814 10.1934 0.842726C10.1934 0.377315 9.80684 0 9.33008 0H5.51172C2.47257 0 0 2.41367 0 5.38048V9.10793C0 9.57334 0.386518 9.95065 0.863281 9.95065C1.34004 9.95065 1.72656 9.57334 1.72656 9.10793ZM9.33008 31.505C9.80684 31.505 10.1934 31.8823 10.1934 32.3477C10.1934 32.8132 9.80684 33.1905 9.33008 33.1905H5.51172C2.47257 33.1905 0 30.7768 0 27.81V24.0825C0 23.6171 0.386518 23.2398 0.863281 23.2398C1.34004 23.2398 1.72656 23.6171 1.72656 24.0825V27.81C1.72656 29.8474 3.4246 31.505 5.51172 31.505H9.33008ZM34 24.0825V27.81C34 30.7768 31.5274 33.1905 28.4883 33.1905H24.6699C24.1932 33.1905 23.8066 32.8132 23.8066 32.3477C23.8066 31.8823 24.1932 31.505 24.6699 31.505H28.4883C30.5754 31.505 32.2734 29.8474 32.2734 27.81V24.0825C32.2734 23.6171 32.66 23.2398 33.1367 23.2398C33.6135 23.2398 34 23.6171 34 24.0825ZM34 5.38048V9.10793C34 9.57334 33.6135 9.95065 33.1367 9.95065C32.66 9.95065 32.2734 9.57334 32.2734 9.10793V5.38048C32.2734 3.34303 30.5754 1.68545 28.4883 1.68545H24.6699C24.1932 1.68545 23.8066 1.30814 23.8066 0.842726C23.8066 0.377315 24.1932 0 24.6699 0H28.4883C31.5274 0 34 2.41367 34 5.38048ZM22.9576 24.5311C23.3213 24.2032 23.3437 23.6495 23.0078 23.2945C22.6718 22.9394 22.1047 22.9175 21.741 23.2454C20.4468 24.4124 18.7631 25.0551 17 25.0551C15.2368 25.0551 13.5531 24.4124 12.2589 23.2454C11.8952 22.9175 11.3281 22.9395 10.9921 23.2945C10.6562 23.6495 10.6786 24.2032 11.0424 24.5311C12.6688 25.9977 14.7845 26.8053 17 26.8053C19.2154 26.8053 21.3311 25.9977 22.9576 24.5311ZM18.918 12.8751V19.0983C18.918 20.3315 17.8902 21.3348 16.627 21.3348H15.8965C15.4014 21.3348 15 20.943 15 20.4597C15 19.9763 15.4014 19.5845 15.8965 19.5845H16.627C16.9016 19.5845 17.125 19.3664 17.125 19.0983V12.8751C17.125 12.3918 17.5264 12 18.0215 12C18.5166 12 18.918 12.3918 18.918 12.8751ZM24.9688 14.9586V12.4628C24.9688 12.0064 24.5897 11.6363 24.1221 11.6363C23.6545 11.6363 23.2754 12.0064 23.2754 12.4628V14.9586C23.2754 15.4151 23.6545 15.7851 24.1221 15.7851C24.5897 15.7851 24.9688 15.4151 24.9688 14.9586ZM9.23047 14.9586C9.23047 15.4151 9.60955 15.7851 10.0771 15.7851C10.5447 15.7851 10.9238 15.4151 10.9238 14.9586V12.4628C10.9238 12.0064 10.5447 11.6363 10.0771 11.6363C9.60955 11.6363 9.23047 12.0064 9.23047 12.4628V14.9586Z"
            fill="black" fill-opacity="0.42" />
      </svg>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
// import TheTag from "@/components/TheTag.vue";
import TheTag from "@/component/TheTag.vue";

const props = defineProps({
  id: Number,
  num: Number,
  group: Array as () => string[],
  type_les: Boolean,
  aud: String,
  name_les: String,
});
</script>