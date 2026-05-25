import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firestore';

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