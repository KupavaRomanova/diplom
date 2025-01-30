<script setup lang="ts">
// import TheStudent from "@/component/TheStudent.vue";
import TheStudent from "@/component/TheStudent.vue";
import TheCard from "@/component/TheCard.vue";
import { onBeforeMount, ref, computed, defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import { ChevronLeft } from "lucide-vue-next";
import { useRoute } from "vue-router";
import $api from "@/http";

// const route = useRoute();
// const { cardInfo } = route.params;
// const cardInfo = { ...route.params };

// interface ResultRecord {
//   num: number;
//   fio: string;
// }
//
// defineProps<{
//   id: number;
//   title: string;
//   gr: string;
//   n: number;
//   aud: string;
// }>();
//
// const list = ref<ResultRecord[]>([]);
//
// onBeforeMount(() => {
//   list.value = [
//     {
//       fio: "Абрамов Александр Александрович",
//       num: 1,
//     },
//
//     {
//       fio: "Михайлов Илья Владимирович",
//       num: 2,
//     },
//
//     {
//       fio: "Григорьева Екатерина Сергеевна",
//       num: 3,
//     },
//   ];
// });

interface Lesson {
  id: number;
  name: string;
  auditorium: string;
  lecture: boolean;
  number: number;
  group: string[];
}

interface Student {
  id: number;
  fio: string;
  present: boolean;
}

const route = useRoute();
const lessonId = route.params.id;

const lesson = ref<Lesson | null>(null);
const students = ref<Student[]>([]);

onBeforeMount(async () => {
  try {
    const id = Array.isArray(lessonId) ? parseInt(lessonId[0], 10) : parseInt(lessonId, 10);

    if (isNaN(id)) {
      throw new Error('Invalid lesson ID');
    }

    const { data } = await $api.get(`/attendance/${id}`);
    lesson.value = data.lesson;
    students.value = data.students;
  } catch (error) {
    console.error('Error fetching attendance data:', error);
  }
});

const recognizedStudents = ref<string[]>([]); // Список распознанных студентов

// Функция, определяющая, был ли студент распознан
const isRecognized = (student: Student): boolean => {
  return recognizedStudents.value.includes(student.fio);
};

// Обработчик события при распознавании студентов
// const handleRecognition = (recognizedNames: string[]) => {
//   recognizedStudents.value = recognizedNames;
// };

</script>

<template>
  <ion-page>
    <ion-content>
      <div class="py-3  my-3">
        <a href="/schedule" style="color: black">
          <ChevronLeft :size="32" />
        </a>

<!--        <TheCard class="mx-3" :name_les="title"  :num="2"></TheCard>-->

<!--        <TheStudent-->
<!--          v-for="{ num, fio } in list"-->
<!--          :num="num"-->
<!--          :fio="fio"-->
<!--        ></TheStudent>-->
        <TheCard v-if="lesson" :name_les="lesson.name" :num="lesson.number" :group="lesson.group" :type_les="lesson.lecture" :aud="lesson.auditorium"></TheCard>

<!--        <div v-for="student in students" :key="student.id" class="student-info">-->
<!--          <span>{{ student.fio }}</span>-->
<!--          <span v-if="student.present" class="present">Присутствовал</span>-->
<!--          <span v-else class="absent">Отсутствовал</span>-->
<!--        </div>-->
        <TheStudent
            v-for="student in students"
            :key="student.id"
            :num="student.id"
            :fio="student.fio"
            :checked="isRecognized(student)"
        ></TheStudent>
      </div>
    </ion-content>
  </ion-page>
</template>
