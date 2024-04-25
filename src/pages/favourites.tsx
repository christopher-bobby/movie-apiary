import { useState, useEffect, SetStateAction } from 'react';
import { Film } from '@/types/types';
import Card from "antd/es/card/Card";
import Image from 'next/image';


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
          <div>
          <button onClick={(e)=> removeFromFavourites(e, film)}>Remove this element</button>
          <Card
          title={`${film.id}`}
          style={{
            width: '100%',
          }}
          key={film.id}
        >
          
          <div>{film.title}</div>
          <div>{film.rating}</div>
          <div>{film.year}</div>
          <Image  
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '300px' }}
            alt="film image"
            src={film.imageUrl}
          
          />

        </Card>
          </div>
        )
      })}

      <style jsx>{`
        button {
          font-size: 30px;
        }
      `}</style>
     </main>
  )
};

export default FavouritePage;
