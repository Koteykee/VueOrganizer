<template>
  <div class="container">
    <div
      @click="focusTimer('work')"
      class="work"
      :class="{
        active: activeTimer === 'work',
        inactive: activeTimer === 'break',
      }"
    >
      <p class="text" :class="{ activeTitle: activeTimer === 'work' }">Work</p>
      <button
        @click.stop="workTimerInc"
        class="btn"
        :class="{ hidden: activeTimer !== null }"
      >
        ⏶
      </button>
      <div>{{ activeTimer === "work" ? formattedTime : workTimer }}</div>
      <button
        @click.stop="workTimerDec"
        class="btn"
        :class="{ hidden: activeTimer !== null }"
      >
        ⏷
      </button>
    </div>
    <div
      @click="focusTimer('break')"
      class="break"
      :class="{
        active: activeTimer === 'break',
        inactive: activeTimer === 'work',
      }"
    >
      <p class="text" :class="{ activeTitle: activeTimer === 'break' }">
        Break
      </p>
      <button
        @click.stop="breakTimerInc"
        class="btn"
        :class="{ hidden: activeTimer !== null }"
      >
        ⏶
      </button>
      <div>{{ activeTimer === "break" ? formattedTime : breakTimer }}</div>
      <button
        @click.stop="breakTimerDec"
        class="btn"
        :class="{ hidden: activeTimer !== null }"
      >
        ⏷
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const workTimer = ref(20);
const breakTimer = ref(5);
const activeTimer = ref(null);

const focusTimer = (active) => {
  if (activeTimer.value === null) {
    activeTimer.value = active;
    activeTimer.value === "work"
      ? timer(workTimer.value)
      : timer(breakTimer.value);
  } else {
    stopTimer();
    activeTimer.value = null;
  }
};

const workTimerInc = () => {
  workTimer.value++;
};

const workTimerDec = () => {
  if (workTimer.value < 2) return;
  workTimer.value--;
};

const breakTimerInc = () => {
  breakTimer.value++;
};

const breakTimerDec = () => {
  if (breakTimer.value < 2) return;
  breakTimer.value--;
};

const timeLeft = ref(0);
let timerInterval = null;

const timer = (time) => {
  timeLeft.value = time * 60;

  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      activeTimer.value = null;
    }
  }, 1000);
};

const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const formattedTime = computed(() => {
  const min = Math.floor(timeLeft.value / 60)
    .toString()
    .padStart(2, "0");
  const sec = (timeLeft.value % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
});
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

.work.active,
.break.active {
  width: 100%;
}

.work.inactive,
.break.inactive {
  width: 0%;
  opacity: 0;
  pointer-events: none;
}

.text {
  margin: 10px;
}

.activeTitle {
  font-size: 60px;
  position: relative;
  top: -100px;
  transition: all 0.5s ease;
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

.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>
