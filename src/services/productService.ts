import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  const productsSnapshot = await getDocs(collection(db, "products"));
  return productsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Product,
  );
};

export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  const productDoc = await getDoc(doc(db, "products", productId));
  if (productDoc.exists()) {
    return { id: productDoc.id, ...productDoc.data() } as Product;
  }
  return null;
};

export const createProduct = async (productData: Omit<Product, "id">) => {
  const docRef = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateProduct = async (
  productId: string,
  productData: Partial<Product>,
) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, productData);
};

export const deleteProduct = async (productId: string) => {
  await deleteDoc(doc(db, "products", productId));
};
