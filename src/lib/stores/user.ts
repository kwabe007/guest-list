import { session } from "$app/stores";
import {derived, type Writable} from "svelte/store";
import type {User} from "../../types";

export const user = derived<Writable<App.Session>, User>(
  session,
  ($session, set) => {
    set($session.user);
  }
)

export const setUser = (user: User | null) => {
  session.update(($session) => ({ ...$session, user }));
}