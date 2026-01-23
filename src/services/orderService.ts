import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { Order, OrderItem } from "../types";

export const createOrder = async (
  userId: string,
  items: OrderItem[],
  totalPrice: number,
) => {
  const orderData = {
    userId,
    items,
    totalPrice,
    status: "pending" as const,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "orders"), orderData);
  return docRef.id;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  const ordersSnapshot = await getDocs(q);
  return ordersSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Order,
  );
};

export const getOrderById = async (orderId: string): Promise<Order | null> => {
  const orderDoc = await getDoc(doc(db, "orders", orderId));
  if (orderDoc.exists()) {
    return { id: orderDoc.id, ...orderDoc.data() } as Order;
  }
  return null;
};
