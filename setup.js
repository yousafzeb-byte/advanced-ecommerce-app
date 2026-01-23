const fs = require("fs");
const path = require("path");

console.log("Creating Firebase eCommerce project structure...\n");

// Create directories
const dirs = ["src", "src/config", "src/services", "src/types"];

dirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log("✓ Created:", dir);
  }
});

console.log("\n✅ Setup complete!");
console.log("\nNext: I will provide you the file contents to copy.");
