import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleProducts = [
  {
    title: 'MacBook Pro 16"',
    price: 2499.99,
    description: "Apple M3 Max chip, 36GB RAM, 1TB SSD",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    stock: 10,
  },
  {
    title: "iPhone 15 Pro",
    price: 999.99,
    description: "Titanium design with A17 Pro chip",
    category: "electronics",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    stock: 15,
  },
  {
    title: "Men's Casual Jacket",
    price: 55.99,
    description: "Slim fit casual jacket for men",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    stock: 20,
  },
  {
    title: "Women's T-Shirt",
    price: 29.99,
    description: "Cotton blend comfortable t-shirt",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    stock: 30,
  },
  {
    title: "Gold Ring",
    price: 168.0,
    description: "Beautiful gold plated ring",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    stock: 12,
  },
];

async function addProducts() {
  console.log("Adding products to Firebase...\n");

  try {
    for (const product of sampleProducts) {
      const docRef = await addDoc(collection(db, "products"), product);
      console.log(`✓ Added: ${product.title} (ID: ${docRef.id})`);
    }
    console.log("\n✅ All products added successfully!");
  } catch (error) {
    console.error("❌ Error adding products:", error);
  }

  process.exit(0);
}

addProducts();
