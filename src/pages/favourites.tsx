import { useState, useEffect, SetStateAction } from 'react';
import { Film } from '@/types/types';
import Row from '@/components/row';
import MainContainer from '@/components/main-container';
import FilmCard from '../components/film-card';
import Card from "antd/es/card/Card";
import Image from 'next/image';
import { Empty } from "antd";
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
    return (
      <div className="empty-placeholder">
        <Empty 
          imageStyle={{ height: 300 }}
          description={
            <span className="empty-placeholder-text">
              No favourite movies? Add one!
            </span>
          } 
        />
        <style jsx>{`
          .empty-placeholder {
            margin-top: 40px;
          }
          .empty-placeholder-text {
            font-size: 26px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <MainContainer>
      <Row>
        {favouritesLocalStorage?.map((film: Film) => {
          return (
            <div className="card-container" key={film.id}>
              <FilmCard 
                film={film}
                extra={<Button type="primary" danger onClick={(e)=> removeFromFavourites(e, film)}>Remove</Button>}
                showLikeButton={false}
              />
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