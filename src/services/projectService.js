import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from './firebase';

const projectsCollection = collection(db, 'projects');

export function subscribeToProjects(ownerId, callback) {
  const projectsQuery = query(
    projectsCollection,
    where('ownerId', '==', ownerId),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(projectsQuery, (snapshot) => {
    const projects = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    callback(projects);
  });
}

export async function createProject(payload) {
  const response = await addDoc(projectsCollection, {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return response.id;
}

export async function updateProject(projectId, payload) {
  await updateDoc(doc(db, 'projects', projectId), payload);
}

export async function deleteProject(projectId) {
  const batch = writeBatch(db);
  const tasksSnapshot = await getDocs(query(collection(db, 'tasks'), where('projectId', '==', projectId)));

  tasksSnapshot.forEach((taskDoc) => {
    batch.delete(taskDoc.ref);
  });

  batch.delete(doc(db, 'projects', projectId));
  await batch.commit();
}

export async function getProject(projectId) {
  const snapshot = await getDoc(doc(db, 'projects', projectId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}
