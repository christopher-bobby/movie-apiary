import Card from "antd/es/card/Card";
import Image from "next/image";
import { StarFilled } from "@ant-design/icons";
import { FilmCardType } from "../types/types";
import dynamic from "next/dynamic";

const FavButton = dynamic(() => import("./fav-button"), { ssr: false });

const FilmCard = ({
  film,
  extra,
  addFavourites,
  favourites,
  showLikeButton = true,
}: FilmCardType) => {
  return (
    <div>
      <Card
        title={film.id}
        extra={extra}
        style={{
          width: "100%",
        }}
      >
        <p className="film-title">{film.title}</p>
        <p>
          Rating:{" "}
          <span className="film-rating">
            <StarFilled style={{ color: "#FDDA0D" }} /> {film.rating}
          </span>
        </p>
        <p>
          Year Published: <span className="film-year">{film.year}</span>
        </p>
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "300px", marginTop: "10px" }}
          alt="film image"
          src={film.imageUrl}
        />
        {showLikeButton && (
          <FavButton
            isFavorite={!favourites?.find((key) => key.id === film.id)}
            onAddFavourite={addFavourites}
          />
        )}
      </Card>
      <style jsx>{`
        .film-title {
          font-weight: 600;
          font-size: 22px;
        }
        .film-rating, film-year {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default FilmCard;
