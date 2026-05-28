import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  orderBy
} from 'firebase/firestore';

import { db } from '../firebase/index.js';
import {
  deleteDoc,
  doc
} from 'firebase/firestore';


export const sendMessage = async (
  chatId,
  senderId,
  text,
  image = ''
) => {
  try {
    await addDoc(
      collection(db, 'messages'),
      {
        chatId,
        senderId,
        text,
        image,
        createdAt: serverTimestamp(),
      }
    );
  } catch (error) {
    console.log(error);
  }
};


export const getMessages = async (chatId) => {
  try {
    const q = query(
    collection(db, 'messages'),
    where('chatId', '==', chatId),
    orderBy('createdAt')
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  } catch (error) {
    console.log(error);
    return [];
  }
};


export const subscribeMessages = (
  chatId,
  callback
) => {

  const q = query(
    collection(db, 'messages'),
    where('chatId', '==', chatId),
    orderBy('createdAt', 'asc')
  );

  return onSnapshot(q, (snapshot) => {

    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(messages);

  });

};

export const deleteMessage = async (
  messageId
) => {
  try {

    await deleteDoc(
      doc(
        db,
        'messages',
        messageId
      )
    );

  } catch(error) {
    console.log(error);
  }
};