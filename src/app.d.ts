/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type {DecodedIdToken} from "firebase-admin/auth";
import {UserInfo} from "./types";

declare namespace App {

  interface Locals {
    idToken: DecodedIdToken | null;
  }
	// interface Platform {}
	interface Session {
    userInfo: UserInfo | null;
  }
	// interface Stuff {}
}
