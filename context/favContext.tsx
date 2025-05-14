"use client"; // Required in Next.js App Router if used in client components

import { Quote } from "@/types";
import { createContext, useState, useContext, ReactNode } from "react";

// Define context type
type FavContextType = {
  favorites: Quote[];
  setFavorites: React.Dispatch<React.SetStateAction<Quote[]>>;
};

// Create context with default undefined
const FavContext = createContext<FavContextType | undefined>(undefined);

// Provider component
export const FavProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Quote[]>([]);

  return (
    <FavContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavContext.Provider>
  );
};

// Custom hook to use context
export const useFavContext = () => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFavContext must be used within FavProvider");
  }
  return context;
};
