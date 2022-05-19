import type {RequestHandler, RequestHandlerOutput} from "@sveltejs/kit";
import type {RequestEvent} from "@sveltejs/kit/types/private";

const RESPONSE_INVALID = { status: 401, body: 'Invalid auth header' };

export const post: RequestHandler = ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return RESPONSE_INVALID;

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) return RESPONSE_INVALID;




}