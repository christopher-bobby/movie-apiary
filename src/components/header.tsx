import React, { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { idLanguage } from "@/translations/id";
import { enLanguage } from "@/translations/en";


const Header = () => {
    const router = useRouter();
    console.log("all router", router)
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
    const { language, changeLanguage } = useLanguage();

  const clickBurgerIcon = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }
  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.currentTarget.value);
    router.push(`/?language=${e.currentTarget.value}`)
  };

  const languageObject = language === 'idLanguage' ? idLanguage : enLanguage;


  return (
    <>
      <div className="navbar">
        <Link href="/">
        <Image
          src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
          className="movie-logo"
          width="150"
          height="250"
          alt="Movie Logo"
        />
        </Link>
       
        <div>
        <select onChange={handleChangeLanguage}>
            <option value="enLanguage">English</option>
            <option value="idLanguage" selected={language === 'idLanguage'}>Bahasa Indonesia</option>
        </select>
        </div>
        <div className="desktop-menu">
          <Link className="desktop-navlink" href={`/?language=${language}`}>{languageObject.movies}</Link>
          <Link className="desktop-navlink" href={`/favourites?language=${language}`}>{languageObject.favourites}</Link>
        </div>
   

        <div onClick={clickBurgerIcon} className="burger-icon">
          <span />
          <span />
          <span />
        </div>

       {showBurgerMenu && 
          <div className="mobile-menu">
            <Link className="mobile-navlink" href="/">Movies</Link>
            <Link className="mobile-navlink"  href='/favourites'>Favourite Movies</Link>
          </div>
        }

        <style jsx>{`
            .navbar {
                position: sticky;
                top: 0;
                left: 0;
                z-index: 6;
                background: rgba(0,0,0,0.9);
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 16px 24px;
            }
            .movie-logo:hover {
              cursor: pointer;
            }
            .mobile-menu { 
                position: absolute;
                left: 0px;
                top: 92px;
                width: 100%;
                padding: 8px 6px;
                background: #333;
            }
            .mobile-navlink {
                color: #fff;
                display: block;
                font-size: 22px;
                padding: 12px 0px;
            }
            .desktop-menu {
                display: none;
            }
            .burger-icon span {
              width: 32px;
              height: 4px;
              display: block;
              background: #fff;
            }
            .burger-icon span:nth-child(2) {
              margin: 4px 0px;
            }
            @media (min-width: 768px) {
                .desktop-menu {
                  display: flex;
                  width: 500px;
                }
                .mobile-navlink {
                    display: none;
                }            
                .burger-icon {
                    display: none;
                }
            }
        
        `}</style>
        <style global jsx>{`
            .mobile-navlink {
                color: #fff;
                display: block;
                font-size: 18px;
                padding: 8px 0px;
            }
            .desktop-navlink {
                color: #fff;
                padding: 10px;
            }
            .desktop-navlink:after {
                content: '';
                display: block;
                margin: auto;
                height: 3px;
                width: 0px;
                background: transparent;
                transition: width .3s ease, background-color .3s ease;
            }
            .desktop-navlink:hover:after {
                width: 100%;
                background: rgba(255,255,255,0.8);
            }
      `}</style>
      </div>
    </>
  );
};

export default Header;
