import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Navbar from "../components/Navbar";
import cartReducer from "../store/cartSlice";

// Helper function to create a mock store
const createMockStore = (cartItems = []) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: cartItems,
      },
    },
  });
};

describe("Navbar Component", () => {
  it("renders navbar with logo and navigation links", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Check for logo
    expect(screen.getByText("E-Shop")).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      /search everything online and in store/i,
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("displays cart badge when items are in cart", () => {
    const cartItems = [
      { id: 1, title: "Product 1", price: 10, count: 2 },
      { id: 2, title: "Product 2", price: 20, count: 1 },
    ];
    const store = createMockStore(cartItems);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Should display total count (2 + 1 = 3)
    const badge = screen.getByText("3");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("cart-badge");
  });

  it("does not display cart badge when cart is empty", () => {
    const store = createMockStore([]);

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Badge should not exist
    const badge = screen.queryByText(/\d+/);
    expect(badge).not.toBeInTheDocument();
  });

  it("has correct links for navigation", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const shopLink = screen.getByText("Shop").closest("a");
    const cartLink = screen.getByText("Cart").closest("a");
    const logoLink = screen.getByText("E-Shop").closest("a");

    expect(shopLink).toHaveAttribute("href", "/");
    expect(cartLink).toHaveAttribute("href", "/cart");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("updates cart count when items change", () => {
    const cartItems = [{ id: 1, title: "Product 1", price: 10, count: 5 }];
    const store = createMockStore(cartItems);

    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Should show count of 5
    expect(screen.getByText("5")).toBeInTheDocument();

    // Add more items to the same product
    const newCartItems = [{ id: 1, title: "Product 1", price: 10, count: 10 }];
    const newStore = createMockStore(newCartItems);

    rerender(
      <Provider store={newStore}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Should now show count of 10
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders all navigation icons", () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    // Check for emoji icons (they should be in the document)
    expect(screen.getByText("🏠")).toBeInTheDocument();
    expect(screen.getByText("🛒")).toBeInTheDocument();
    expect(screen.getByText("✱")).toBeInTheDocument();
  });
});
