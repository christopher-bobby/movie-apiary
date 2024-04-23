import { listOfFilms } from "./api/hello";
import { useRouter } from 'next/router';

export default function Home({filmList}:any) {
  const router = useRouter();


  if (!filmList) {
    return <div>Loading...</div>;
  }

  if (filmList.error) {
    return <div>Error: {filmList.error}</div>;
  }

  const handleClick = (id: string) => {
    router.push(`/details/${id}`);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      {filmList?.map((film: any) => {
          
          return (
            <div key={film.id} onClick={()=> handleClick(film.id)}>
              <div>{film.title}</div>
              <div>{film.rating}</div>
              <div>{film.year}</div>
              {/* <Image  
                width={300}
                height={300}
                alt="film image"
                src={film.imageUrl}
              
              /> */}
            </div>
           

          )
        })}
    </main>
  );
}

export async function getServerSideProps() {
  try {
    // Fetch data from an API or other source
    const filmList = await listOfFilms()

    // Return data as props
    return {
      props: {
        filmList,
      },
    };
  } catch (error: any) {
    // Return error as props
    return {
      props: {
        filmList: { error: "There is error on our end" },
      },
    };
  }
}

