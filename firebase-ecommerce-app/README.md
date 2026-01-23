# Firebase E-commerce App

This project is a Firebase-integrated e-commerce application that allows users to manage products, place orders, and handle user authentication. The application utilizes Firestore for data management and Firebase Authentication for user management.

## Features

- User Registration and Authentication
- Product Management (Create, Read, Update, Delete)
- Order Management (Create Orders, View Order History)
- User Profile Management

## Technologies Used

- Firebase (Firestore, Authentication)
- TypeScript
- Node.js
- Express.js

## Project Structure

```
firebase-ecommerce-app
├── src
│   ├── index.ts                  # Entry point of the application
│   ├── config
│   │   └── firebase.ts           # Firebase SDK configuration
│   ├── controllers
│   │   ├── authController.ts      # Authentication logic
│   │   ├── userController.ts      # User profile management
│   │   ├── productController.ts   # Product management
│   │   └── orderController.ts     # Order management
│   ├── services
│   │   ├── authService.ts         # Authentication services
│   │   ├── userService.ts         # User services
│   │   ├── productService.ts      # Product services
│   │   └── orderService.ts        # Order services
│   ├── routes
│   │   ├── authRoutes.ts          # Authentication routes
│   │   ├── userRoutes.ts          # User routes
│   │   ├── productRoutes.ts       # Product routes
│   │   └── orderRoutes.ts         # Order routes
│   ├── middleware
│   │   └── authMiddleware.ts      # Authentication middleware
│   ├── models
│   │   ├── User.ts                # User model
│   │   ├── Product.ts             # Product model
│   │   └── Order.ts               # Order model
│   └── types
│       └── index.ts               # TypeScript interfaces and types
├── package.json                   # NPM configuration
├── tsconfig.json                  # TypeScript configuration
├── .env                            # Environment variables
├── .gitignore                      # Git ignore file
└── README.md                      # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd firebase-ecommerce-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a Firebase project in the Firebase console and configure Firestore and Authentication.

4. Add your Firebase configuration details to the `.env` file.

5. Start the application:
   ```
   npm start
   ```

## Usage

- Register a new user to access the application.
- Manage products through the product management interface.
- Place orders and view order history.

## License

This project is licensed under the MIT License.