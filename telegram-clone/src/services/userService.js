import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firestore';
import {
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';

export const getUsers = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, 'users')
    );

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;

  } catch (error) {
    console.error(
      'Error loading users:',
      error
    );

    return [];
  }
};

export const updateUserStatus = async (
  uid,
  status
) => {
  try {
    const userRef = doc(
      db,
      'users',
      uid
    );

    await updateDoc(
      userRef,
      {
        status,
        lastSeen:
          status === 'offline'
            ? serverTimestamp()
            : null
      }
    );

  } catch(error){
    console.log(error);
  }
};

export const updateProfile = async (
  uid,
  data
) => {
  try {

    const userRef = doc(
      db,
      'users',
      uid
    );

    await updateDoc(
      userRef,
      data
    );

    return true;

  } catch(error) {
    console.log(error);
    return false;
  }
};