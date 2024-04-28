import { useState } from 'react';
import { getFilmDetail } from '../api';
import Image from 'next/image';
import Link from "next/link";
import MainContainer from '@/components/main-container';
import ModalImage from '@/components/modal-image';
import ErrorPage from '@/components/error-page';
import { FilmDetail } from '@/types/types';
import { useTranslations } from "next-intl";
import { StarFilled } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';

const Details = ({ data }: { data : FilmDetail }) => {
  const {desc, duration, genre,imageUrl, imageLargeUrl, rating, releaseDate, starring, title, year} = data.filmDetail;
  const [showModal, setShowModal] = useState(false)
  const t = useTranslations('Index')


  if (data?.error) {
    return <MainContainer><ErrorPage /></MainContainer>;
  }

  return (
    <MainContainer>
      <Link href={"/"} className="go-back">Click here to go back</Link>

      <h1>{t('detail')}</h1>
      <div className="flex-desktop">
        <div className="image-container">
          <Image  
            alt="film image"
            src={imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%',maxWidth: '400px', height: 'auto'}}
            onClick={()=>setShowModal(!showModal)}
          />
          <ModalImage isOpen={showModal} imageLargeUrl = {imageLargeUrl} closeModal={()=> setShowModal(!showModal)} />
        </div>

        <div className="film-details">
          <p className='film-title'>{title}</p>
          <p className='description'>{desc}</p>
          <div className="labels">Year published: <span>{year}</span></div>
          <div className="labels">Duration: <span>{duration}</span></div>
          <div className="labels">Genre: <span>{genre}</span></div>
          <div className="labels">Rating: <StarFilled style={{ color: "#FDDA0D" }} /> <span>{rating}</span></div>
          <div className="labels">Release date: <span>{releaseDate}</span></div>
          <div className="labels">Top cast:</div>
          <div className="starring">{starring.map((star: string) => {
              return <span key={star} style={{marginRight: '10px'}}> <UserOutlined style={{ color: "#A9A9A9" , padding: '6px', border: '1px solid #A9A9A9', borderRadius: '20px', marginRight: '6px', marginTop: '10px' }} />{star}</span>
          })}
          </div>
        </div>
      </div>
  

      <style global jsx>{`
        .go-back {
          color: #5799ef;
          font-size: 20px;
          text-decoration: none;
          padding-bottom: 4px;
        }
        .go-back:hover {
          border-bottom: 1px solid #5799ef;
        }
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
        .labels {
          margin-bottom: 30px;
          font-size: 28px;
          font-weight: 600;
          border-left: 4px solid #f5c518;
          padding-left: 10px;
          text-transform: capitalize;
        }
        .labels span {
          font-weight: 400;
          font-size: 22px;
        }
        .starring {
          text-transform: capitalize;
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
