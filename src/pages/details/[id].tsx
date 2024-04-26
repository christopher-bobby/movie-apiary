import { useRouter } from 'next/router';
import { useState } from 'react';
import { getFilmDetail } from '../api';
import Image from 'next/image';
import { Button } from 'antd';
import MainContainer from '@/components/main-container';
import ModalImage from '@/components/modal-image';
import { FilmDetail } from '@/types/types';


const Details = ({ filmDetail }: any) => {
  const router = useRouter()
  const {desc, duration, genre,imageUrl, imageLargeUrl, rating, releaseDate, starring, title, year}: FilmDetail = filmDetail;
  const [showModal, setShowModal] = useState(false)


  return (
    <MainContainer>
      <Button onClick={() => router.back()}>Click here to go back</Button>
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
      <style jsx>{`
        img:hover {
          cursor: pointer;
        }
     `}</style>
    </MainContainer>
  )
};

export default Details;


export async function getServerSideProps(context : any) {
  const id = context.params.id;
  const locale = context.locale;
  try {
      const filmDetail = await getFilmDetail(id)
      return {
        props: {
          id,
          filmDetail,
          messages: (await import(`../../locale/${locale}.json`)).default
        },
      };
    } catch (error) {
      return {
        props: {
          id,
          filmDetail: { error: "There is error on our end" },
          messages: (await import(`../../locale/${locale}.json`)).default
        },
      };
    }
}
