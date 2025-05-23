import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2HBNZY-VWD6euqkzuwGCaLwhn4fdmRgk",
  authDomain: "ai-avatar-project-87d2e.firebaseapp.com",
  projectId: "ai-avatar-project-87d2e",
  storageBucket: "ai-avatar-project-87d2e.firebasestorage.app",
  messagingSenderId: "777175978751",
  appId: "1:777175978751:web:3230200569c3a5617872ca",
  measurementId: "G-2L72PC842G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };
