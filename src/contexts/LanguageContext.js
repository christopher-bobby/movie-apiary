import React, { createContext, useState, useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation'

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('enLanguage');
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(()=> {

    if (typeof window !== 'undefined') {
      let search = window.location.search
      let activeLang = search.slice(search.length - 10, search.length);
      console.log("activeLang", activeLang)
      setLanguage(activeLang);
    }
  },[])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);