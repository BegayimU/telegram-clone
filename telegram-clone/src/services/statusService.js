import {
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

import { db } from '../firebase/index';

export const updateUserStatus = async (
  uid,
  status
) => {

  try {

    await updateDoc(
      doc(db, 'users', uid),
      {
        status,
        lastSeen: serverTimestamp()
      }
    );

  } catch(error) {
    console.log(error);
  }

};