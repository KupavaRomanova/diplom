<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="flex flex-col items-center gap-2 mx-10 my-3">
        <TheLogo class="my-14" />
        <ion-input
            :value="email"
            @ion-input="(x: any) => email = x.detail.value"
            class="min-w-80"
            label="Email"
            label-placement="floating"
            fill="outline"
            mode="md"
            placeholder="Введите email">
        </ion-input>

        <ion-input
            :value="password"
            @ion-input="(x: any) => password = x.detail.value"
            class="min-w-80"
            label="Пароль"
            label-placement="floating"
            fill="outline"
            mode="md"
            placeholder="Введите пароль"
            type="password">
        </ion-input>

        <ion-button
            @click="handleLogin"
            color="light"
            class="min-w-80 py-3 rounded-md flex items-center justify-center">
          Войти
        </ion-button>

        <div v-if="err" class="w-64">
          {{err}}
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import $api from "@/http";
import TheLogo from "@/component/TheLogo.vue";
import axios from "axios"; 

const email = ref('');
const password = ref('');

const err = ref('');

const router = useRouter();

const handleLogin = async () => {
  try {
    const data = new FormData();
    data.append("username", email.value);
    data.append("password", password.value);

    console.log(data, email.value, password.value);

    const response = await $api.post('/jwt/login/', data);

    localStorage.setItem('token', response.data.access_token);
    $api.defaults.headers.common['Authorization'] = response.data.access_token;

    await router.push('/schedule');
  } catch (error: any) {
    console.error('Login failed:', error);
    err.value = 'Неверный логин или пароль';

    // err.value = JSON.stringify({error}, ' ', 2);

    if (error.response && error.response.status === 401) {
      console.log('Unauthorized. Invalid credentials.');
    } else if (error.response) {
      console.log('Unexpected error during login:', error.response.data.message);
    } else {
      console.log('Unexpected error during login:', error.message);
    }
  }
};
</script>
