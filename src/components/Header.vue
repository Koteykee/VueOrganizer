<template>
  <header>
    <img
      src="../assets/icons/menu.svg"
      alt="Menu"
      class="menu"
      @click="toggleMenu"
    />
    <nav class="nav-bar" :class="{ open: isMenuOpen }" @click="toggleMenu">
      <router-link to="/pomodoro" class="link">Pomodoro</router-link>
      <router-link to="/todolist" class="link">Todo List</router-link>
      <router-link to="/weather" class="link">Weather</router-link>
      <router-link to="/calculator" class="link">Calculator</router-link>
      <router-link to="/passwordGenerator" class="link"
        >Password generator</router-link
      >
    </nav>
  </header>
  <div v-if="isMenuOpen" class="overlay" @click="toggleMenu"></div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const toggleMenu = () => {
  if (window.innerWidth < 1000) {
    isMenuOpen.value = !isMenuOpen.value;
  }
};
</script>

<style scoped>
.nav-bar {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header {
  background-color: rgb(144, 202, 178);
  padding: 16px 40px;
  display: flex;
  align-items: center;
}

.link {
  cursor: pointer;
  font-size: 26px;
  font-weight: 600;
}

.link:hover {
  color: rgb(24, 134, 121);
}

.menu {
  width: 60px;
  visibility: hidden;
}

@media (max-width: 1000px) {
  header {
    position: relative;
    z-index: 100;
  }
  .menu {
    visibility: visible;
  }
  .nav-bar {
    position: absolute;
    top: 92px;
    left: 0;
    background-color: rgb(144, 202, 178);
    flex-direction: column;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    width: 50%;
    min-width: 400px;
    z-index: 100;
  }
  .nav-bar.open {
    visibility: visible;
    opacity: 1;
    pointer-events: auto;
  }
  .link {
    border: 1px solid rgb(14, 113, 131);
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
}

.overlay {
  background-color: rgba(0, 0, 0, 0.25);
  position: fixed;
  inset: 0;
  z-index: 50;
}
</style>
