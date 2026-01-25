# Testing Guide

## Overview

This project uses Vitest and React Testing Library for comprehensive testing coverage.

## Running Tests

### Interactive Mode (Watch)

```bash
npm test
```

Runs tests in watch mode - tests automatically re-run when files change.

### CI Mode (Run Once)

```bash
npm run test:run
```

Runs all tests once and exits - used in CI/CD pipeline.

### UI Mode

```bash
npm run test:ui
```

Opens Vitest UI for interactive test exploration.

### Coverage Report

```bash
npm run test:coverage
```

Generates test coverage report showing which code is tested.

## Test Structure

### Unit Tests

#### ProductCard Component (`src/test/ProductCard.test.jsx`)

Tests individual component functionality in isolation.

**Tests:**

1. Renders product information correctly
2. Displays product image with correct attributes
3. Calls onAddToCart when button is clicked
4. Shows visual feedback when adding to cart
5. Navigates to product details when card is clicked
6. Prevents navigation when button is clicked
7. Handles missing rating data gracefully
8. Switches to placeholder image on error

**Key Patterns:**

```javascript
// Mock navigation
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Test rendering with Router
render(
  <BrowserRouter>
    <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
  </BrowserRouter>,
);
```

#### Navbar Component (`src/test/Navbar.test.jsx`)

Tests navigation bar with Redux integration.

**Tests:**

1. Renders navbar with logo and navigation links
2. Renders search input with placeholder
3. Displays cart badge when items are in cart
4. Does not display cart badge when cart is empty
5. Has correct links for navigation
6. Updates cart count when items change
7. Renders all navigation icons

**Key Patterns:**

```javascript
// Create mock Redux store
const createMockStore = (cartItems = []) => {
  return configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: cartItems } },
  });
};

// Render with Provider
render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>,
);
```

### Integration Tests

#### Cart Integration (`src/test/Cart.integration.test.jsx`)

Tests complete user workflows involving multiple components.

**Tests:**

1. Updates cart when product is added from ProductCard
2. Correctly calculates cart total with multiple products
3. Updates quantity and recalculates total
4. Removes product from cart when remove button is clicked
5. Adds quantity when same product is added multiple times
6. Clears entire cart when checkout is completed
7. Persists cart data in sessionStorage

**Key Patterns:**

```javascript
// Test complete flow
store.dispatch(addToCart(product));
fireEvent.click(addButton);

// Check state changes
expect(screen.getByText("Product Name")).toBeInTheDocument();

// Verify sessionStorage
const savedCart = JSON.parse(sessionStorage.getItem("cart"));
expect(savedCart).toHaveLength(1);
```

## Writing New Tests

### Best Practices

1. **Test User Behavior, Not Implementation**

   ```javascript
   // ✅ Good - tests what user sees
   expect(
     screen.getByRole("button", { name: /add to cart/i }),
   ).toBeInTheDocument();

   // ❌ Bad - tests implementation details
   expect(component.state.isAdding).toBe(false);
   ```

2. **Use Accessible Queries**
   Priority order:
   - `getByRole` (best - tests accessibility)
   - `getByLabelText`
   - `getByPlaceholderText`
   - `getByText`
   - `getByTestId` (last resort)

3. **Clean Up Between Tests**

   ```javascript
   beforeEach(() => {
     sessionStorage.clear();
     mockFunction.mockClear();
   });
   ```

4. **Test Async Operations**

   ```javascript
   await waitFor(() => {
     expect(screen.getByText("Loaded!")).toBeInTheDocument();
   });
   ```

5. **Keep Tests Independent**
   Each test should run successfully in isolation.

### Test Template

```javascript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import YourComponent from "../components/YourComponent";

describe("YourComponent", () => {
  beforeEach(() => {
    // Setup before each test
  });

  it("should do something when user interacts", () => {
    // Arrange
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>,
    );

    // Act
    fireEvent.click(screen.getByRole("button"));

    // Assert
    expect(screen.getByText("Expected Result")).toBeInTheDocument();
  });
});
```

## Common Testing Patterns

### Testing User Interactions

```javascript
const button = screen.getByRole("button", { name: /click me/i });
fireEvent.click(button);
```

### Testing Form Input

```javascript
const input = screen.getByLabelText(/email/i);
fireEvent.change(input, { target: { value: "test@example.com" } });
expect(input.value).toBe("test@example.com");
```

### Testing Redux State

```javascript
const store = createMockStore([{ id: 1, count: 2 }]);
render(
  <Provider store={store}>
    <Component />
  </Provider>,
);
```

### Testing Navigation

```javascript
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useNavigate: () => mockNavigate,
}));
```

### Testing Async Operations

```javascript
await waitFor(() => {
  expect(screen.getByText("Data Loaded")).toBeInTheDocument();
});
```

### Testing Error States

```javascript
const image = screen.getByAltText("Product");
fireEvent.error(image);
expect(image.src).toContain("placeholder");
```

## Debugging Tests

### View Rendered Output

```javascript
import { screen } from "@testing-library/react";

// See entire DOM
screen.debug();

// See specific element
screen.debug(screen.getByRole("button"));
```

### Check Available Queries

```javascript
// See all available roles
screen.logTestingPlaygroundURL();
```

### Common Issues

**Element Not Found**

```javascript
// Use queryBy for elements that might not exist
expect(screen.queryByText("Not Here")).not.toBeInTheDocument();

// Use findBy for async elements
const element = await screen.findByText("Async Content");
```

**Multiple Elements**

```javascript
// Use getAllBy when multiple elements expected
const buttons = screen.getAllByRole("button");
expect(buttons).toHaveLength(3);

// Use within to scope queries
const container = screen.getByTestId("container");
within(container).getByText("Scoped Text");
```

**Async Updates**

```javascript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText("Updated")).toBeInTheDocument();
});

// Wait for element to disappear
await waitFor(() => {
  expect(screen.queryByText("Loading")).not.toBeInTheDocument();
});
```

## CI/CD Integration

Tests automatically run in GitHub Actions:

- On every push to `main`
- On every pull request
- Before deployment to Vercel

Pipeline fails if any test fails, preventing broken code from being deployed.

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
