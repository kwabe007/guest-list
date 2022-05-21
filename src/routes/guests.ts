import type {RequestHandler} from "@sveltejs/kit";
import {getAdminApp} from "../lib/firebaseAdmin";
import {getFirestore} from "firebase-admin/firestore";

export const get: RequestHandler = async () => {
  const db = getFirestore(getAdminApp());
  const querySnap = await db.collection('guests').get();
  const guests = querySnap.docs.map((doc) => {
    return { ...doc.data() };
  });

  return {
    status: 200,
    body: guests,
  }
}