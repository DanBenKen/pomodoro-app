import { defineStore } from "pinia";
import { reactive, ref, watch } from "vue";

export const pomodoroStore = defineStore("timer", () => {
    const focusTime = ref(1500); // 25min
    const shortBreak = ref(300); // 5min
    const longBreak = ref(900); // 15min
    const currentTime = ref(focusTime.value);
    const isRunning = ref(false);
    const cycleCount = ref(0);
    let timer = null;
    const userCycles = reactive(loadUserCycles());
    const currentSessionType = ref(`focus`);
    const currentUserId = ref(loadUserId());

    // watch promene za user ID i cuvamo na local storage-u
    watch(currentUserId, (newId) => {
        saveUserId(newId);
    });

    // watch promene za userCycles i update-ujemo na local storage-u
    watch(() => userCycles, (newValue) => {
        saveUserCycles(newValue);
    }, { deep: true });

    function startTimer() {
        if (!isRunning.value) {
            timer = setInterval(() => {
                if (currentTime.value > 0) {
                    currentTime.value--;
                } else {
                    nextSession();
                }
            }, 1000);

            isRunning.value = true;
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning.value = false;
    }

    function resetTimer() {
        pauseTimer();
        currentTime.value = focusTime.value;
    }

    function resetCycleCount() {
        cycleCount.value = 0;
    }

    // funkcija za formatiranje vremena u MM : SS
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        return `${String(min).padStart(2, "0")} : ${String(sec).padStart(2, "0")}`;}

    function setFocusTime(time) {
        focusTime.value = time;
        resetTimer();
    }

    function setShortBreak(time) {
        shortBreak.value = time;
    }

    function setLongBreak(time) {
        longBreak.value = time;
    }

    // funkcija za promenu sessiona na osnovu trenutne sessije
    function nextSession() {
        pauseTimer();

        if (currentSessionType.value === `focus`) {
            if (cycleCount.value < 3) 
            {
                currentSessionType.value = `shortBreak`;
                currentTime.value = shortBreak.value;
                incrementUserCyclesCount();
            } else {
                currentSessionType.value = `longBreak`;
                currentTime.value = longBreak.value;
                cycleCount.value = -1;
                incrementUserCyclesCount();
            }
        } else {
            currentSessionType.value = `focus`;
            currentTime.value = focusTime.value;
        }

        startTimer();
    }

    function incrementUserCyclesCount() {
        if (!userCycles[currentUserId.value]) {
            userCycles[currentUserId.value] = 0;
        }

        cycleCount.value++;
        userCycles[currentUserId.value]++;
    }

    function getUserHighestCycles() {
        let topUserId = null;
        let maxCycles = 0;

        for (const [userId, cycles] of Object.entries(userCycles)) {
            if (cycles > maxCycles) {
                topUserId = userId;
                maxCycles = cycles;
            }
        }

        return topUserId ? { userid: topUserId, cycles: maxCycles } : null;
    }

    function saveUserCycles(cycles) {
        localStorage.setItem('userCycles', JSON.stringify(cycles));
    }

    function loadUserCycles() {
        const savedCycles = localStorage.getItem('userCycles');
        return savedCycles ? JSON.parse(savedCycles) : {} ;
    }
    
    function generateUserId() {
        const currentDate = new Date(); 
        return `${currentDate.getMonth() + 1}. ${currentDate.getDate()}. ${currentDate.getHours()}:${currentDate.getMinutes()}`;
    }

    function loadUserId() {
        return localStorage.getItem('userId') || generateUserId();
    }

    function saveUserId(id) {
        localStorage.setItem('userId', id);
    }
    
    return {
        focusTime,
        shortBreak,
        longBreak,
        currentTime,
        isRunning,
        cycleCount,
        userCycles,
        currentSessionType,
        startTimer,
        pauseTimer,
        resetTimer,
        formatTime,
        nextSession,
        resetCycleCount,
        setFocusTime,
        setShortBreak,
        setLongBreak,
        getUserHighestCycles
    };
});
