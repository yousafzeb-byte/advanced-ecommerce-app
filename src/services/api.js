import { getAllProducts, getProductById } from "./productService";

// Fetch all products from Firebase
export const fetchProducts = async () => {
  try {
    const products = await getAllProducts();
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

// Fetch all categories (extract unique categories from products)
export const fetchCategories = async () => {
  try {
    const products = await getAllProducts();
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const products = await getAllProducts();
    return products.filter((product) => product.category === category);
  } catch (error) {
    console.error(`Failed to fetch products for category: ${category}`, error);
    throw new Error(`Failed to fetch products for category: ${category}`);
  }
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  try {
    const product = await getProductById(id);
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  } catch (error) {
    console.error(`Failed to fetch product with ID: ${id}`, error);
    throw new Error(`Failed to fetch product with ID: ${id}`);
  }
};
