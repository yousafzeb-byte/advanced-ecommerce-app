import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, onAddToCart }) {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);

    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  const placeholderImage = `https://via.placeholder.com/300x300/6366f1/ffffff?text=${encodeURIComponent(
    product.title.substring(0, 20)
  )}`;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imageError ? placeholderImage : product.image}
          alt={product.title}
          className="product-image"
          onError={handleImageError}
        />
      </div>
      <div className="product-details">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-rating">
          <span className="rating-stars">
            ⭐ {product.rating?.rate || "N/A"}
          </span>
          <span className="rating-count">
            ({product.rating?.count || 0} reviews)
          </span>
        </div>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className={`add-to-cart-btn ${isAdding ? "adding" : ""}`}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "✓ Added!" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
