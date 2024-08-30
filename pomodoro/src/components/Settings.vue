<template>
    <div class="container">
        <h2>Custom Settings</h2>
        <div class="setting-input">
            <label for="focusTime">focus</label>
            <input id="focusTime" v-model.number="focusTime" type="number" min="1">
        </div>
        <div>
            <label for="shortBreak">short break</label>
            <input id="shortBreak" v-model.number="shortBreak" type="number" min="1">
        </div>
        <div>
            <label for="longBreak">long break</label>
            <input id="longBreak" v-model.number="longBreak" type="number" min="1">
        </div>
        <button @click="applySettings" class="button">Apply Settings</button>
    </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { pomodoroStore } from "@/stores/pomodoroStore.js";

const timerStore = pomodoroStore();

// ovde uneti manje vrednosti ili na aplikaciji u custom settings-ima
const focusTime = ref(25);
const shortBreak = ref(5);
const longBreak = ref(15);

const emit = defineEmits();


// obrisati - - i uneti sekunde kao vrednosti kako bi lakse testirali aplikaciju

// funkcija za postavljanje vrednosti od strane korisnika
function applySettings() {
    timerStore.setFocusTime(focusTime.value);
    timerStore.setShortBreak(shortBreak.value);
    timerStore.setLongBreak(longBreak.value);
    emit('change-window');
}
</script>

<style scoped>
label {
    display: flex;
    font-size: 2rem;
}

input[type="number"] {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 3rem;
    padding: 1rem;
    color: white;
    border: none;

}

input[type="number"]:hover,
input[type="number"]:focus,
input[type="number"]:active,
input[type="number"]:checked {
    color: white;
    outline: none;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

@media screen and (max-width: 768px) {
  .container {
    border-radius: 3rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>