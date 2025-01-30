<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex flex-col gap-2 mx-4 h-screen justify-between ">
        <a href="/schedule" style="color: black" class="my-2">
          <ChevronLeft :size="32"/>
        </a>

        <div class="w-full h-[25%] flex flex-row justify-center">
          <img class=" w-fit" ref="imageElement"/>
        </div>

        <div class="h-full flex flex-col overflow-auto gap-2">
          <div v-if="loadingStudents" class="text-black/50 overflow-hidden flex flex-col h-full items-center justify-center ">
            <ion-icon class="size-16 animate-bounce" :icon="cameraOutline"/>
            Распознавание...
          </div>
          <div
              v-else
              v-for="student in students" :key="student.id_student"
          >
            <TheStudent :num="student.group" :fio="student.fio" :checked="student.checked" @onChecked="value => checkStudent(student, value)"/>
          </div>
        </div>

        <div class="flex flex-col gap-1 mb-8">
          <IonButton @click="takePicture" color="primary" class="w-full">
            Добавить с фото
          </IonButton>
          <IonButton @click="save" color="light" class="w-full">
            Сохранить
          </IonButton>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {ChevronLeft} from "lucide-vue-next";
import { IonIcon } from '@ionic/vue';
import {cameraOutline  } from 'ionicons/icons';
import {ref, onMounted, onBeforeMount, toRaw} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  lesson_id: number
}>()

interface Student {
  id_student: number;
  fio: string;
  group: string;
  checked: boolean;
}

const loadingStudents = ref<boolean>(false);
const students = ref<Student[]>([]);

const imageElement = ref();

import {Camera, CameraResultType} from "@capacitor/camera";
import {IonButton} from "@ionic/vue";
import $api from "@/http";
import TheStudent from "@/component/TheStudent.vue";

const checkStudent = (student: Student, checked: boolean) => {
  student.checked = checked;
}

const takePicture = async () => {
  loadingStudents.value = true;

  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  console.log(image);

  const imageUrl = image.webPath;

  imageElement.value.src = imageUrl ?? "";

  const response = await fetch(imageUrl!);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("file", blob, "photo.jpg");

  try {

    const {data} = await $api.post('/recognize_faces', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('API Response:', data);

    students.value = students.value.map(x => ({
      ...x,
      checked: x.checked ? x.checked : (data.find((y: any) => y.id_student === x.id_student) !== undefined)
    }));
  } catch (error) {
    console.error('Error uploading image:', error);
  }

  loadingStudents.value = false;
};

const fromServer = async () => {
  const { data } = await $api.get('/group/609-01/students');
  students.value = data.map((x: any) => ({
    id_student: x.id,
    fio: x.fio,
    group: '609-01',
    checked: false
  }))
}

(async () => {
  const saved = localStorage.getItem('lesson_' + props.lesson_id);

  if (saved === null) {
    await fromServer();
    return;
  }

  try {
    const data = JSON.parse(saved);
    students.value = data;
  } catch (e) {
    await fromServer();
    return;
  }
})()

const save = () => {
  localStorage.setItem('lesson_' + props.lesson_id, JSON.stringify(toRaw(students.value)))
  router.back()
}


</script>
