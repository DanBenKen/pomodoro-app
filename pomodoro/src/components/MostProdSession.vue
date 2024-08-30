<template>
    <div class="container">
        <h2>Most Productive Session</h2>

        <p v-if="topUserSession">{{ topUserSession.userid }} - Cycles: {{  topUserSession.cycles }}</p>
        <p v-else>No data available. Start your pomodoro!</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { pomodoroStore } from '@/stores/pomodoroStore'

const timerStore = pomodoroStore();

const topUserSession = ref(null);

function updateTopUser() {
    topUserSession.value = timerStore.getUserHighestCycles();
}

onMounted(() => {
    updateTopUser();
});

watch(() => timerStore.getUserHighestCycles(), (newValue) => {
    topUserSession.value = newValue;
});
</script>

<style scoped>
.container {
    border-radius: 3rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

@media screen and (max-width: 768px) {
  .container {
    border-radius: 3rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 1.3rem;
    justify-content: start;
    height: auto;
  }
}
</style>