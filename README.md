# Advanced E-Commerce Web Application

A modern, full-featured e-commerce application built with React, Redux Toolkit, Firebase, and React Query. This project demonstrates advanced React concepts including state management, asynchronous data fetching, routing, session persistence, and Firebase backend integration.

🔗 **Live Demo:** [View Project](https://github.com/yousafzeb-byte/advanced-ecommerce-app)

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

- **React 18.2** - Modern React with hooks
- **Redux Toolkit** - State management for shopping cart
- **React Query (TanStack Query)** - Asynchronous data fetching and caching
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and development server
- **CSS3** - Custom styling with responsive design
- **Firebase** - Backend services (Firestore, Authentication)
- **TypeScript** - Type-safe backend and services

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd "Advanced React E-Commerce Web App"
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

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Open your browser**

   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 📁 Project Structure

```
Advanced React E-Commerce Web App/
├── src/
│   ├── components/
│   │   ├── Home.jsx              # Main product listing page
│   │   ├── Home.css
│   │   ├── ProductCard.jsx       # Individual product card component
│   │   ├── ProductCard.css
│   │   ├── Cart.jsx              # Shopping cart page
│   │   ├── Cart.css
│   │   ├── Navbar.jsx            # Navigation bar with cart badge
│   │   └── Navbar.css
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
│   ├── App.jsx                   # Main app component with routing
│   ├── App.css
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
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

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

To preview the production build:

```bash
npm run preview
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
