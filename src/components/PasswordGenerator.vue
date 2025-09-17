<template>
  <div class="container">
    <h3 class="title">Password Generator</h3>
    <div class="password">
      <p v-if="password === ''">Click generate</p>
      <p v-else @click="copyPassword">{{ password }}</p>
      <p v-if="password !== '' && copied !== password" class="copy-hint">
        click to copy
      </p>
      <p v-if="password !== '' && copied === password" class="copied">copied</p>
    </div>
    <p class="text">Length: {{ passLength }}</p>
    <div class="slider">
      <Slider
        v-model.number="passLength"
        :min="4"
        :max="30"
        :tooltips="false"
      />
    </div>
    <p class="text">Settings</p>
    <div class="settings">
      <div class="setting">
        <p>Include Uppercase</p>
        <VueToggles
          :width="60"
          checkedBg="#10b981"
          v-model="useUppercase"
          :class="{
            disabled:
              useLowercase === false &&
              useNumbers === false &&
              useSymbols === false,
          }"
        />
      </div>
      <div class="setting">
        <p>Include Lowercase</p>
        <VueToggles
          :width="60"
          checkedBg="#10b981"
          v-model="useLowercase"
          :class="{
            disabled:
              useUppercase === false &&
              useNumbers === false &&
              useSymbols === false,
          }"
        />
      </div>
      <div class="setting">
        <p>Include Numbers</p>
        <VueToggles
          :width="60"
          checkedBg="#10b981"
          v-model="useNumbers"
          :class="{
            disabled:
              useUppercase === false &&
              useLowercase === false &&
              useSymbols === false,
          }"
        />
      </div>
      <div class="setting">
        <p>Include Symbols</p>
        <VueToggles
          :width="60"
          checkedBg="#10b981"
          v-model="useSymbols"
          :class="{
            disabled:
              useUppercase === false &&
              useLowercase === false &&
              useNumbers === false,
          }"
        />
      </div>
    </div>
    <button @click="getPassword" class="btn">Generate password</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueToggles from "vue-toggles";
import Slider from "@vueform/slider";

const passLength = ref(10);
const useUppercase = ref(true);
const useLowercase = ref(true);
const useNumbers = ref(true);
const useSymbols = ref(false);

const password = ref("");

const getPassword = () => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let availableChars = "";

  if (useUppercase.value) availableChars += uppercase;
  if (useLowercase.value) availableChars += lowercase;
  if (useNumbers.value) availableChars += numbers;
  if (useSymbols.value) availableChars += symbols;

  let result = "";

  for (let i = 0; i < passLength.value; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    result += availableChars[randomIndex];
  }
  password.value = result;
};

const copied = ref("");

const copyPassword = async () => {
  if (password.value) {
    await navigator.clipboard.writeText(password.value);
  }
  copied.value = password.value;
};
</script>

<style scoped>
.container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: rgb(43, 43, 43);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 30px;
}

.text {
  font-size: 20px;
  margin: 10px;
}

.btn {
  width: 100%;
  height: 60px;
  padding: 10px;
  font-size: 24px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #10b981;
  color: white;
}

.btn:hover {
  background-color: rgb(24, 134, 121);
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.98);
  background-color: rgb(14, 113, 131);
}

.settings {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting {
  background-color: rgb(66, 66, 66);
  border-radius: 10px;
  padding: 14px;
  font-size: 24px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.slider {
  width: 100%;
}

.password {
  width: 100%;
  height: 60px;
  background-color: rgb(66, 66, 66);
  border-radius: 10px;
  padding: 14px;
  font-size: 20px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.disabled {
  pointer-events: none;
  cursor: not-allowed;
  filter: brightness(0.6);
}

.copy-hint {
  position: absolute;
  bottom: 6px;
  right: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.copied {
  position: absolute;
  bottom: 6px;
  left: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}
</style>
