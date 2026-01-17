import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
} from "../store/cartSlice";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ id: productId, count: newQuantity }));
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }

    dispatch(clearCart());
    setShowCheckoutSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowCheckoutSuccess(false);
    }, 3000);
  };

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  const getPlaceholderImage = (product) => {
    return `https://via.placeholder.com/150x150/6366f1/ffffff?text=${encodeURIComponent(
      product.title.substring(0, 15)
    )}`;
  };

  if (showCheckoutSuccess) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>🎉 Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your cart has been cleared.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Add some amazing products to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <span className="cart-item-count">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img
                    src={
                      imageErrors[item.id]
                        ? getPlaceholderImage(item)
                        : item.image
                    }
                    alt={item.title}
                    onError={() => handleImageError(item.id)}
                  />
                </div>

                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-category">{item.category}</p>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemoveFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    🗑️ Remove
                  </button>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.count - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={item.count}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      min="1"
                      aria-label="Quantity"
                    />
                    <button
                      className="quantity-btn"
                      onClick={() =>
                        handleQuantityChange(item.id, item.count + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-pricing">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <span className="item-subtotal">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>
          <div className="summary-line">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total</span>
            <span className="total-amount">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
          <p className="secure-checkout">🔒 Secure Checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
