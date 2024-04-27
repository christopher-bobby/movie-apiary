import { useEffect } from 'react';
import Image from 'next/image';

const ModalImage = ({isOpen, imageLargeUrl, closeModal} : {isOpen: boolean,imageLargeUrl: string, closeModal: () => void}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { // exit the modal if user presses escape
      if (event.key === 'Escape') {
        closeModal()
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]); 

  useEffect(() => { // lock body if modal is open
    const body = document.body;
    const originalOverflow = body.style.overflow;

    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = originalOverflow;
    }

    return () => {
      body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
  
  if(!isOpen) {
    return null
  }
  
  return (
    <div onClick={closeModal}>
      <Image  
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%',maxWidth: '600px', height: 'auto'}}
        alt="film image large"
        src={imageLargeUrl}        
      />      
      
      <style jsx>{`
        div { 
          position: fixed;
          overflow: auto;
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
