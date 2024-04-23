import { useState, useEffect } from 'react';

const FavouritePage = () => {
  console.log("pantek")
  let currentFavourites : any = [];
  if (typeof window !== 'undefined') {
    const existingFavourites = localStorage.getItem('favourites');
    currentFavourites = JSON.parse(existingFavourites || '') || []
  }

  const [favouritesLocalStorage, setFavouritesLocalStorage] = useState([]);
  
  
  useEffect(()=> {
    setFavouritesLocalStorage(currentFavourites)
  },[])



  const removeFromFavourites = async(ev: any, film: any) => {
    ev.stopPropagation();
    const idToRemove = film.id;
    const newFavourites = favouritesLocalStorage.filter(obj => obj.id !== idToRemove);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));  

    setFavouritesLocalStorage(newFavourites)
  }

  if(!favouritesLocalStorage.length) {
    return <div>Empty</div>
  }
  return (
    <main>
      {favouritesLocalStorage?.map((film: any, index: any) => {
        return (
          <div>
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
