import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from "../store/cartSlice";
import "./ProductDetails.css";

const fetchProductById = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  return response.json();
};

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }

    setTimeout(() => {
      setIsAdding(false);
    }, 800);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getPlaceholderImage = () => {
    return `https://via.placeholder.com/600x600/6366f1/ffffff?text=${encodeURIComponent(
      product?.title.substring(0, 20) || "Product"
    )}`;
  };

  if (isLoading) {
    return (
      <div className="product-details-loading">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find the product you're looking for.</p>
        <button onClick={() => navigate("/")}>Back to Products</button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-details-content">
        <div className="product-details-image-section">
          <div className="product-details-image">
            <img
              src={imageError ? getPlaceholderImage() : product.image}
              alt={product.title}
              onError={handleImageError}
            />
          </div>
        </div>

        <div className="product-details-info">
          <div className="product-breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            <span className="separator">/</span>
            <span className="category">{product.category}</span>
          </div>

          <h1 className="product-details-title">{product.title}</h1>

          <div className="product-rating-section">
            <div className="rating-stars">
              {"⭐".repeat(Math.round(product.rating?.rate || 0))}
              {"☆".repeat(5 - Math.round(product.rating?.rate || 0))}
            </div>
            <span className="rating-text">
              {product.rating?.rate || "N/A"} ({product.rating?.count || 0}{" "}
              reviews)
            </span>
          </div>

          <div className="product-price-section">
            <span className="product-details-price">
              ${product.price.toFixed(2)}
            </span>
            <span className="price-label">Price per unit</span>
          </div>

          <div className="product-category-badge">
            Category: <span>{product.category}</span>
          </div>

          <div className="product-description-section">
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <div className="quantity-control">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`add-to-cart-btn ${isAdding ? "adding" : ""}`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              {isAdding ? "✓ Added to Cart!" : "🛒 Add to Cart"}
            </button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <span className="icon">🚚</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="icon">↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="icon">🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
