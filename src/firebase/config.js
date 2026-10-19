import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const variaveisObrigatorias = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

const variaveisAusentes = Object.entries(variaveisObrigatorias)
  .filter(([, valor]) => !valor)
  .map(([nome]) => nome);

if (variaveisAusentes.length > 0) {
  throw new Error("Sem o .env.local");
}

const firebaseConfig = {
  apiKey: variaveisObrigatorias.VITE_FIREBASE_API_KEY,
  authDomain: variaveisObrigatorias.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: variaveisObrigatorias.VITE_FIREBASE_PROJECT_ID,
  storageBucket: variaveisObrigatorias.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: variaveisObrigatorias.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: variaveisObrigatorias.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
