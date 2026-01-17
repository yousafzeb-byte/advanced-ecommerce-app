import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
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
      <h1>🛒 Shopping Cart</h1>

      <div className="cart-summary">
        <p>
          Total Items: <strong>{itemCount}</strong>
        </p>
        <p>
          Total Price: <strong>${cartTotal.toFixed(2)}</strong>
        </p>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img
                src={
                  imageErrors[item.id] ? getPlaceholderImage(item) : item.image
                }
                alt={item.title}
                onError={() => handleImageError(item.id)}
              />
            </div>
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
              <p className="cart-item-quantity">Quantity: {item.count}</p>
              <p className="cart-item-subtotal">
                Subtotal: ${(item.price * item.count).toFixed(2)}
              </p>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveFromCart(item.id)}
              aria-label={`Remove ${item.title} from cart`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <h2>Total: ${cartTotal.toFixed(2)}</h2>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
