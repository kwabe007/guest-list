/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {User} from "./types";

declare namespace App {

// interface Platform {}
	interface Session {
    user: User | null;
  }
	// interface Stuff {}
}
