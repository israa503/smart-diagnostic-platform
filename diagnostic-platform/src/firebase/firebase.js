import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLwfDqahYiEdAlOESJF8Vjq0NTNS3M2nk",
  authDomain: "diagnostic-platform-f524a.firebaseapp.com",
  projectId: "diagnostic-platform-f524a",
  storageBucket: "diagnostic-platform-f524a.firebasestorage.app",
  messagingSenderId: "392734465750",
  appId: "1:392734465750:web:8fc15a4498fca5cb76f377"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);