<template>
    <div class="container">
        <div class="sessionLabel">
            <h2>{{ sessionLabel }}</h2>
        </div>
        
        <div class="timer">
            <p>{{ formatTime(currentTime) }}</p>
        </div>

        <div class="controls">
            <button class="button" @click="startTimer" title="Play"><font-awesome-icon icon="play" /></button>
            <button class="button" @click="pauseTimer" title="Pause"><font-awesome-icon icon="pause" /></button>
            <button class="button" @click="resetTimer" title="Reset"><font-awesome-icon icon="rotate-left" /></button>
            <button class="button" @click="handleEmit" title="Custom Settings"><font-awesome-icon icon="bars"/></button>
        </div>
        
        <div class="cycle">
            <p>Cycle: {{ cycleCount + 1 }} of 4</p>
        </div>
    </div>
</template>

<script setup>
import { computed, defineEmits } from "vue";
import { pomodoroStore } from '@/stores/pomodoroStore'

const timerStore = pomodoroStore();

const currentTime = computed(() => timerStore.currentTime);
const cycleCount = computed(() => timerStore.cycleCount);
const formatTime = timerStore.formatTime;

const emit = defineEmits();

const sessionLabel = computed(() => {
    if (timerStore.currentSessionType === `focus`) {
        return 'Focus Session';
    } else if (timerStore.currentSessionType === `shortBreak`) {
        return 'Short Break';
    } else {
        return 'Long Break';
    }
});

function startTimer() {
    timerStore.startTimer();
}

function handleEmit() {
    timerStore.resetCycleCount();
    emit('change-window');
}

function pauseTimer() { timerStore.pauseTimer(); }
function resetTimer() { timerStore.resetTimer(); }

</script>

<style scoped>
.timer p {
    font-size: 8rem;
}

.controls {
    display: flex;
    gap: 2rem;
}

.controls button {
    width: 5rem;
    font-size: 2rem;
}

.cycle {
    font-size: 3rem;
    padding-top: 3rem;
}

@media screen and (max-width: 768px) {
  .container {
    border-radius: 3rem;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>