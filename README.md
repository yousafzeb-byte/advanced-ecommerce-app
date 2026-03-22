# Advanced E-Commerce Web Application

A modern, full-featured e-commerce application built with React, Redux Toolkit, Firebase, and React Query. This project demonstrates advanced React concepts including state management, asynchronous data fetching, routing, session persistence, Firebase backend integration, and a robust CI/CD pipeline with comprehensive test coverage.

🔗 **Live Demo:** [https://e-commerce-product-listing-app.vercel.app](https://e-commerce-product-listing-app.vercel.app)
📦 **GitHub Repository:** [View Source Code](https://github.com/yousafzeb-byte/advanced-ecommerce-app)
🚀 **CI/CD Status:** ![CI/CD Pipeline](https://github.com/yousafzeb-byte/advanced-ecommerce-app/actions/workflows/main.yml/badge.svg)

## Recruiter Snapshot

- Built a production-style React commerce app with Redux Toolkit, React Query, Firebase, and route-based UX flows.
- Implemented CI/CD with automated checks and deployment to Vercel.
- Added test coverage for key UI and integration behaviors (22 passing tests).
- Demonstrated scalable front-end patterns: feature components, state slices, and service modules.

## Visual Showcase

Add screenshots and short GIFs under `docs/media/` to highlight important user flows.

```md
![Product Listing](docs/media/product-listing.png)
![Shopping Cart](docs/media/shopping-cart.png)
![Checkout Flow](docs/media/checkout-flow.gif)
```

## 🚀 Features

### Product Catalog

- **Dynamic Product Listing**: Fetches and displays all products from Firebase Firestore
- **Product Information**: Shows title, price, category, description, rating, and images
- **Image Fallback**: Handles broken image URLs with placeholder images
- **Category Navigation**: Dynamic dropdown populated from API categories
- **Category Filtering**: Filter products by category with real-time updates

### Shopping Cart

- **Redux State Management**: Powered by Redux Toolkit for robust state management
- **Add to Cart**: Add products directly from the product listing page
- **Remove from Cart**: Remove individual items from the cart
- **Quantity Tracking**: Track the count of each product in the cart
- **Session Persistence**: Cart data persists across browser sessions using sessionStorage
- **Real-time Calculations**: Automatic calculation of total items and total price
- **Checkout Functionality**: Simulates checkout by clearing cart with visual feedback

### User Experience

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Spinner animations while fetching data
- **Error Handling**: Graceful error messages for failed API requests
- **Visual Feedback**: Button animations and success messages
- **Navigation**: Easy navigation between Home and Cart pages with cart badge showing item count

## 🛠️ Technologies Used

### Frontend

- **React 18.2** - Modern React with hooks
- **Redux Toolkit** - State management for shopping cart
- **React Query (TanStack Query)** - Asynchronous data fetching and caching
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design

### Backend & Services

- **Firebase** - Backend services (Firestore, Authentication)
- **TypeScript** - Type-safe backend and services

### Testing & Quality Assurance

- **Vitest** - Fast unit test framework for Vite
- **React Testing Library** - Component testing utilities
- **@testing-library/jest-dom** - Custom Jest matchers
- **@testing-library/user-event** - User interaction simulation

### CI/CD & Deployment

- **GitHub Actions** - Automated CI/CD pipeline
- **Vercel** - Cloud platform for deployment
- **ESLint** - Code quality and linting

## 🧪 Test-Driven Development (TDD)

This project implements comprehensive testing following TDD principles:

### Unit Tests

- **ProductCard Component**: 8 tests covering rendering, user interactions, and state changes
  - Product information display
  - Image error handling
  - Add to cart functionality
  - Visual feedback on user actions
  - Navigation behavior
  - Missing data handling

- **Navbar Component**: 7 tests covering rendering and navigation
  - Logo and navigation links
  - Search functionality
  - Cart badge updates
  - Dynamic cart count display
  - Link attributes and routing

### Integration Tests

- **Cart Integration**: 7 tests covering the complete shopping flow
  - Adding products to cart
  - Cart total calculations
  - Quantity updates
  - Product removal
  - Duplicate product handling
  - Checkout process
  - Session storage persistence

### Test Coverage

- **22 passing tests** across all components
- Independent and deterministic tests
- Focused on user interactions and state changes
- Simulates real user behavior using React Testing Library

### Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once (CI mode)
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🔄 CI/CD Pipeline

This project features a fully automated CI/CD pipeline using GitHub Actions and Vercel:

### Continuous Integration (CI)

The CI workflow automatically runs on every push to `main` and on pull requests:

1. **Code Checkout** - Retrieves latest code
2. **Environment Setup** - Configures Node.js 18
3. **Dependency Installation** - Installs npm packages with caching
4. **Code Linting** - Runs ESLint for code quality
5. **Build Process** - Compiles application with Vite
6. **Test Execution** - Runs all unit and integration tests
7. **Artifact Upload** - Stores build output for debugging

**Pipeline Protection**: The workflow fails if any test fails, preventing deployment of faulty code.

### Continuous Deployment (CD)

The CD workflow runs only after successful CI tests:

1. **Code Checkout** - Retrieves verified code
2. **Production Build** - Creates optimized production build
3. **Vercel Deployment** - Deploys to Vercel hosting platform

**Deployment Conditions**:

- Only deploys from `main` branch
- Requires all tests to pass
- Only triggers on direct pushes (not PRs)

### Setting Up CI/CD

For detailed setup instructions, see [CICD_SETUP.md](CICD_SETUP.md).

Quick setup:

1. Connect repository to Vercel
2. Get Vercel credentials (token, org ID, project ID)
3. Add credentials as GitHub Secrets
4. Push to main branch to trigger pipeline

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yousafzeb-byte/advanced-ecommerce-app.git
   cd advanced-ecommerce-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase**

   Create a `.env` file in the root directory with your Firebase configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Production Build

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Preview production build locally**

   ```bash
   npm run preview
   ```

### Testing

1. **Run all tests**

   ```bash
   npm test
   ```

2. **Run tests once (CI mode)**

   ```bash
   npm run test:run
   ```

3. **Run tests with coverage**

   ```bash
   npm run test:coverage
   ```

## 📁 Project Structure

```
Advanced React E-Commerce Web App/
├── .github/
│   └── workflows/
│       └── main.yml              # CI/CD pipeline configuration
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Main product listing page
│   │   ├── Home.css
│   │   ├── ProductCard.jsx       # Individual product card component
│   │   ├── ProductCard.css
│   │   ├── Cart.jsx              # Shopping cart page
│   │   ├── Cart.css
│   │   ├── Navbar.jsx            # Navigation bar with cart badge
│   │   ├── Navbar.css
│   │   ├── ProductDetails.jsx    # Product details page
│   │   └── ProductDetails.css
│   ├── services/
│   │   ├── api.js                # API service functions
│   │   ├── authService.ts        # Firebase authentication service
│   │   ├── productService.ts     # Firebase product service
│   │   ├── orderService.ts       # Firebase order service
│   │   └── userService.ts        # Firebase user service
│   ├── config/
│   │   └── firebase.ts           # Firebase configuration
│   ├── store/
│   │   ├── store.js              # Redux store configuration
│   │   └── cartSlice.js          # Cart reducer and actions
│   ├── test/
│   │   ├── setup.js              # Test configuration
│   │   ├── ProductCard.test.jsx  # ProductCard unit tests
│   │   ├── Navbar.test.jsx       # Navbar unit tests
│   │   └── Cart.integration.test.jsx # Cart integration tests
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js                # Vite build configuration
├── vitest.config.js              # Vitest test configuration
├── vercel.json                   # Vercel deployment configuration
├── CICD_SETUP.md                 # Detailed CI/CD setup guide
└── README.md
```

## 🎯 Key Features Explained

### React Query Implementation

React Query is used for all data fetching operations:

- Automatic caching and refetching
- Loading and error states management
- Optimized re-renders
- Stale data management

### Redux Toolkit Implementation

Shopping cart state is managed using Redux Toolkit:

- **Reducers**: `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`
- **Selectors**: `selectCartItems`, `selectCartTotal`, `selectCartItemCount`
- **Middleware**: Automatic sessionStorage synchronization

### Session Storage

Cart data persists across browser sessions:

- Cart is saved to sessionStorage on every update
- Cart is loaded from sessionStorage on app initialization
- Survives page refreshes and tab closures (within the same session)

### Firebase Integration

Backend powered by Firebase:

- **Firestore Database** - Product catalog, user data, and orders
- **Firebase Authentication** - User authentication and authorization
- **Real-time Updates** - Live data synchronization
- **Cloud Functions** - Serverless backend logic

## 🎨 Styling

The application features:

- **Dark mode support** with light mode fallback
- **Responsive grid layouts** for product displays
- **Smooth animations** for interactions
- **Modern UI components** with hover effects
- **Mobile-first design** approach

## 🔍 Usage Guide

### Browsing Products

1. View all products on the home page
2. Use the category dropdown to filter by category
3. See product details including ratings and descriptions

### Managing Cart

1. Click "Add to Cart" on any product
2. Navigate to the Cart page using the navigation bar
3. View cart items with quantities and subtotals
4. Remove items using the "Remove" button
5. See real-time updates of total items and total price

### Checkout

1. Click "Proceed to Checkout" in the cart
2. View success message
3. Cart is automatically cleared

## 🚀 Building for Production

### Local Production Build

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

This creates an optimized production build in the `dist` directory.

### Deployment to Vercel

The application is automatically deployed to Vercel via GitHub Actions when code is pushed to the `main` branch.

**Manual Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to production
vercel --prod

# Deploy preview
vercel
```

## 📝 Learning Objectives Achieved

This project demonstrates:

- ✅ Asynchronous data fetching with React Query
- ✅ State management with Redux Toolkit
- ✅ React Router for navigation
- ✅ Session storage for data persistence
- ✅ Component-based architecture
- ✅ Responsive web design
- ✅ Error handling and loading states
- ✅ Modern React patterns and best practices
- ✅ Firebase backend integration
- ✅ TypeScript for type safety
- ✅ **Test-Driven Development (TDD)**
- ✅ **Unit and Integration Testing**
- ✅ **CI/CD Pipeline Implementation**
- ✅ **GitHub Actions Workflows**
- ✅ **Automated Deployment to Vercel**
- ✅ **Code Quality with ESLint**

## 🔗 Important Links

- **Live Application**: https://e-commerce-product-listing-app.vercel.app
- **GitHub Repository**: https://github.com/yousafzeb-byte/advanced-ecommerce-app
- **CI/CD Setup Guide**: [CICD_SETUP.md](CICD_SETUP.md)
- **GitHub Actions**: [View Workflows](https://github.com/yousafzeb-byte/advanced-ecommerce-app/actions)

## 🐛 Known Issues

- Product images may fail to load if URLs are broken. The application gracefully handles this by displaying placeholder images.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Yousaf Zeb**

Built as a learning project to demonstrate advanced React concepts.

## 🙏 Acknowledgments

- [Firebase](https://firebase.google.com/) for providing the backend infrastructure
- React, Redux, and React Query teams for excellent documentation
- Vite team for the amazing build tool
