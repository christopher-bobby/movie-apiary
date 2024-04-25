import { useEffect } from 'react';
import Image from 'next/image';

const ModalImage = ({imageLargeUrl, closeModal} : {imageLargeUrl: string, closeModal: () => void}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]); 

  return (
    <div onClick={closeModal}>
      <Image  
        width={500}
        height={500}
        alt="film image"
        src={imageLargeUrl}        
      />      
      
      <style jsx>{`
        div { 
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 10;
          background-color: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
        }
      
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
     
    </div>
  )
};

export default ModalImage;
