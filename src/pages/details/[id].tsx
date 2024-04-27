import { useRouter } from 'next/router';
import { useState } from 'react';
import { getFilmDetail } from '../api';
import Image from 'next/image';
import { Button } from 'antd';
import MainContainer from '@/components/main-container';
import ModalImage from '@/components/modal-image';
import { FilmDetail } from '@/types/types';
import ErrorPage from '@/components/error-page';
import { useTranslations } from "next-intl";
import { StarFilled } from '@ant-design/icons';


const Details = ({ data }: { data : FilmDetail }) => {
  const router = useRouter()
  const {desc, duration, genre,imageUrl, imageLargeUrl, rating, releaseDate, starring, title, year} = data;
  const [showModal, setShowModal] = useState(false)
  const t = useTranslations('Index')


  if (data?.error) {
    return <MainContainer><ErrorPage /></MainContainer>;
  }

  return (
    <MainContainer>
      <Button onClick={() => router.push("/")}>Click here to go back</Button>

      <h1>{t('detail')}</h1>
      <div className="flex-desktop">
        <div className="image-container">
          <Image  
            alt="film image"
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', maxWidth: '400px', height: 'auto'}}
            onClick={()=>setShowModal(!showModal)}
          />
          <ModalImage isOpen={showModal} imageLargeUrl = {imageLargeUrl} closeModal={()=> setShowModal(!showModal)} />
        </div>

        <div className="film-details">
          <p className='film-title'>{title}</p>
          <p className='description'>{desc}</p>
          <p><span className="semibold-text">Year published:</span> <span>{year}</span></p>
          <p><span className="semibold-text">Duration:</span> {duration}</p>
          <p><span className="semibold-text">Genre:</span> {genre}</p>
          <p><span className="semibold-text">Rating:</span> <StarFilled style={{ color: "#FDDA0D" }} /> {rating}</p>
          <p><span className="semibold-text">Release date:</span> {releaseDate}</p>
          <p><span className="semibold-text">Stars:</span> {starring.map((star: string, index: number) => {
              return <span key={star}>{star}{index < starring.length - 1 && ","} </span>
          })}
          </p>
        </div>
      </div>
  

      <style jsx>{`
        .image-container {
          margin-top: 20px;
          cursor: pointer;
        }
        .film-title {
          font-size: 22px;
          font-weight: 600;
        }
        .semibold-text {
          font-weight: 600;
        }
        .film-details {
          font-size: 20px;
        }
        @media (min-width: 768px) {
          .flex-desktop {
            display: flex;
            flex-direction: row;
          }
          .image-container {
            padding-right: 30px;
            width: 50%;
          }
          .film-details {
            width: 50%;
          }
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
          data: {
            filmDetail
          },
          messages: (await import(`../../locale/${locale}.json`)).default
        },
      };
    } catch (error) {
      return {
        props: {
          id,
          data: { error: "There is error on our end" },
          messages: (await import(`../../locale/${locale}.json`)).default
        },
      };
    }
}
