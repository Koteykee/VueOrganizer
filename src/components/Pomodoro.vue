<template>
  <div class="container">
    <div class="work">
      <p class="text">Work</p>
      <button class="btn">⏶</button>
      <div>{{ workTimer }}</div>
      <button class="btn">⏷</button>
    </div>
    <div class="break">
      <p class="text">Break</p>
      <button class="btn">⏶</button>
      <div>{{ breakTimer }}</div>
      <button class="btn">⏷</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const workTimer = ref(20);
const breakTimer = ref(5);
const activeTimer = ref(null);
</script>

<style scoped>
.container {
  display: flex;
  height: 76vh;
  font-size: 36px;
  margin: 10px;
}

.work,
.break {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.5s ease;
}

.work:hover {
  width: 70%;
}

.break:hover {
  width: 70%;
}

.work {
  background-color: rgb(205, 243, 255);
}

.break {
  background-color: rgb(250, 255, 205);
}

.text {
  margin: 10px;
}

.btn {
  padding: 10px;
  font-size: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(14, 114, 131, 0.25);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover {
  background: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
}
</style>
