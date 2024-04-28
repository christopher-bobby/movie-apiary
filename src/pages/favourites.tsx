import { Film } from '@/types/types';
import MainContainer from '@/components/main-container';
import Row from '@/components/row';
import FilmCard from '../components/film-card';
import { Empty } from "antd";
import { GetServerSidePropsContext } from "next";
import { Button } from 'antd';
import useLocalStorage from '@/hook/useLocalStorage';

const FavouritePage = () => {

  const [favourites, setFavourites] = useLocalStorage<Film[]>('favourites', [])

  const removeFromFavourites = async(ev: React.MouseEvent<HTMLElement, MouseEvent>, film: Film) => {
    ev.stopPropagation();
    const idToRemove = film.id;
    const newFavourites = favourites?.filter((obj: Film) => obj.id !== idToRemove);
    setFavourites(newFavourites)
  }

  if(!favourites?.length) {
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
            margin-bottom: 100px;
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
        {favourites?.map((film: Film) => {
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
            width: calc(50% - 32px);
          }
        }

        @media (min-width: 992px) {
          .card-container {
            width: calc(25% - 32px);
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