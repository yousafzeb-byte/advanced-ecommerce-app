import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/api";
import { addToCart } from "../store/cartSlice";
import ProductCard from "./ProductCard";
import "./Home.css";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();

  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products based on selected category
  const {
    data: products = [],
    isLoading: productsLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory)
        : fetchProducts(),
  });

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error loading products</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Our Products</h1>
        <div className="category-filter">
          <label htmlFor="category-select">Filter by Category: </label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            disabled={categoriesLoading}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {productsLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
