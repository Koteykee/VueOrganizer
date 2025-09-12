import { createRouter, createWebHistory } from "vue-router";

import Welcome from "@/components/Welcome.vue";
import Pomodoro from "@/components/Pomodoro.vue";
import TodoList from "@/components/TodoList.vue";
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
      path: "/pomodoro",
      name: "Pomodoro",
      component: Pomodoro,
    },
    {
      path: "/todolist",
      name: "Todo List",
      component: TodoList,
    },
    {
      path: "/calculator",
      name: "Calculator",
      component: Calculator,
    },
  ],
});

export default router;
