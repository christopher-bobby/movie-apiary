import { useRouter } from 'next/router';
import { useState } from 'react';
import { getFilmDetail } from '../api/hello';
import Image from 'next/image';
import ModalImage from '@/components/modal-image';
import { FilmDetail } from '@/types/types';


const Details = ({ filmDetail }: any) => {
  const router = useRouter()
  const {desc, duration, genre,imageUrl, imageLargeUrl, rating, releaseDate, starring, title, year}: FilmDetail = filmDetail;
  const [showModal, setShowModal] = useState(false)


  return (
    <div>
         <button type="button" onClick={() => router.back()}>
      Click here to go back
    </button>

      {showModal && (<ModalImage imageLargeUrl = {imageLargeUrl} closeModal={()=> setShowModal(!showModal)} />)}


        <div>
        <p>{desc}</p>
        <p>{duration}</p>
        <p>{genre}</p>
        <p>{rating}</p>
        <p>{releaseDate}</p>
        <p>{starring.map((star: string, index: any) => {
            return <span key={star}>{star} </span>
        })}
        </p>
        <p>{title}</p>
        <p>{year}</p>
        <Image  
                width={300}
                height={300}
                alt="film image"
                src={imageUrl}
                onClick={()=>setShowModal(!showModal)}
              
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
  