import {cert, getApp, getApps, initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

const adminConfig = {
  credential: cert({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    clientEmail: import.meta.env.VITE_FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: import.meta.env.VITE_FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })
}

export const getAdminApp = () => {
  return (getApps().length) ? getApp() : initializeApp(adminConfig);
}

export const verifyIdToken = (token: string) => {
  const auth = getAuth(getAdminApp());
  return auth.verifyIdToken(token);
}

export const createSessionCookie = async (token: string, maxAge: number) => {
  const expiresIn = maxAge * 1000;
  const auth = getAuth(getAdminApp());
  const session = await auth.createSessionCookie(token, {expiresIn});
  return `session=${session}; SameSite=Strict; path=/; HttpOnly; Secure; Max-Age=${expiresIn}`;
}

export const getIdTokenFromSessionCookie = async (sessionCookie: string | null) => {
  if (!sessionCookie) return null;

  const auth = getAuth(getAdminApp());
  try {
    return await auth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }

}