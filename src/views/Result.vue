<script setup lang="ts">
import TheStudent from "@/component/TheStudent.vue";
import TheCard from "@/component/TheCard.vue";
import { onBeforeMount, ref, computed, defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import { ChevronLeft } from "lucide-vue-next";
import { useRoute } from "vue-router";

// const route = useRoute();
// const { cardInfo } = route.params;
// const cardInfo = { ...route.params };

interface ResultRecord {
  num: number;
  fio: string;
}

defineProps<{
  id: number;
  title: string;
}>();

const list = ref<ResultRecord[]>([]);

onBeforeMount(() => {
  list.value = [
    {
      fio: "Абрамов Александр Александрович",
      num: 1,
    },

    {
      fio: "Михайлов Илья Владимирович",
      num: 2,
    },

    {
      fio: "Григорьева Екатерина Сергеевна",
      num: 3,
    },
  ];
});
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="py-3  my-3">
        <a href="/schedule" style="color: black">
          <ChevronLeft :size="32" />
        </a>

        <TheCard class="mx-3" :name_les="title" />

        <TheStudent
          v-for="{ num, fio } in list"
          :num="num"
          :fio="fio"
        ></TheStudent>
      </div>
    </ion-content>
  </ion-page>
</template>
