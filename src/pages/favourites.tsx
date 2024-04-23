import { useRouter } from 'next/router';
import { getFilmDetail } from '../api/hello';

const FavouritePage = ({ filmDetail }: any) => {
    const router = useRouter()

    const {desc, duration, genre, imageLargeUrl, rating, releaseDate, starring, title, year} = filmDetail
  return (
    <div>
         <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>
    <button>Like this element</button>
        <p>{desc}</p>
        <p>{duration}</p>
        <p>{genre}</p>
        <p>{rating}</p>
        <p>{releaseDate}</p>
        <p>{starring.map((star: string, index: any) => {
            return <span>{star} </span>
        })}
        </p>
        <p>{title}</p>
        <p>{year}</p>

     </div>)

};

export default FavouritePage;


export async function getServerSideProps(context: any) {

  }
  