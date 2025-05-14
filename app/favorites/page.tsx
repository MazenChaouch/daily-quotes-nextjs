"use client";
import { FavoriteCard } from "@/components/FavoriteCard";
import { useFavContext } from "@/context/favContext";

const Favorites = () => {
  const { favorites, setFavorites } = useFavContext();
  return (
    <div className="h-screen flex justify-center items-center bg-teal-200 gap-24">
      <FavoriteCard favorites={favorites} setFavorites={setFavorites} />
    </div>
  );
};

export default Favorites;
