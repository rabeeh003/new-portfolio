import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHHpmUmMQPA25zteHf6zZFzLLLLZp6OR4",
  authDomain: "serpro-a94fb.firebaseapp.com",
  projectId: "serpro-a94fb",
  storageBucket: "serpro-a94fb.firebasestorage.app",
  messagingSenderId: "559946915674",
  appId: "1:559946915674:web:4f999fc88036b4997b9d63",
  measurementId: "G-JJ3GDHXS96"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;