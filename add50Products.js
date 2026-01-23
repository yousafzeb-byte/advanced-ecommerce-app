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
  // ELECTRONICS (15 products)
  {
    title: "4K Smart TV 55 inch",
    price: 599.99,
    description: "Ultra HD Smart TV with HDR and streaming apps",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600",
    stock: 15,
  },
  {
    title: "Gaming Laptop",
    price: 1299.99,
    description: "High-performance gaming laptop with RTX graphics",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600",
    stock: 8,
  },
  {
    title: "Wireless Mouse",
    price: 29.99,
    description: "Ergonomic wireless mouse with precision tracking",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600",
    stock: 100,
  },
  {
    title: "Mechanical Keyboard",
    price: 119.99,
    description: "RGB backlit mechanical gaming keyboard",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    stock: 45,
  },
  {
    title: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable waterproof Bluetooth speaker",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    stock: 60,
  },
  {
    title: "Smartphone 128GB",
    price: 699.99,
    description: "Latest smartphone with 5G and triple camera",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
    stock: 25,
  },
  {
    title: "Tablet 10 inch",
    price: 349.99,
    description: "Android tablet perfect for entertainment",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600",
    stock: 30,
  },
  {
    title: "Webcam HD 1080p",
    price: 59.99,
    description: "HD webcam for video calls and streaming",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1585931441934-1c1c06c08bb1?w=600",
    stock: 40,
  },
  {
    title: "External Hard Drive 2TB",
    price: 89.99,
    description: "Portable external hard drive for backup",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600",
    stock: 50,
  },
  {
    title: "USB-C Hub",
    price: 39.99,
    description: "Multi-port USB-C hub with HDMI",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600",
    stock: 70,
  },
  {
    title: "Wireless Charger",
    price: 24.99,
    description: "Fast wireless charging pad for smartphones",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1591290619762-d4c9f8b4b8e0?w=600",
    stock: 80,
  },
  {
    title: "Power Bank 20000mAh",
    price: 44.99,
    description: "High-capacity portable power bank",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600",
    stock: 65,
  },
  {
    title: "Action Camera 4K",
    price: 199.99,
    description: "Waterproof action camera with accessories",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600",
    stock: 20,
  },
  {
    title: "Smart Doorbell",
    price: 149.99,
    description: "WiFi video doorbell with motion detection",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600",
    stock: 35,
  },
  {
    title: "Fitness Tracker",
    price: 79.99,
    description: "Activity tracker with heart rate monitor",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600",
    stock: 55,
  },

  // MEN'S CLOTHING (12 products)
  {
    title: "Men's Casual T-Shirt",
    price: 19.99,
    description: "Comfortable cotton t-shirt for everyday wear",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    stock: 120,
  },
  {
    title: "Men's Jeans",
    price: 59.99,
    description: "Classic fit denim jeans",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1542272454315-7f6df80e9e0c?w=600",
    stock: 80,
  },
  {
    title: "Men's Polo Shirt",
    price: 34.99,
    description: "Classic polo shirt in multiple colors",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=600",
    stock: 90,
  },
  {
    title: "Men's Hoodie",
    price: 49.99,
    description: "Warm fleece hoodie with front pocket",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
    stock: 70,
  },
  {
    title: "Men's Dress Shirt",
    price: 44.99,
    description: "Formal dress shirt for business",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600",
    stock: 60,
  },
  {
    title: "Men's Chinos",
    price: 54.99,
    description: "Slim fit chino pants",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600",
    stock: 75,
  },
  {
    title: "Men's Winter Coat",
    price: 179.99,
    description: "Insulated winter coat with hood",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600",
    stock: 30,
  },
  {
    title: "Men's Sneakers",
    price: 89.99,
    description: "Casual sneakers for daily wear",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600",
    stock: 50,
  },
  {
    title: "Men's Belt Leather",
    price: 29.99,
    description: "Genuine leather belt with classic buckle",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=600",
    stock: 100,
  },
  {
    title: "Men's Baseball Cap",
    price: 24.99,
    description: "Adjustable baseball cap",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600",
    stock: 110,
  },
  {
    title: "Men's Socks Pack",
    price: 14.99,
    description: "6-pack cotton crew socks",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=600",
    stock: 150,
  },
  {
    title: "Men's Swim Shorts",
    price: 34.99,
    description: "Quick-dry swim shorts with pockets",
    category: "men's clothing",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
    stock: 85,
  },

  // WOMEN'S CLOTHING (12 products)
  {
    title: "Women's Blouse",
    price: 39.99,
    description: "Elegant blouse perfect for office wear",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600",
    stock: 65,
  },
  {
    title: "Women's Jeans",
    price: 64.99,
    description: "High-waisted skinny jeans",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600",
    stock: 70,
  },
  {
    title: "Women's Maxi Dress",
    price: 89.99,
    description: "Flowy maxi dress for summer",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600",
    stock: 45,
  },
  {
    title: "Women's Cardigan",
    price: 54.99,
    description: "Cozy knit cardigan sweater",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600",
    stock: 60,
  },
  {
    title: "Women's Leggings",
    price: 29.99,
    description: "High-waisted workout leggings",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600",
    stock: 100,
  },
  {
    title: "Women's Blazer",
    price: 99.99,
    description: "Professional blazer jacket",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600",
    stock: 40,
  },
  {
    title: "Women's Handbag",
    price: 79.99,
    description: "Stylish leather handbag",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    stock: 55,
  },
  {
    title: "Women's Sandals",
    price: 44.99,
    description: "Comfortable summer sandals",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
    stock: 75,
  },
  {
    title: "Women's Scarf",
    price: 24.99,
    description: "Soft winter scarf",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600",
    stock: 90,
  },
  {
    title: "Women's Yoga Pants",
    price: 39.99,
    description: "Stretchy yoga pants for workouts",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600",
    stock: 85,
  },
  {
    title: "Women's Winter Boots",
    price: 119.99,
    description: "Waterproof winter boots",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600",
    stock: 35,
  },
  {
    title: "Women's Sun Hat",
    price: 29.99,
    description: "Wide-brim sun protection hat",
    category: "women's clothing",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600",
    stock: 95,
  },

  // JEWELERY (11 products)
  {
    title: "Silver Bracelet",
    price: 89.99,
    description: "Sterling silver charm bracelet",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    stock: 40,
  },
  {
    title: "Pearl Necklace",
    price: 199.99,
    description: "Freshwater pearl necklace",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600",
    stock: 25,
  },
  {
    title: "Diamond Ring",
    price: 899.99,
    description: "14K white gold diamond engagement ring",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600",
    stock: 10,
  },
  {
    title: "Gold Hoop Earrings",
    price: 149.99,
    description: "14K gold plated hoop earrings",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600",
    stock: 35,
  },
  {
    title: "Men's Watch",
    price: 249.99,
    description: "Luxury automatic mechanical watch",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
    stock: 20,
  },
  {
    title: "Pendant Necklace",
    price: 69.99,
    description: "Silver pendant with gemstone",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600",
    stock: 50,
  },
  {
    title: "Charm Bracelet",
    price: 79.99,
    description: "Silver charm bracelet with charms",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    stock: 45,
  },
  {
    title: "Anklet Chain",
    price: 39.99,
    description: "Delicate gold anklet",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600",
    stock: 60,
  },
  {
    title: "Brooch Pin",
    price: 54.99,
    description: "Vintage style decorative brooch",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    stock: 30,
  },
  {
    title: "Cufflinks Set",
    price: 44.99,
    description: "Silver cufflinks for formal wear",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600",
    stock: 55,
  },
  {
    title: "Friendship Bracelet",
    price: 19.99,
    description: "Handmade woven friendship bracelet",
    category: "jewelery",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600",
    stock: 100,
  },
];

async function add50Products() {
  console.log(`\n🚀 Adding ${products.length} products to Firebase...\n`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      await addDoc(collection(db, "products"), product);
      console.log(
        `✓ ${product.title.padEnd(40)} | ${product.category.padEnd(20)} | $${product.price}`,
      );
      successCount++;
    } catch (error) {
      console.error(`✗ Failed: ${product.title} - ${error.message}`);
      errorCount++;
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`\n📊 SUMMARY:`);
  console.log(`   ✅ Successfully added: ${successCount} products`);
  if (errorCount > 0) {
    console.log(`   ❌ Failed: ${errorCount} products`);
  }
  console.log(`\n📦 Category Breakdown:`);

  const categoryCount = {};
  products.forEach((p) => {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
  });

  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`   • ${category}: ${count} products`);
  });

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("✅ All done! Refresh your app to see the new products.\n");

  process.exit(0);
}

add50Products();
