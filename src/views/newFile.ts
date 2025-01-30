// import { defineComponent, ref } from "vue";
// import { useRouter } from "vue-router";
// import authPlugin from '../../auth';
//
// export default defineComponent({
// components: {
// TheLogo,
// },
// setup() {
// const email = ref('');
// const password = ref('');
// const router = useRouter();
//
// // устанавливаем плагин аутентификации
// authPlugin.install(app);
//
// const handleLogin = async () => {
// try {
// // вызываем метод login из глобального свойства $auth
// const response = await app.config.globalProperties.$auth.login(email.value, password.value);
// console.log(response);
// router.push('/schedule');
// } catch (error) {
// console.error(error);
// }
// };
//
// return {
// email,
// password,
// handleLogin,
// };
// },
// });
