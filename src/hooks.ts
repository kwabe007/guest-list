import type {GetSession, Handle} from "@sveltejs/kit";
import getCookieValue from "./lib/getCookieValue";
import {getIdTokenFromSessionCookie} from "./lib/firebaseAdmin";

export const handle: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get('cookie');
  const sessionCookie = getCookieValue(cookieHeader, 'session');
  event.locals.idToken = await getIdTokenFromSessionCookie(sessionCookie);
  return resolve(event);
}

export const getSession: GetSession = ({locals}) => {
  const user = locals.idToken ? {
    id: locals.idToken.sub,
    email: locals.idToken.email,
  } : null;

  return { user };
}