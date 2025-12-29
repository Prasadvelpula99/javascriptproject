let habits = JSON.parse(localStorage.getItem("habits")) || [];

const habitList = document.getElementById("habitList");

function addHabit() {
    const habitInput = document.getElementById("habitInput");
    const habitName = habitInput.value;

    if (habitName === "") return;

    habits.push({
        name: habitName,
        streak: 0,
        lastCompleted: null
    });

    habitInput.value = "";
    saveAndRender();
}

function completeHabit(index) {
    const today = new Date().toDateString();
    const habit = habits[index];

    if (habit.lastCompleted !== today) {
        habit.streak++;
        habit.lastCompleted = today;
    }

    saveAndRender();
}


function resetHabit(index) {
    habits[index].streak = 0;
    habits[index].lastCompleted = null;
    saveAndRender();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

function renderHabits() {
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span>${habit.name}</span>
            <span class="streak">${habit.streak} 🔥</span>
            <button onclick="completeHabit(${index})">Done</button>
            <button onclick="resetHabit(${index})">Reset</button>
            <button onclick="deleteHabit(${index})">Delete</button>
        `;

        habitList.appendChild(li);
    });
}

renderHabits();
