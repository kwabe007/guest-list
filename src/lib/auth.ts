import type {User} from "../types";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getClientApp} from "./firebaseClient";
import {setUser} from "./stores/user";

export async function logIn(email: string, password: string): Promise<User> {
  const auth = getAuth(getClientApp());
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const token = await credential.user.getIdToken();
  const user = await fetch('/auth/session', {
    method: 'POST',
    headers: new Headers({ 'Authorization': `Bearer ${token}`}),
  }).then((response) => response.json())

  return user;
}

export async function logOut() {
  await fetch('/auth/session', {
    method: 'DELETE',
  })
  setUser(null);
}