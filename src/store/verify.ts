import * as dotenv from "dotenv";
dotenv.config();

console.log("🔍 Checking Firebase Configuration...\n");

console.log("Environment Variables:");
console.log(
  "FIREBASE_API_KEY:",
  process.env.FIREBASE_API_KEY ? "✓ Set" : "❌ Missing",
);
console.log(
  "FIREBASE_AUTH_DOMAIN:",
  process.env.FIREBASE_AUTH_DOMAIN ? "✓ Set" : "❌ Missing",
);
console.log(
  "FIREBASE_PROJECT_ID:",
  process.env.FIREBASE_PROJECT_ID ? "✓ Set" : "❌ Missing",
);
console.log(
  "FIREBASE_STORAGE_BUCKET:",
  process.env.FIREBASE_STORAGE_BUCKET ? "✓ Set" : "❌ Missing",
);
console.log(
  "FIREBASE_MESSAGING_SENDER_ID:",
  process.env.FIREBASE_MESSAGING_SENDER_ID ? "✓ Set" : "❌ Missing",
);
console.log(
  "FIREBASE_APP_ID:",
  process.env.FIREBASE_APP_ID ? "✓ Set" : "❌ Missing",
);

console.log("\nProject ID:", process.env.FIREBASE_PROJECT_ID);
