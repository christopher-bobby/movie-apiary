import { listOfFilms } from "./api/hello";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Film } from "@/types/types";
import Image from "next/image";
import Card from "antd/es/card/Card";
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';


export default function Home({ filmList }: {filmList: any}) {
  const router = useRouter();
  const [displayCount, setDisplayCount] = useState(10); // fetch first 10 from client (fake pagination)

  if (!filmList) {
    return <div>Loading...</div>;
  }

  if (filmList.error) {
    return <div>Error: {filmList.error}</div>;
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (windowHeight + scrollTop >= documentHeight) {
      setDisplayCount((prev)=> prev + 10)
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleClick = (id: number) => {
    router.push(`/details/${id}`);
  };

   const doesObjectExist = (id: number, arr: any) => {
      if(!id) {
        return null
      }
      return arr.some((obj: Film) => obj.id === id);
  }

  const addFavourites = async(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>, film: Film) => {
      ev.stopPropagation();
      let existingItemsJSON : any = [];
      if (typeof window !== 'undefined') {
        existingItemsJSON = localStorage.getItem('favourites') || []
      }
      const existingFavourites = existingItemsJSON.length ? JSON.parse(existingItemsJSON) : [];
      const isFilmFavourite = doesObjectExist(film.id, existingFavourites);
      if(isFilmFavourite) {
        const idToRemove = film.id;
        const newFavourites = existingFavourites.filter((obj: Film) => obj.id !== idToRemove);
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
      {filmList?.slice(0, displayCount).map((film: Film) => {
          return (
            <Card
              title={`${film.id}`}
              extra={<button onClick={()=>handleClick(film.id)}>More detail</button>}
              style={{
                width: 300,
              }}
            >
              
              <div>{film.title}</div>
              <div>{film.rating}</div>
              <div>{film.year}</div>
              <Image  
                width={300}
                height={300}
                alt="film image"
                src={film.imageUrl}
              
              />
              <button onClick={(e)=> addFavourites(e, film)}><LikeOutlined style={{ color: 'red' }} /></button>
            </Card>
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

