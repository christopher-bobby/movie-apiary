import { MouseEventHandler } from "react";

export type Film  = {
    id: number;
    imageUrl: string;
    rating: number;
    title: string;
    year: number;
}

export type FilmDetail = {
    filmDetail: {
        desc:string;
        duration: string;
        genre: string; 
        imageUrl: string; 
        imageLargeUrl: string;
        rating: string; 
        releaseDate: string;
        starring: string[];
        title: string; 
        year: string;
        error?: string;
    },
    error?: string
}

export type FilmCardType = {
    film: Film;
    extra?: React.ReactNode;
    favourites?: Film[];
    addFavourites?: MouseEventHandler<HTMLElement> | undefined;
    showLikeButton?: boolean
}

export type InitialData = {
    filmList: Film[];
    error?: string;
}