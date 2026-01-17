import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>
          &copy; 2026 Advanced E-Commerce Store. Built with React, Redux
          Toolkit, and React Query.
        </p>
      </footer>
    </div>
  );
}

export default App;
