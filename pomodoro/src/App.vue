<template>
  <div id="app">
    <Timer v-if="!windowChange" @change-window="toggleWindows"/>
    <Settings v-else @change-window="toggleWindows"/>
    <MostProdSess/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Settings from './components/Settings.vue';
import Timer from './components/Timer.vue';
import MostProdSess from './components/MostProdSession.vue'

let windowChange = ref(false);

function toggleWindows() {
  windowChange.value = !windowChange.value;
}
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 5rem;
}
</style>