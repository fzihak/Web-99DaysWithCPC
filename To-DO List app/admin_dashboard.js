import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, onValue, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGLnh2Cefv7IjPRbLpl0T63KZ5aSYRKdc",
  authDomain: "to-do-app-27a49.firebaseapp.com",
  databaseURL: "https://to-do-app-27a49-default-rtdb.firebaseio.com",
  projectId: "to-do-app-27a49",
  storageBucket: "to-do-app-27a49.appspot.com",
  messagingSenderId: "165878527522",
  appId: "1:165878527522:web:5437760902848cfe72fc7b",
  measurementId: "G-T0QGDRBBRL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();

const userTableBody = document.getElementById("userTableBody");
const logoutBtn = document.getElementById("logoutBtn");

function populateUserTable() {
  const usersRef = ref(db, "users/");
  onValue(usersRef, (snapshot) => {
    userTableBody.innerHTML = "";
    const users = snapshot.val();
    if (users) {
      Object.entries(users).forEach(([userId, userData]) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${userId}</td>
          <td>${userData.email}</td>
          <td>${Object.keys(userData.tasks || {}).length} tasks</td>
          <td>
            <button class="button deleteUser" data-userid="${userId}">Delete</button>
          </td>
        `;
        userTableBody.appendChild(row);
      });
    }
  });
}

userTableBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteUser")) {
    const userId = e.target.getAttribute("data-userid");
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
      remove(ref(db, `users/${userId}`));
    }
  }
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    console.error("Logout failed: ", error);
  });
});

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "index.html";
  }
});

populateUserTable();
