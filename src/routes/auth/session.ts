import type {RequestHandler, RequestHandlerOutput} from "@sveltejs/kit";
import {createSessionCookie, verifyIdToken} from "../../lib/firebaseAdmin";

const RESPONSE_INVALID_HEADER = { status: 401, body: 'Invalid auth header' };
const RESPONSE_INVALID_TOKEN = { status: 401, body: 'Invalid auth token' };

const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

export const post: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return RESPONSE_INVALID_HEADER;

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) return RESPONSE_INVALID_HEADER;

  try {
    const decodedIdToken = await verifyIdToken(token);
    const { sub, email } = decodedIdToken;
    const user = { id: sub, email };
    const sessionCookie = await createSessionCookie(token, ONE_WEEK_IN_SECONDS);

    return {
      status: 200,
      body: user,
      headers: {
        'Set-Cookie': sessionCookie,
      }
    }

  } catch {
    return RESPONSE_INVALID_TOKEN;
  }
}

const EXPIRED_COOKIE = 'session=; SameSite=Strict; Path=/; HttpOnly; Max-Age=0;'

export const del: RequestHandler = () => {
  return {
    status: 200,
    headers: {
      'Set-Cookie': EXPIRED_COOKIE,
    },
  }
}