import { useState, useEffect, SetStateAction } from 'react';
import { Film } from '@/types/types';
import Card from "antd/es/card/Card";
import Image from 'next/image';
import { Button } from 'antd';

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



  const removeFromFavourites = async(ev: React.MouseEvent<HTMLElement, MouseEvent>, film: Film) => {
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
    <div className="main-page-container">
      {favouritesLocalStorage?.map((film: Film) => {
        return (
          <div className="card-container" key={film.id}>
        
          <Card
          title={`${film.id}`}
          extra={  <Button type="primary" danger onClick={(e)=> removeFromFavourites(e, film)}>
          Remove
        </Button>}
          style={{
            width: '100%',
          }}
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

.main-page-container {
  padding: 0 24px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.card-container {
  padding: 0px 16px;
  margin-bottom: 24px;
}
@media (min-width: 768px) {
  .card-container {
    width: 50%;
  }
  .main-page-container {
    flex-direction: row;
    flex-wrap: wrap;
  }  
}

@media (min-width: 992px) {
  .card-container {
    width: 25%;
  }  
}
`}</style>
     </div>
  )
};

export default FavouritePage;
