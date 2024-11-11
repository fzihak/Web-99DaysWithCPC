import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGLnh2Cefv7IjPRbLpl0T63KZ5aSYRKdc",
  authDomain: "to-do-app-27a49.firebaseapp.com",
  databaseURL: "https://to-do-app-27a49-default-rtdb.firebaseio.com",
  projectId: "to-do-app-27a49",
  storageBucket: "to-do-app-27a49.firebasestorage.app",
  messagingSenderId: "165878527522",
  appId: "1:165878527522:web:5437760902848cfe72fc7b",
  measurementId: "G-T0QGDRBBRL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("User signed in:", user);
      saveUserProfile(user);
    })
    .catch((error) => {
      console.error("Sign-in error:", error.message);
    });
}

function saveUserProfile(user) {
  const userRef = doc(db, "users", user.uid);
  setDoc(userRef, {
    name: user.displayName,
    email: user.email,
    profilePic: user.photoURL
  }, { merge: true });
}

export function logOut() {
  signOut(auth).then(() => {
    console.log("User signed out");
  }).catch((error) => {
    console.error("Sign-out error:", error.message);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User logged in:", user);
    fetchToDoItems(user.uid);
  } else {
    console.log("No user logged in");
  }
});


export function addToDoItem(task) {
  const user = auth.currentUser;
  if (user) {
    const toDoRef = collection(db, "users", user.uid, "todos");
    addDoc(toDoRef, {
      task: task,
      timestamp: Date.now()
    });
  } else {
    console.log("User not authenticated.");
  }
}

export function fetchToDoItems(userId) {
  const toDoRef = collection(db, "users", userId, "todos");
  const q = query(toDoRef, orderBy("timestamp", "desc"));

  onSnapshot(q, (snapshot) => {
    const toDoList = document.getElementById("toDoList");
    toDoList.innerHTML = "";
    snapshot.forEach((doc) => {
      const toDoItem = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = toDoItem.task;
      toDoList.appendChild(listItem);
    });
  });
}
