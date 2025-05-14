"use client";
import { getQuote, saveFavorite } from "@/actions/quote";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFavContext } from "@/context/favContext";
import { Quote } from "@/types";
import { useEffect, useState, useTransition } from "react";

const HomePage = () => {
  const { setFavorites } = useFavContext();
  const [isPending, startTransition] = useTransition();
  const [quote, setQuote] = useState<Quote>();
  const [msg, setMsg] = useState<string>("");
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

  return (
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
    </div>
  );
};

export default HomePage;
