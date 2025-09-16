<template>
  <div class="todo-container">
    <h2>Todo List</h2>
    <div class="todo-field">
      <input type="text" v-model="task.content" maxlength="50" class="input" />
      <button @click="addTask">Add Task</button>
    </div>
    <ul>
      <li v-for="taskItem in filteredList" :key="taskItem.id">
        <div class="text-container">
          <img src="../assets/icons/circle.svg" alt="*" />
          <input type="checkbox" v-model="taskItem.isDone" class="checkbox" />
          <p :class="{ done: taskItem.isDone }">{{ taskItem.content }}</p>
        </div>
        <button @click="deleteTask(taskItem.id)">
          <img src="../assets/icons/delete.svg" alt="Delete" />
        </button>
      </li>
    </ul>
    <p v-if="taskList.length === 0">You don't have any tasks yet</p>
    <p
      v-if="
        activeBtn === 'completed' &&
        filteredList.length === 0 &&
        taskList.length !== 0
      "
    >
      You don't have any completed tasks yet
    </p>
    <p
      v-if="
        activeBtn === 'active' &&
        filteredList.length === 0 &&
        taskList.length !== 0
      "
    >
      You don't have any active tasks yet
    </p>
    <div class="btns" v-show="taskList.length > 0">
      <button
        v-if="activeBtn === 'all' || activeBtn === 'active'"
        @click="showCompleted"
      >
        Show completed tasks
      </button>
      <button v-if="activeBtn === 'completed'" @click="showActive">
        Show active tasks
      </button>
      <button @click="showAll">Show all tasks</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const task = ref({ content: "" });
const taskList = ref([]);

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  taskList.value = JSON.parse(savedTasks);
}

const addTask = () => {
  if (task.value.content.trim() === "") return;

  taskList.value.push({
    id: Date.now(),
    content: task.value.content.trim(),
    isDone: false,
  });

  task.value.content = "";
};

const deleteTask = (id) => {
  taskList.value = taskList.value.filter((task) => task.id !== id);
};

const activeBtn = ref("all");

const filteredList = computed(() => {
  let list = taskList.value;
  if (activeBtn.value === "completed") {
    return list.filter((task) => task.isDone);
  }
  if (activeBtn.value === "active") {
    return list.filter((task) => !task.isDone);
  }
  return [...list].sort((a, b) => a.isDone - b.isDone);
});

const showCompleted = () => {
  activeBtn.value = "completed";
};

const showActive = () => {
  activeBtn.value = "active";
};

const showAll = () => {
  activeBtn.value = "all";
};

watch(
  taskList,
  (newList) => {
    localStorage.setItem("tasks", JSON.stringify(newList));
  },
  { deep: true }
);
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

.input {
  width: 80%;
  font-size: 24px;
  padding: 6px;
  border-radius: 6px;
}

h2 {
  margin: 20px;
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

.btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.done {
  text-decoration-line: line-through;
  text-decoration-color: #e49561;
}

.checkbox {
  accent-color: #e49561;
}
</style>
