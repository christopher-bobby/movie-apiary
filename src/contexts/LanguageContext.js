import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('enLanguage');
  const router = useRouter();
  const searchParams = useSearchParams()

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(()=> {
    if (typeof window !== 'undefined') {
      const search = searchParams.get('language')

      if(search === 'enLanguage' || search === 'idLanguage') {
        setLanguage(search);
        router.push(`/?language=${search}`);
      }
    }
  },[])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {console.log("all language", language)}
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);