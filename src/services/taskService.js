import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';

const tasksCollection = collection(db, 'tasks');

export function subscribeToTasks(projectId, assignedTo, callback) {
  const tasksQuery = query(
    tasksCollection,
    where('projectId', '==', projectId),
    where('assignedTo', '==', assignedTo),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(tasksQuery, (snapshot) => {
    const tasks = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    callback(tasks);
  });
}

export async function createTask(payload) {
  const response = await addDoc(tasksCollection, {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return response.id;
}

export async function updateTask(taskId, payload) {
  await updateDoc(doc(db, 'tasks', taskId), payload);
}

export async function deleteTask(taskId) {
  await deleteDoc(doc(db, 'tasks', taskId));
}
