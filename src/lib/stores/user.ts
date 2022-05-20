import { session } from "$app/stores";
import {derived, Writable} from "svelte/store";
import {UserInfo} from "../../types";

export const user = derived<Writable<App.Session>, UserInfo>(
  session,
  ($session, set) => {
    set($session.user);
  }
)

export const setUser = (user: UserInfo | null) => {
  session.update(($session) => ({ ...$session, user }));
}