<template>
  <header>
    <nav class="nav-bar">
      <router-link to="/pomodoro" class="link">Pomodoro</router-link>
      <router-link to="/todolist" class="link">Todo List</router-link>
      <h2>Weather</h2>
      <router-link to="/calculator" class="link">Calculator</router-link>
      <h2>Password generator</h2>
    </nav>
  </header>
</template>

<script setup></script>

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
  padding: 10px 40px;
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
</style>
