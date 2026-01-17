import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../store/cartSlice";
import "./Navbar.css";

function Navbar() {
  const itemCount = useSelector(selectCartItemCount);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-spark">✱</span>
          <span className="logo-text">Walmart</span>
        </Link>
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search everything at Walmart online and in store"
          />
          <button className="search-btn">🔍</button>
        </div>
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <span>Shop</span>
          </Link>
          <Link to="/cart" className="nav-link cart-link">
            <span className="nav-icon">🛒</span>
            <span>Cart</span>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
