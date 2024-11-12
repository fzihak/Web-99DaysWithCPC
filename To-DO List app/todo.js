import { getDatabase, ref, set, push, get, child, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { auth } from "./app.js";

const db = getDatabase();

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskContainer");
const historyContainer = document.getElementById("historyContainer");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    const task = taskInput.value.trim();

    if (task !== "") {
        const newTaskKey = push(ref(db, 'tasks/' + user.uid)).key;
        set(ref(db, 'tasks/' + user.uid + '/' + newTaskKey), {
            task: task,
            completed: false,
            timestamp: Date.now(),
        }).then(() => {
            taskInput.value = ""; 
            loadUserTasks(user.uid);
        }).catch((error) => {
            console.error("Error adding task: ", error);
        });
    } else {
        alert("Please enter a valid task.");
    }
});
