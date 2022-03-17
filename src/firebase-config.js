import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, indexedDBLocalPersistence } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMEriYDBm8y2jr367iUnyULSuySMXMc0I",
  authDomain: "ionic-project-72512.firebaseapp.com",
  databaseURL: "https://ionic-project-72512-default-rtdb.firebaseio.com",
  projectId: "ionic-project-72512",
  storageBucket: "ionic-project-72512.appspot.com",
  messagingSenderId: "625565914471",
  appId: "1:625565914471:web:327417c63f7849fbfc8bc2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth
export const auth = initializeAuth(app, {
  persistence: indexedDBLocalPersistence,
});

const database = getDatabase(app);
export const walksRef = ref(database, "walks");

export const usersRef = ref(database, "users");

export const dogsRef = ref(database, "dogs");
// Get reference to specific post using post id
export function getPostRef(postId) {
  return ref(database, "walks/" + postId);
}
// Get reference to specific user using user id

export function getUserRef(dogId) {
  return ref(database, "dogprofile/" + dogId);
}
// Reference to the storage service
export const storage = getStorage(app);
