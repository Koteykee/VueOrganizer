<template>
  <div class="calc-container">
    <div class="display">
      <input type="text" class="history" v-model="history" readonly />
      <input
        type="text"
        class="current"
        placeholder="0"
        v-model="answer"
        readonly
      />
    </div>

    <div class="buttons">
      <div class="empty-slot"></div>
      <div class="empty-slot"></div>
      <div class="empty-slot"></div>
      <button @click="backspace">⌫</button>

      <button @click="applyFunction('inv')">1/x</button>
      <button @click="applyFunction('square')">x²</button>
      <button @click="applyFunction('sqrt')">√x</button>
      <button @click="append('÷')">÷</button>

      <button @click="append('7')">7</button>
      <button @click="append('8')">8</button>
      <button @click="append('9')">9</button>
      <button @click="append('x')">x</button>

      <button @click="append('4')">4</button>
      <button @click="append('5')">5</button>
      <button @click="append('6')">6</button>
      <button @click="append('-')">-</button>

      <button @click="append('1')">1</button>
      <button @click="append('2')">2</button>
      <button @click="append('3')">3</button>
      <button @click="append('+')">+</button>

      <button @click="clear">C</button>
      <button @click="append('0')">0</button>
      <button @click="append('.')">.</button>
      <button @click="calculate">=</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const answer = ref("");
const history = ref("");
let justCalculated = false;

function append(value) {
  const operators = ["+", "-", "*", "/", "x", "÷"];

  if (justCalculated) {
    if (!operators.includes(value)) {
      answer.value = value;
      justCalculated = false;
      return;
    } else {
      history.value = answer.value + value.replace("x", "*").replace("÷", "/");
      answer.value = "";
      justCalculated = false;
      return;
    }
  }

  const operator = value.replace("x", "*").replace("÷", "/");

  if (operators.includes(value)) {
    if (answer.value === "" && history.value === "") {
      if (value === "-") {
        answer.value = "-";
        return;
      } else {
        history.value = "0" + operator;
        return;
      }
    }

    if (answer.value === "-" && history.value === "") {
      history.value = "0" + operator;
      answer.value = "";
      return;
    }

    if (answer.value !== "") {
      history.value += answer.value + operator;
      answer.value = "";
    } else {
      const lastChar = history.value.slice(-1);
      if (operators.includes(lastChar)) {
        history.value = history.value.slice(0, -1) + operator;
      }
    }

    return;
  }

  if (!isNaN(value)) {
    if (answer.value === "0" && value === "0") return;
    if (answer.value === "0" && value !== "0") {
      answer.value = value;
      return;
    }
    answer.value += value;
    return;
  }

  if (value === ".") {
    if (answer.value === "") {
      answer.value = "0.";
    } else if (!answer.value.includes(".")) {
      answer.value += ".";
    }
  }
}

function applyFunction(fn) {
  try {
    const num = parseFloat(answer.value);
    if (isNaN(num)) return;

    if (fn === "square") {
      answer.value = String(roundTo(num ** 2, 12));
    } else if (fn === "sqrt") {
      answer.value = String(roundTo(Math.sqrt(num), 12));
    } else if (fn === "inv") {
      if (num === 0) {
        answer.value = "Error";
        return;
      }
      answer.value = String(roundTo(1 / num, 12));
    }
    justCalculated = true;
  } catch {
    answer.value = "Error";
  }
}

function clear() {
  answer.value = "";
  history.value = "";
  justCalculated = false;
}

function backspace() {
  if (answer.value.length > 0) {
    answer.value = answer.value.slice(0, -1);
  } else if (history.value.length > 0) {
    const match = history.value.match(/([\d.]+|\*|\/|\+|\-)+$/);
    if (match) {
      history.value = history.value.slice(0, -match[0].length);
    } else {
      history.value = history.value.slice(0, -1);
    }
  }
}

function calculate() {
  try {
    let expr = history.value + answer.value;

    if (!answer.value && history.value) {
      const lastChar = history.value.slice(-1);
      if ("+-*/".includes(lastChar)) {
        const lastNumberMatch = history.value.match(/(\d+\.?\d*)[^0-9]*$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[1];
          expr += lastNumber;
        } else {
          answer.value = "Error";
          history.value = "";
          return;
        }
      }
    }

    expr = expr.replace(/x/g, "*").replace(/÷/g, "/");
    if (expr === "") return;

    const result = eval(expr);
    if (!isFinite(result)) {
      answer.value = "Error";
      history.value = "";
      return;
    }

    answer.value = String(roundTo(result, 12));
    history.value = "";
    justCalculated = true;
  } catch {
    answer.value = "Error";
    history.value = "";
  }
}

function roundTo(num, digits) {
  const factor = 10 ** digits;
  return Math.round(num * factor) / factor;
}
</script>

<style scoped>
.calc-container {
  width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 12px;
  background-color: rgb(43, 43, 43);
  color: white;
}

.display {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.display input {
  width: 100%;
  text-align: right;
  padding: 10px;
  border: none;
  background-color: #e0efec;
  color: #333;
}

.display .history {
  font-size: 20px;
  height: 30px;
  color: #666;
  border-radius: 6px 6px 0 0;
}

.display .current {
  font-size: 30px;
  height: 50px;
  border-radius: 0 0 6px 6px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 24px;
  border: none;
  border-radius: 8px;
  background-color: #d3ede3;
  color: #222;
  cursor: pointer;
}

.empty-slot {
  background-color: #2b2b2b;
  pointer-events: none;
}

button:hover {
  background-color: #bfe0d4;
}

button:active {
  background-color: #a8d1c1;
}
</style>
