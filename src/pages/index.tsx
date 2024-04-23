import { listOfFilms } from "./api/hello";
import { useRouter } from 'next/router';
import { useState } from "react";


export default function Home({filmList}:any) {
  const router = useRouter();

 

  if (!filmList) {
    return <div>Loading...</div>;
  }

  if (filmList.error) {
    return <div>Error: {filmList.error}</div>;
  }

  const handleClick = (id: string) => {
    router.push(`/details/${id}`);
  };



   const doesObjectExist = (id: any, arr: any) => {
      if(!id) {
        return null
      }
      return arr.some(obj => obj.id === id);
  }

  const addFavourites = async(ev: any, film: any) => {
      ev.stopPropagation();
      let existingItemsJSON : any = [];
      if (typeof window !== 'undefined') {
        existingItemsJSON = localStorage.getItem('favourites') || []
      }
      const existingFavourites = existingItemsJSON.length ? JSON.parse(existingItemsJSON) : [];
      const isFilmFavourite = doesObjectExist(film.id, existingFavourites);
      if(isFilmFavourite) {
        const idToRemove = film.id;
        const newFavourites = existingFavourites.filter(obj => obj.id !== idToRemove);
        localStorage.setItem('favourites', JSON.stringify(newFavourites));
      }
      else {
        const updatedItems = [...existingFavourites];    
        let newFave = {...film};
        updatedItems.push(newFave);
        localStorage.setItem('favourites', JSON.stringify(updatedItems));
      }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      {filmList?.map((film: any) => {
          console.log("filmlist", film)
          return (
            <div key={film.id} onClick={()=> handleClick(film.id)}>
                  <button onClick={(e)=> addFavourites(e, film)}>Like this element</button>

              <div>{film.title}</div>
              <div>{film.rating}</div>
              <div>{film.year}</div>
              {/* <Image  
                width={300}
                height={300}
                alt="film image"
                src={film.imageUrl}
              
              /> */}
            </div>
           

          )
        })}
    </main>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from an API or other source
    const filmList = await listOfFilms()

    // Return data as props
    return {
      props: {
        filmList,
      },
    };
  } catch (error: any) {
    // Return error as props
    return {
      props: {
        filmList: { error: "There is error on our end" },
      },
    };
  }
}

