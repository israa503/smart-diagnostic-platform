import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLwfDqahYIEdAlOESJF8VjqONTNS3M2nk",
  authDomain: "diagnostic-platform-f524a.firebaseapp.com",
  projectId: "diagnostic-platform-f524a",
  storageBucket: "diagnostic-platform-f524a.firebasestorage.app",
  messagingSenderId: "392734465750",
  appId: "1:392734465750:web:8fc15a4498fca5cb76f377",
  measurementId: "G-78PLQRLL5C",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;