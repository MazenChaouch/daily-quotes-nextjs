import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Quote } from "@/types";
import { useState, useTransition, useEffect } from "react";
import { deleteFavorite } from "@/actions/quote";
import axios from "axios";

interface Props {
  favorites: Quote[];
  setFavorites: React.Dispatch<React.SetStateAction<Quote[]>>;
}
export const FavoriteCard = ({ favorites, setFavorites }: Props) => {
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [toggleMsg, setToggleMsg] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const handleDelete = (id: Date) => {
    setToggleMsg(false);
    startTransition(async () => {
      if (id) {
        const res = await deleteFavorite(id);
        if (res != "Invalid Id!") {
          setFavorites(res);
          console.log("fav", res);
          setMsg("Quote Deleted!");
        } else {
          setError(res);
        }
      }
    });
  };

  useEffect(() => {
    const hello = async () => {
      try {
        const res = await axios.get("/api/hello");
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    hello();
  }, []);
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>My Favorite Quotes</CardTitle>
        <p
          className={`text-teal-400 text-sm font-medium ${
            !toggleMsg && "hidden"
          }`}
        >
          {msg}
        </p>
        <p
          className={`text-red-400 text-sm font-medium ${
            error == "" && "hidden"
          }`}
        >
          {error}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {favorites.length === 0 ? (
          <p>You dont have quotes in favorite</p>
        ) : (
          favorites.map((quote) => (
            <>
              <CardDescription className="flex justify-between">
                {quote[0].a}{" "}
                <Button
                  onClick={() => handleDelete(quote[0].id!)}
                  className="size-6 p-0 rounded-full"
                  variant={"destructive"}
                  disabled={isPending}
                >
                  X
                </Button>
              </CardDescription>
              <p>{quote[0].q}</p>
              <Separator />
            </>
          ))
        )}
      </CardContent>
    </Card>
  );
};
