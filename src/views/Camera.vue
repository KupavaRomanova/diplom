<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex flex-col gap-2 mx-2 h-screen justify-around">
        <a href="/schedule" style="color: black">
          <ChevronLeft :size="32" />
        </a>

        <img ref="imageElement" />

        <!-- <img src="../img/photo.jpg" alt=""> -->
        <video ref="video" autoplay></video>

        <IonButton @click="takePicture"> Test </IonButton>

        <RouterLink :to="{name: 'Result', params: {  id: '5', title: '10' }}">
          <!-- <router-link> -->
          <div
            class="px-5 py-3 bg-blue-300 rounded-md flex items-center justify-center mx-2 my-2 text-black"
          >
            Распознать
          </div>
          <!-- </router-link> -->
        </RouterLink>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();


const imageElement = ref();

import { Camera, CameraResultType } from "@capacitor/camera";
import { IonButton } from "@ionic/vue";
const takePicture = async () => {
  console.log("call");

  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  });

  console.log(image);

  var imageUrl = image.webPath;

  imageElement.value.src = imageUrl ?? "";
};
</script>
