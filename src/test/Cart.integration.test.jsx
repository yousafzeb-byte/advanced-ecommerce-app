import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../store/cartSlice";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";

// Helper function to create a fresh store
const createTestStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
      },
    },
  });
};

describe("Cart Integration Tests", () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
  });

  it("updates cart when a product is added from ProductCard", () => {
    const store = createTestStore();

    const mockProduct = {
      id: 1,
      title: "Test Laptop",
      price: 999.99,
      category: "electronics",
      description: "A high-performance laptop",
      image: "https://example.com/laptop.jpg",
      rating: { rate: 4.8, count: 200 },
    };

    const handleAddToCart = (product) => {
      store.dispatch(addToCart(product));
    };

    // Render ProductCard and Cart side by side
    const { rerender } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Initially, cart should be empty
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

    // Find and click the Add to Cart button
    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    // Re-render to reflect state changes
    rerender(
      <Provider store={store}>
        <BrowserRouter>
          <ProductCard product={mockProduct} onAddToCart={handleAddToCart} />
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Cart should now contain the product
    expect(screen.queryByText(/your cart is empty/i)).not.toBeInTheDocument();

    // Find the product title within the cart
    const cartSection =
      screen.getByText("Shopping Cart").parentElement.parentElement;
    expect(within(cartSection).getByText("Test Laptop")).toBeInTheDocument();
  });

  it("correctly calculates cart total when multiple products are added", () => {
    const store = createTestStore();

    const product1 = {
      id: 1,
      title: "Laptop",
      price: 1000,
      category: "electronics",
      description: "Gaming laptop",
      image: "https://example.com/laptop.jpg",
    };

    const product2 = {
      id: 2,
      title: "Mouse",
      price: 50,
      category: "electronics",
      description: "Wireless mouse",
      image: "https://example.com/mouse.jpg",
    };

    // Add products to cart
    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Check if both products are in the cart
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();

    // Check total calculation - look for it in the summary section
    const totalElement = screen.getByText("Total").parentElement;
    expect(within(totalElement).getByText(/1050\.00/)).toBeInTheDocument();
  });

  it("updates quantity and recalculates total when quantity is changed", () => {
    const store = createTestStore();

    const product = {
      id: 1,
      title: "Keyboard",
      price: 100,
      category: "electronics",
      description: "Mechanical keyboard",
      image: "https://example.com/keyboard.jpg",
    };

    // Add product to cart
    store.dispatch(addToCart(product));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Initially, check subtotal in the summary section
    const summarySection = screen.getByText("Order Summary").parentElement;
    expect(
      within(summarySection).getAllByText(/100\.00/).length,
    ).toBeGreaterThan(0);

    // Find the quantity input and increase it
    const quantityInput = screen.getByDisplayValue("1");
    fireEvent.change(quantityInput, { target: { value: "3" } });

    // Total should now be $300
    expect(
      within(summarySection).getAllByText(/300\.00/).length,
    ).toBeGreaterThan(0);
  });

  it("removes product from cart when remove button is clicked", () => {
    const store = createTestStore();

    const product = {
      id: 1,
      title: "Headphones",
      price: 150,
      category: "electronics",
      description: "Noise-cancelling headphones",
      image: "https://example.com/headphones.jpg",
    };

    store.dispatch(addToCart(product));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Product should be in cart
    expect(screen.getByText("Headphones")).toBeInTheDocument();

    // Click remove button
    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    // Cart should be empty
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText("Headphones")).not.toBeInTheDocument();
  });

  it("adds quantity when same product is added multiple times", () => {
    const store = createTestStore();

    const product = {
      id: 1,
      title: "Monitor",
      price: 300,
      category: "electronics",
      description: "4K Monitor",
      image: "https://example.com/monitor.jpg",
    };

    // Add the same product twice
    store.dispatch(addToCart(product));
    store.dispatch(addToCart(product));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Should show quantity of 2
    const quantityInput = screen.getByDisplayValue("2");
    expect(quantityInput).toBeInTheDocument();

    // Check that the total in the summary contains 600
    const summarySection = screen.getByText("Order Summary").parentElement;
    expect(
      within(summarySection).getAllByText(/600\.00/).length,
    ).toBeGreaterThan(0);
  });

  it("clears entire cart when checkout is completed", () => {
    const store = createTestStore();

    const product1 = {
      id: 1,
      title: "Product 1",
      price: 100,
      category: "test",
      description: "Test product 1",
      image: "https://example.com/p1.jpg",
    };

    const product2 = {
      id: 2,
      title: "Product 2",
      price: 200,
      category: "test",
      description: "Test product 2",
      image: "https://example.com/p2.jpg",
    };

    store.dispatch(addToCart(product1));
    store.dispatch(addToCart(product2));

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>,
    );

    // Both products should be in cart
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();

    // Click checkout
    const checkoutButton = screen.getByRole("button", {
      name: /proceed to checkout/i,
    });
    fireEvent.click(checkoutButton);

    // Cart should be empty and success message should appear
    expect(screen.getByText(/order placed successfully/i)).toBeInTheDocument();
  });

  it("persists cart data in sessionStorage", () => {
    const store = createTestStore();

    const product = {
      id: 1,
      title: "Test Product",
      price: 50,
      category: "test",
      description: "Test description",
      image: "https://example.com/test.jpg",
    };

    store.dispatch(addToCart(product));

    // Check if data was saved to sessionStorage
    const savedCart = JSON.parse(sessionStorage.getItem("cart"));
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].title).toBe("Test Product");
    expect(savedCart[0].count).toBe(1);
  });
});
