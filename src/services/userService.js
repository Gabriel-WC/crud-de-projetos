import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function createUserProfile({ uid, nome, email }) {
  await setDoc(doc(db, 'users', uid), {
    uid,
    nome,
    email,
    createdAt: serverTimestamp(),
  });
}

export async function ensureUserProfile({ uid, nome, email }) {
  const userRef = doc(db, 'users', uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid,
      nome: nome || 'Usuario',
      email: email || '',
      createdAt: serverTimestamp(),
    });
    return;
  }

  await updateDoc(userRef, {
    nome: nome || snapshot.data().nome || 'Usuario',
    email: email || snapshot.data().email || '',
  });
}
