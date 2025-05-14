# Daily Quotes Dashboard Plan

## Problem Statement

Build a "Daily Quotes Dashboard" using Next.js (App Router) to display a daily random quote, save favorites, and view them in a dashboard. Use TypeScript, Tailwind CSS, Next.js App Router, server actions for data handling, and subtle layout changes for interactivity.

## Tasks

1. **Initialize Project**:

   - Create Next.js app with TypeScript, Tailwind CSS, and App Router.
   - Set up folders: `app/`, `components/`, `actions/`.

2. **Homepage Layout**:

   - Build `/` page (App Router: `app/page.tsx`) with a quote card (quote, author).
   - Add "Favorite" and "New Quote" buttons.
   - Create nav bar with links to `/` and `/favorites`.
   - Use Tailwind CSS for responsive design.
   - Add fade-in animation on quote load.

3. **Routing**:

   - Set up App Router routes: `app/page.tsx` for homepage, `app/favorites/page.tsx` for favorites.
   - Use `next/link` for navigation.

4. **Quote Fetching**:

   - Create server action in `actions/quote.ts` to fetch random quote from `https://api.quotable.io/random`.
   - Render quote and author in card on `/` using server component.

5. **Server Actions**:

   - Create server action `saveFavorite` in `actions/quote.ts` to save quote to in-memory array.
   - Create server action `getFavorites` to retrieve all saved quotes.
   - Create server action `deleteFavorite` to remove a quote by ID.

6. **Favorites Page**:

   - Build `/favorites` page (`app/favorites/page.tsx`) to show saved quotes in a list.
   - Add "Delete" button per quote.
   - Use server action `getFavorites` to fetch quotes in server component.

7. **Client-Side Interactivity**:

   - Fetch new quote on "New Quote" click using client-side `fetch` to server action.
   - Change card border color when favorited (Tailwind CSS).
   - Use `useEffect` and `useTransition` for quote refresh animation.

8. **Testing**:

   - Test quote fetch on load and refresh.
   - Verify favorite/save/delete functionality.
   - Check responsive design on mobile/desktop.
   - Ensure routing works without errors.