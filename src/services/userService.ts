import { db } from "../config/firebase";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { User } from "../types";

export const getUserProfile = async (uid: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data() as User;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<User>) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};

export const deleteUserAccount = async (uid: string) => {
  await deleteDoc(doc(db, "users", uid));
};
