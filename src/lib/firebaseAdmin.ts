import {cert, getApp, getApps, initializeApp} from "firebase-admin/app";

const adminConfig = {
  credential: cert({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    clientEmail: import.meta.env.VITE_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY,
  })
}

export const getAdminApp = () => {
  return (getApps().length) ? getApp() : initializeApp(adminConfig);
}