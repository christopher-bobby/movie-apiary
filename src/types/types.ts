export type Film  = {
    id: number;
    imageUrl: string;
    rating: number;
    title: string;
    year: number;
}

export type FilmDetail = {
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
}