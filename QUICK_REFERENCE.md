# Project Quick Reference Guide

## Available npm Scripts

- `npm run dev` - Start development server (default: http://localhost:5173)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

### State Management Flow

```
User Action → Dispatch Redux Action → Reducer Updates State →
→ sessionStorage Updated → Components Re-render
```

### Data Fetching Flow

```
Component Mounts → React Query Hook → API Call →
→ Cache Data → Return to Component
```

## Key Components

### Home Component

- Fetches products and categories using React Query
- Manages category filter state
- Displays product grid
- Handles add to cart actions

### Cart Component

- Reads cart state from Redux
- Calculates totals using selectors
- Handles remove and checkout actions
- Shows success feedback

### ProductCard Component

- Displays individual product
- Handles image loading errors
- Provides add to cart button with feedback

### Navbar Component

- Navigation between pages
- Displays cart item count badge
- Responsive mobile menu

## Redux Store Structure

```javascript
{
  cart: {
    items: [
      {
        id: number,
        title: string,
        price: number,
        image: string,
        category: string,
        description: string,
        rating: { rate: number, count: number },
        count: number, // Added by cart
      },
    ];
  }
}
```

## API Endpoints

| Endpoint                        | Method | Purpose                    |
| ------------------------------- | ------ | -------------------------- |
| `/products`                     | GET    | Fetch all products         |
| `/products/categories`          | GET    | Fetch all categories       |
| `/products/category/{category}` | GET    | Fetch products by category |

## Common Tasks

### Adding a new feature to cart

1. Add action to `cartSlice.js`
2. Export action and selector if needed
3. Use in component with `useDispatch` and `useSelector`

### Adding a new API endpoint

1. Add function to `src/services/api.js`
2. Create React Query hook in component
3. Handle loading and error states

### Styling guidelines

- Use CSS modules per component (ComponentName.css)
- Follow mobile-first approach
- Use CSS variables for theming
- Support both light and dark modes

## Troubleshooting

### Images not loading

- Check for 404 errors in console
- Fallback to placeholder is automatic
- FakeStore API has known image issues

### Cart not persisting

- Check browser console for sessionStorage errors
- Verify Redux DevTools shows correct state
- Check cartSlice saveCartToStorage function

### React Query not refetching

- Check staleTime configuration in main.jsx
- Use React Query DevTools for debugging
- Verify query keys are correct

## Performance Tips

- React Query caches API responses (5min default)
- Products are only refetched when stale
- sessionStorage is synchronous (no async delays)
- Images are lazy loaded by browser

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ support
- sessionStorage API required
- CSS Grid and Flexbox support needed
