"use server";

import { Quote } from "@/types";
import axios from "axios";

const favorites: Quote[] = [];

export const getQuote = async () => {
  const url = "https://zenquotes.io/api/random";
  try {
    const response = await axios.get<Quote>(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const saveFavorite = async (quote: Quote) => {
  try {
    if (quote) {
      favorites.push([{ id: new Date(), a: quote[0].a, q: quote[0].q }]);
    }
    return favorites;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteFavorite = async (id: Date) => {
  const index = favorites.findIndex(
    (quote) => quote[0].id?.getTime() == id?.getTime(),
  );
  if (index > -1) {
    favorites.splice(index, 1);
    return favorites;
  } else {
    return "Invalid Id!";
  }
};
