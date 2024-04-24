import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useEffect } from 'react';
import Image from 'next/image';

const ModalImage = ({imageLargeUrl, closeModal} : {imageLargeUrl: string, closeModal: () => void}) => {
    console.log("imageLarge Url", imageLargeUrl);

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
      }, []); 

  return (
    <div className="fixed w-full h-full z-1000 bg-gray" onClick={closeModal}>
       <Image  
                width={500}
                height={500}
                alt="film image"
                src={imageLargeUrl}
              
              />
     </div>
  )
};

export default ModalImage;
