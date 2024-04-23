// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};
export const listOfFilms = async () => {
  let result = await fetch('https://private-2fff44-bncfetest.apiary-mock.com/movies');
  const { data } = await result.json();
  return data
};

export const getFilmDetail = async(movieId: string | undefined | string[]) => {
  let result = await fetch(`https://private-2fff44-bncfetest.apiary-mock.com/movies/${movieId}`);
  const { data } = await result.json();
  return data
}