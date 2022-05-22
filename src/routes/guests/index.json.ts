import type {RequestHandler} from "@sveltejs/kit";
import {getAdminApp} from "../../lib/firebaseAdmin";
import {getFirestore} from "firebase-admin/firestore";

export const get: RequestHandler = async () => {
  const db = getFirestore(getAdminApp());
  const querySnap = await db.collection('guests').get();
  const guests = querySnap.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return {
    status: 200,
    body: guests,
  }
}

export const post: RequestHandler = async ({ request}) => {
  const guestNames: string[] = await request.json();

  const db = getFirestore(getAdminApp());
  const batch = db.batch();

  guestNames.forEach((name) => {
    const newGuestRef = db.collection('guests').doc();
    batch.set(newGuestRef, { name, isCheckedIn: false });
  })

  await batch.commit();

  return {
    status: 204,
  }
}