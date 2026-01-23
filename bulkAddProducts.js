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

const products = [
  {
    title: "Wireless Headphones",
    price: 89.99,
    description: "Bluetooth 5.0 noise cancelling headphones",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    stock: 50,
  },
  {
    title: "Smart Watch",
    price: 199.99,
    description: "Fitness tracker with heart rate monitor",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    stock: 30,
  },
  {
    title: "Leather Wallet",
    price: 45.99,
    description: "Genuine leather bifold wallet",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
    stock: 40,
  },
  {
    title: "Running Shoes",
    price: 129.99,
    description: "Lightweight running shoes for men",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    stock: 25,
  },
  {
    title: "Yoga Mat",
    price: 29.99,
    description: "Non-slip exercise yoga mat",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600",
    stock: 60,
  },
  {
    title: "Backpack",
    price: 79.99,
    description: "Water-resistant laptop backpack",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    stock: 35,
  },
  {
    title: "Sunglasses",
    price: 149.99,
    description: "UV protection polarized sunglasses",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600",
    stock: 45,
  },
  {
    title: "Coffee Maker",
    price: 89.99,
    description: "Programmable drip coffee maker",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600",
    stock: 20,
  },
  {
    title: "Desk Lamp",
    price: 39.99,
    description: "LED desk lamp with USB charging",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    stock: 55,
  },
  {
    title: "Water Bottle",
    price: 24.99,
    description: "Stainless steel insulated water bottle",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    stock: 100,
  },
];

async function bulkAdd() {
  console.log(`Adding ${products.length} products to Firebase...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      const docRef = await addDoc(collection(db, "products"), product);
      console.log(`✓ Added: ${product.title}`);
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${product.title} - ${error.message}`);
      errorCount++;
    }
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Success: ${successCount} products`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} products`);
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

  process.exit(0);
}

bulkAdd();
