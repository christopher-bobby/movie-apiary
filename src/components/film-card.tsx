import Card from "antd/es/card/Card";
import Image from "next/image";
import { Button } from "antd";
import { DislikeOutlined, LikeOutlined, StarFilled } from '@ant-design/icons';

const FilmCard = ({film, extra, addFavourites, favourites, showLikeButton = true}: any) => {
    console.log("all things",  favourites)
    return (
        <div className="card-container" key={film.id}>
            <Card
                title={`${film.id}`}
                extra={extra}
                style={{
                    width: '100%',
                }}
            >
            
            <div className="film-title">{film.title}</div>
            <div>Rating: <span className="film-rating"><StarFilled style={{ color: "#FDDA0D" }}/> {film.rating}</span></div>
            <div>Year Published: <span className="film-year">{film.year}</span></div>
            <Image  
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: '300px', marginTop: '10px' }}
                alt="film image"
                src={film.imageUrl}
            />
            {showLikeButton && (<Button onClick={addFavourites}>
                {!favourites?.includes(film.id) ? (<><LikeOutlined style={{ color: '#1F51FF'}} /> <span>Like me!</span></>) : (<><DislikeOutlined style={{ color: 'red' }}/> <span>Remove me</span></>)}
            </Button>)}
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
    )
  };
  
  export default FilmCard;
  