import { useState, useEffect, SetStateAction } from 'react';
import { Film } from '@/types/types';
import Row from '@/components/row';
import MainContainer from '@/components/main-container';
import Card from "antd/es/card/Card";
import Image from 'next/image';
import { GetServerSidePropsContext } from "next";

import { Button } from 'antd';

const FavouritePage = () => {
  let currentFavourites : SetStateAction<never[]> = [];
  if (typeof window !== 'undefined') {
    const existingFavourites = localStorage?.getItem('favourites');
    if(existingFavourites) {
      currentFavourites = (JSON?.parse(existingFavourites || '')) || []
    }
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
    <MainContainer>
      <Row>
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
      </Row>

      <style jsx>{`
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
  )
};

export default FavouritePage;
export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  try {
  
    return {
      props: {
        messages: (await import(`../locale/${locale}.json`)).default
      },
    };
  } catch (error: any) {
    // Return error as props
    return {
      props: {
        messages: (await import(`../locale/${locale}.json`)).default
      },
    };
  }
}