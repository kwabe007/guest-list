import type {UserInfo} from "../types";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getClientApp} from "./firebaseClient";

export async function login(email: string, password: string): Promise<UserInfo> {
  const auth = getAuth(getClientApp());
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const token = await credential.user.getIdToken();
  return fetch('/auth/session', {
    method: 'POST',
    headers: new Headers({ 'Authorization': `Bearer ${token}`}),
  }).then((response) => response.json())
}