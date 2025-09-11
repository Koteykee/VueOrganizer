<template>
  <div class="todo-container">
    <div class="todo-field">
      <input type="text" v-model="task" maxlength="50" />
      <button @click="addTask">Add Task</button>
    </div>
    <ul>
      <li v-for="(task, index) in taskList" :key="index">
        <div class="text-container">
          <img src="../assets/icons/circle.svg" alt="." />
          <p>{{ task }}</p>
        </div>
        <button @click="deleteTask(index)">
          <img src="../assets/icons/delete.svg" alt="Delete" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";

const task = ref("");
const taskList = ref([]);

const addTask = () => {
  if (task.value.trim() === "") return;

  taskList.value.push(task.value);
  task.value = "";
};

const deleteTask = (index) => {
  taskList.value = taskList.value.filter(
    (task, indexTask) => index !== indexTask
  );
};
</script>

<style scoped>
.todo-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin: 20px;
  gap: 10px;
}

.todo-field {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

li {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.text-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

input {
  width: 80%;
  font-size: 24px;
  padding: 6px;
  border-radius: 6px;
}

button {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  padding: 6px;
  border: none;
  border-radius: 6px;
  background-color: rgb(24, 134, 121);
  color: white;
}

button:hover {
  background-color: #e49561;
  transform: scale(1.05);
}

button:active {
  transform: scale(0.98);
  background-color: rgb(14, 113, 131);
}
</style>
