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

function loadUserTasks(userId) {
    const taskListRef = ref(db, 'tasks/' + userId);
    get(taskListRef).then((snapshot) => {
        taskContainer.innerHTML = "";
        if (snapshot.exists()) {
            snapshot.forEach((task) => {
                const taskData = task.val();
                const taskId = task.key;
                const taskDiv = document.createElement("div");
                taskDiv.classList.add("task");
                taskDiv.innerHTML = `
                    <p contenteditable="true" class="task-text ${taskData.completed ? 'completed' : ''}" data-id="${taskId}">${taskData.task}</p>
                    <button class="toggle-completion" data-id="${taskId}">${taskData.completed ? "Undo" : "Complete"}</button>
                    <button class="edit-task" data-id="${taskId}">Edit</button>
                    <button class="delete-task" data-id="${taskId}">Delete</button>
                    <small>Created: ${new Date(taskData.timestamp).toLocaleString()}</small>
                `;
                taskContainer.appendChild(taskDiv);
            });

            attachTaskActions();
        } else {
            taskContainer.innerHTML = "<p>No tasks yet!</p>";
        }
    }).catch((error) => {
        console.error("Error loading tasks: ", error);
    });
}

function attachTaskActions() {
    const completeButtons = document.querySelectorAll(".toggle-completion");
    completeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const taskId = e.target.getAttribute("data-id");
            const user = auth.currentUser;
            const taskRef = ref(db, 'tasks/' + user.uid + '/' + taskId);
            get(taskRef).then((snapshot) => {
                const currentCompletionStatus = snapshot.val().completed;
                update(taskRef, { completed: !currentCompletionStatus }).then(() => {
                    loadUserTasks(user.uid); 
                }).catch((error) => {
                    console.error("Error updating task completion: ", error);
                });
            });
        });
    });

    const taskTexts = document.querySelectorAll(".task-text");
    taskTexts.forEach((taskText) => {
        taskText.addEventListener("blur", (e) => {
            const taskId = e.target.getAttribute("data-id");
            const newText = e.target.innerText.trim();
            if (newText) {
                const user = auth.currentUser;
                const taskRef = ref(db, 'tasks/' + user.uid + '/' + taskId);
                update(taskRef, { task: newText }).then(() => {
                    loadUserTasks(user.uid);
                }).catch((error) => {
                    console.error("Error editing task: ", error);
                });
            }
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-task");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const taskId = e.target.getAttribute("data-id");
            const user = auth.currentUser;
            const taskRef = ref(db, 'tasks/' + user.uid + '/' + taskId);
            remove(taskRef).then(() => {
                loadUserTasks(user.uid); 
            }).catch((error) => {
                console.error("Error deleting task: ", error);
            });
        });
    });
}

auth.onAuthStateChanged((user) => {
    if (user) {
        loadUserTasks(user.uid);
    } else {
        window.location.replace("index.html"); 
    }
});

const logoutButton = document.getElementById("logoutButton");
logoutButton.addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.replace("index.html"); 
    }).catch((error) => {
        console.log("Error signing out: ", error);
    });
});
