import { useRouter } from 'next/router';
import { getFilmDetail } from '../api/hello';
import Image from 'next/image';

const Details = ({ filmDetail }: any) => {
    const router = useRouter()

    const {desc, duration, genre,imageUrl, imageLargeUrl, rating, releaseDate, starring, title, year} = filmDetail;



  return (
    <div>
         <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>




        <div>
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
        <Image  
                width={300}
                height={300}
                alt="film image"
                src={imageUrl}
              
              />
        </div>

     </div>)

};

export default Details;


export async function getServerSideProps(context: any) {
    const id = context.params.id; // Access the ID from params
    try {
        // Fetch data using the ID from an API or other source
        // For example:
        const filmDetail = await getFilmDetail(id)
      
        // Return both ID and data as props
        return {
          props: {
            id,
            filmDetail,
          },
        };
      } catch (error) {
        // Return error message as props
        return {
          props: {
            id,
            filmDetail: { error: "There is error on our end" },
          },
        };
      }
  }
  