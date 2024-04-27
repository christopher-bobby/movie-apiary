import { GetServerSidePropsContext } from "next";
import { listOfFilms } from "./api";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Film } from "@/types/types";
import FilmCard from "../components/film-card";
import ErrorPage from "@/components/error-page";
import MainContainer from "@/components/main-container";
import { Button } from "antd";
import Row from "@/components/row";
import { InitialData } from "@/types/types";
import { useTranslations } from "next-intl";
import useLocalStorage from "@/hook/useLocalStorage";

export default function Home({ data } : { data: InitialData }) {
  const router = useRouter();
  const [displayCount, setDisplayCount] = useState(10); // fetch first 10 from client (fake pagination)
  const [favourites, setFavourites] = useLocalStorage<any[]>("favourites", []);
  const t = useTranslations("Index");

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if ((windowHeight + 300) + scrollTop >= documentHeight) {
      setDisplayCount((prev) => prev + 10);
    }
  };

  const handlMoreDetailClick = (id: number) => {
    router.push(`/details/${id}`);
  };

  const doesObjectExist = (id: number, arr: any) => {
    if (!id) {
      return null;
    }
    return arr.some((obj: Film) => obj.id === id);
  };

  const addFavourites = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    film: Film
  ) => {
    ev.stopPropagation();
  
    const isFilmFavourite = doesObjectExist(film.id, favourites);
    if (isFilmFavourite) {
      const idToRemove = film.id;
      const newFavourites = favourites?.filter(
        (obj: Film) => obj.id !== idToRemove
      );
   
      setFavourites(newFavourites);
    } else {
      const updatedItems = [...(favourites || []), film];
      setFavourites(updatedItems)
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (data?.error) {
    return <MainContainer><ErrorPage /></MainContainer>;
  }

  return (
    <MainContainer>
      <h1>{t("title")}</h1>
      <Row>
        {data?.filmList.slice(0, displayCount).map((film: Film) => {
          return (
            <div className="card-container" key={film.id}>
              <FilmCard
                film={film}
                extra={
                  <Button onClick={() => handlMoreDetailClick(film.id)}>
                    More detail
                  </Button>
                }
                addFavourites={(
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => addFavourites(e, film)}
                favourites={favourites}
              />
            </div>
          );
        })}
        <style jsx>{`
          h1 {
            font-size: 16px;
            margin-top: 30px;
          }

          .card-container {
            margin: 0px 16px;
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
      </Row>
    </MainContainer>
  );
}

export async function getServerSideProps({
  locale,
}: GetServerSidePropsContext) {
  try {
    const filmList = await listOfFilms();

    return {
      props: {
        data: {
          filmList
        },
        messages: (await import(`../locale/${locale}.json`)).default,
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: { error: "There is error on our end" },        
        messages: (await import(`../locale/${locale}.json`)).default,
      },
    };
  }
}
