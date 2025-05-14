"use client";
import { deleteFavorite, getQuote, saveFavorite } from "@/actions/quote";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Quote } from "@/types";
import { useEffect, useState, useTransition } from "react";

const HomePage = () => {
  const [isPending, startTransition] = useTransition();
  const [quote, setQuote] = useState<Quote>();
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [msg, setMsg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [toggleMsg, setToggleMsg] = useState<boolean>(false);

  useEffect(() => {
    startTransition(async () => {
      const res = await getQuote();
      if (res)
        setQuote([
          {
            a: res[0].a,
            q: res[0].q,
          },
        ]);
    });
  }, []);
  const handleNewQuote = () => {
    setToggleMsg(false);
    startTransition(async () => {
      const res = await getQuote();
      if (res) setQuote([{ a: res[0].a, q: res[0].q }]);
    });
  };
  const handleFavorite = () => {
    startTransition(async () => {
      if (quote) {
        const res = await saveFavorite(quote);
        console.log("fav", res);
        if (res) {
          setToggleMsg(true);
          setMsg("Quote Saved!");
          setFavorites(res);
        }
      }
    });
  };
  const handleDelete = (id: Date) => {
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
  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center bg-teal-200 gap-24">
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>Today&apos;s Quote</CardTitle>
            <CardDescription>
              {isPending && !quote ? "Auther" : quote?.[0]?.a}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{isPending && !quote ? "Content" : quote?.[0].q}</p>
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
          </CardContent>
          <CardFooter className="gap-2">
            <Button onClick={handleNewQuote} disabled={isPending}>
              New Quote
            </Button>
            <Button
              onClick={handleFavorite}
              disabled={isPending}
              className="bg-teal-500 text-white hover:bg-teal-400 "
            >
              Favorite
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-[600px]">
          <CardHeader>
            <CardTitle>My Favorite Quotes</CardTitle>
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
      </div>
    </>
  );
};

export default HomePage;
