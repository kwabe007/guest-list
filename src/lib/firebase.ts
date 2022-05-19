import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
}

export function getClientApp() {
  // Ensure that there is only one app instance created.
  if(getApps().length) return getApp();

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);
  setPersistence(auth, inMemoryPersistence);
}

export function login(email: string, password: string) {
  const auth = getAuth(getClientApp());
}