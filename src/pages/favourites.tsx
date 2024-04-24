import { useState, useEffect, SetStateAction } from 'react';
import { Film } from '@/types/types';

const FavouritePage = () => {
  let currentFavourites : SetStateAction<never[]> = [];
  if (typeof window !== 'undefined') {
    const existingFavourites = localStorage.getItem('favourites');
    currentFavourites = JSON.parse(existingFavourites || '') || []
  }

  const [favouritesLocalStorage, setFavouritesLocalStorage] = useState([]);
  
  
  useEffect(()=> {
    setFavouritesLocalStorage(currentFavourites)
  },[])



  const removeFromFavourites = async(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, film: Film) => {
    ev.stopPropagation();
    const idToRemove = film.id;
    const newFavourites = favouritesLocalStorage.filter((obj: Film) => obj.id !== idToRemove);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));  

    setFavouritesLocalStorage(newFavourites)
  }

  if(!favouritesLocalStorage.length) {
    return <div>Empty</div>
  }
  return (
    <main>
      {favouritesLocalStorage?.map((film: Film) => {
        return (
          <div key={film.id}>
            ahahha
            <button onClick={(e)=> removeFromFavourites(e, film)}>Remove this element</button>
            <p>{film.title}</p>
            <p>{film.rating}</p>
            <p>{film.year}</p>
          </div>
        )
      })}
     </main>
  )
};

export default FavouritePage;
