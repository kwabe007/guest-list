import type {RequestHandler} from "@sveltejs/kit";
import {getFirestore} from "firebase-admin/firestore";
import {getAdminApp} from "../../lib/firebaseAdmin";

export const patch: RequestHandler = async ({params, request}) => {
  const body = await request.json();

  const db = getFirestore(getAdminApp());
  const guestRef = db.collection('guests').doc(params.id);
  await guestRef.update(body);

  return {
    status: 204,
  }
}
