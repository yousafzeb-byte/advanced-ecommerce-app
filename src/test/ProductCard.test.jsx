import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductCard from "../components/ProductCard";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 29.99,
    category: "electronics",
    description: "This is a test product description",
    image: "https://example.com/image.jpg",
    rating: {
      rate: 4.5,
      count: 120,
    },
  };

  const mockOnAddToCart = vi.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
    mockOnAddToCart.mockClear();
  });

  it("renders product information correctly", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$29.99")).toBeInTheDocument();
    expect(screen.getByText("electronics")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test product description"),
    ).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.5")).toBeInTheDocument();
    expect(screen.getByText("(120 reviews)")).toBeInTheDocument();
  });

  it("displays product image with correct attributes", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const image = screen.getByAltText("Test Product");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.image);
  });

  it("calls onAddToCart when Add to Cart button is clicked", async () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it("shows visual feedback when adding to cart", async () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });

    // Initially shows "Add to Cart"
    expect(addButton).toHaveTextContent("🛒 Add to Cart");

    // Click the button
    fireEvent.click(addButton);

    // Should show "Added!" feedback
    await waitFor(() => {
      expect(addButton).toHaveTextContent("✓ Added!");
    });

    // Button should be disabled during the feedback period
    expect(addButton).toBeDisabled();
  });

  it("navigates to product details when card is clicked", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const card = screen.getByText("Test Product").closest(".product-card");
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });

  it("does not navigate when Add to Cart button is clicked", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const addButton = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(addButton);

    // Navigate should not be called when button is clicked
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("handles missing rating data gracefully", () => {
    const productWithoutRating = {
      ...mockProduct,
      rating: undefined,
    };

    render(
      <BrowserRouter>
        <ProductCard
          product={productWithoutRating}
          onAddToCart={mockOnAddToCart}
        />
      </BrowserRouter>,
    );

    expect(screen.getByText("⭐ N/A")).toBeInTheDocument();
    expect(screen.getByText("(0 reviews)")).toBeInTheDocument();
  });

  it("switches to placeholder image on image load error", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} onAddToCart={mockOnAddToCart} />
      </BrowserRouter>,
    );

    const image = screen.getByAltText("Test Product");

    // Trigger image error
    fireEvent.error(image);

    // Should switch to placeholder
    expect(image.src).toContain("placeholder");
  });
});
