import { listOfFilms } from "./api/hello";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import { Film } from "@/types/types";
import Image from "next/image";
import Card from "antd/es/card/Card";
import { Button } from "antd";
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import MainContainer from "@/components/main-container";
import Row from "@/components/row";
import { useLanguage } from "@/contexts/LanguageContext";
import { idLanguage } from "@/translations/id";
import { enLanguage } from "@/translations/en";

export default function Home({ filmList }: {filmList: any}) {
  const router = useRouter();
  const [displayCount, setDisplayCount] = useState(10); // fetch first 10 from client (fake pagination)
  const [favourites, setFavourites] = useState<number[]>([])
  const { language } = useLanguage();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (windowHeight + scrollTop >= documentHeight) {
      setDisplayCount((prev)=> prev + 10)
    }
  };

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
    let existingItemsJSON : string | null = '';
    if (typeof window !== 'undefined') {
      existingItemsJSON = localStorage.getItem('favourites')
    }
    const existingFavourites = existingItemsJSON?.length ? JSON.parse(existingItemsJSON) : [];
    const isFilmFavourite = doesObjectExist(film.id, existingFavourites);
    if(isFilmFavourite) {
      const idToRemove = film.id;
      const newFavourites = existingFavourites.filter((obj: Film) => obj.id !== idToRemove);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      const ids = newFavourites.map((obj: Film) => obj.id);
      setFavourites(ids);
    }
    else {
      const updatedItems = [...existingFavourites];    
      let newFave = {...film};
      updatedItems.push(newFave);
      localStorage.setItem('favourites', JSON.stringify(updatedItems));
      const ids = updatedItems.map((obj: Film) => obj.id);
      setFavourites(ids);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    let existingItemsJSON : string | null = '';
    if (typeof window !== 'undefined') {
      existingItemsJSON = localStorage.getItem('favourites')
      const existingFavourites = existingItemsJSON?.length ? JSON.parse(existingItemsJSON) : [];
      const ids = existingFavourites.map((obj: Film) => obj.id);
      setFavourites(ids);
    }
  }, []);

  if (!filmList) {
    return <div>Loading...</div>;
  }

  if (filmList.error) {
    return <div>Error: {filmList.error}</div>;
  }
  const languageObject = language === 'enLanguage' ? enLanguage : idLanguage;

  
  return (
    <MainContainer>
      <h1 className="explanation">{languageObject.explanation}</h1>
      <Row>
        {filmList.slice(0, displayCount).map((film: Film) => {
      
          return (
            <div className="card-container" key={film.id}>
              <Card
                title={`${film.id}`}
                extra={<Button onClick={()=>handleClick(film.id)}>More detail</Button>}
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
                <button onClick={(e)=> addFavourites(e, film)}>
                  {!favourites?.includes(film.id) ? (<><LikeOutlined style={{ color: 'red' }} /> <span>Like me!</span></>) : (<><DislikeOutlined /> <span>Remove me</span></>)}
                </button>
              </Card>
            </div>
          )
        })}
 
      </Row>
      <style global jsx>{`
        .explanation {
          font-size: 24px;
          margin-bottom: 20px;
        }
       
        .card-container {
          padding: 0px 16px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .card-container {
            width: 50%;
          }
        }

        @media (min-width: 992px) {
          .card-container {
            width: 25%;
          }  
        }
      `}</style>
    
    </MainContainer>
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

