<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex flex-col gap-2 mx-2 h-full pt-3 pb-8">
        <div class="flex flex-row justify-between items-center">
          <a href="/home" style="color: black">
            <ChevronLeft :size="32"/>
          </a>
          <h1 class="text-xl">
            Расписание
          </h1>
          <a class="w-[32px]"></a>
        </div>

        <ion-segment :value="weekType" @ion-change="weekChange">
          <ion-segment-button value="chislitel">
            <ion-label>Числитель</ion-label>
          </ion-segment-button>
          <ion-segment-button value="znamenatel">
            <ion-label>Знаменатель</ion-label>
          </ion-segment-button>
        </ion-segment>

        <div class="min-h-0 h-full overflow-auto">
          <div v-if="loading">Loading...</div>

          <div v-else-if="teacherScheduleDay !== undefined" class="flex flex-col gap-2">
            <div v-for="(lesson, i) in teacherScheduleDay.lessons" :key="i">
              <TheCard v-if="lesson !== undefined"
                       :id="lesson.id"
                       :num="lesson.number"
                       :group="['609-01']"
                       :type_les="lesson.lecture"
                       :aud="lesson.auditorium"
                       :name_les="lesson.name"
              />
              <div v-else class="border w-full h-24 rounded-md"/>
            </div>
          </div>
          <div v-else class="w-full h-full flex flex-col justify-center items-center text-center"><p class="text-6xl">
            🤷‍♂️</p><br> Расписание на день недели "{{ weekDay }}" отсутствует
          </div>
        </div>

        <ion-segment class="h-16 border mt-auto justify-self-end" scrollable :value="weekDay"
                     @ion-change="weekDayChange">
          <ion-segment-button value="Понедельник">
            <ion-label>ПН</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Вторник">
            <ion-label>ВТ</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Среда">
            <ion-label>СР</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Четверг">
            <ion-label>ЧТ</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Пятница">
            <ion-label>ПТ</ion-label>
          </ion-segment-button>
          <ion-segment-button value="Суббота">
            <ion-label>СБ</ion-label>
          </ion-segment-button>
        </ion-segment>

        <input class="bg-white border px-2 py-4 rounded-md w-full px-auto" type="datetime-local">
      </div>
    </ion-content>


  </ion-page>
</template>

<script setup lang="ts">
import {ref, onBeforeMount, computed} from 'vue';
import {ChevronLeft} from 'lucide-vue-next';
import TheCard from "@/component/TheCard.vue";
import $api from "@/http";

// const datetime = ref<Date>()

interface Lesson {
  id: number;
  number: number;
  name: string;
  auditorium: string;
  lecture: boolean;
  visits: any[];
}

interface DaySchedule {
  id: number;
  week_day: string;
  lessons: (Lesson | undefined)[];
  group: string[];
}

interface ScheduleResponse {
  week_chis: DaySchedule[];
  week_znam: DaySchedule[];
}


const teacherSchedule = ref<ScheduleResponse>({
  week_chis: [],
  week_znam: [],
});

const teacherScheduleOfWeekType = computed(() => weekType.value === "chislitel" ? teacherSchedule.value.week_chis : teacherSchedule.value.week_znam)
const teacherScheduleDay = computed(() => teacherScheduleOfWeekType.value.find(x => x.week_day === weekDay.value))

const loading = ref(true);

type WeekType = 'chislitel' | 'znamenatel';

const weekType = ref<WeekType>('chislitel')
const weekChange = (x: any) => weekType.value = x.detail.value;

function getCurrentDayName(): string {
  const daysOfWeek = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];
  const currentDate = new Date();
  const dayIndex = currentDate.getDay();
  return daysOfWeek[dayIndex];
}

const weekDay = ref<string>(getCurrentDayName())
const weekDayChange = (x: any) => weekDay.value = x.detail.value;

onBeforeMount(() => {
  fetchTeacherSchedule();
});

async function fetchTeacherSchedule() {
  try {
    loading.value = false;

    const {data} = await $api.get<ScheduleResponse>('/schedulemy');

    data.week_chis = data.week_chis.map(x => ({
      ...x,
      lessons: [null, null, null, null, null, null].map((_, i) => x.lessons.find(y => y?.number === i + 1))
    }))
    data.week_znam = data.week_znam.map(x => ({
      ...x,
      lessons: [null, null, null, null, null, null].map((_, i) => x.lessons.find(y => y?.number === i + 1))
    }))

    teacherSchedule.value = data;

    loading.value = false;
  } catch (error) {
    console.error('Failed to fetch teacher schedule:', error);
    loading.value = false;
  }
}
</script>
