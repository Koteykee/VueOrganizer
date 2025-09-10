import { createRouter, createWebHistory } from "vue-router";

import Welcome from "@/components/Welcome.vue";
import Calculator from "@/components/Calculator.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome,
    },
    {
      path: "/calculator",
      name: "Calculator",
      component: Calculator,
    },
  ],
});

export default router;
