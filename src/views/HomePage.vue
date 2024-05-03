<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";

import { IonInput } from "@ionic/vue";
import { defineComponent } from "vue";

import { useRouter } from "vue-router";

import TheLogo from "@/component/TheLogo.vue";

// Vue 3 Composition API
// function onClick() {
//   console.log("dsad");
// }
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex flex-col items-center gap-2 mx-10 my-3">
        <TheLogo class="my-14" />
        <ion-input
        class="  min-w-80"
          label="Электронная почта"
          label-placement="floating"
          fill="outline"
          mode="md"
          placeholder="Enter text"
        ></ion-input>

        <ion-button
          class="min-w-80 text-gray-950"
          color="light"
          router-link="/schedule"
          >Войти</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<!-- <style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style> -->
