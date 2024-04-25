import React, { ChangeEvent, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
    const router = useRouter()
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
    const { changeLanguage } = useLanguage();

  const clickBurgerIcon = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }
  const handleChangeLanguage = (e: ChangeEvent<HTMLSelectElement>) => {
    changeLanguage(e.currentTarget.value);
  };
  return (
    <>
      <div className="navbar">
        <img
          onClick={() => router.push("/")}
          src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
          className="lg:w-[200px] w-[100px] cursor-pointer"
          alt="Star Wars Logo"
        />
        <div>
        <select onChange={handleChangeLanguage}>
            <option value="enLanguage">English</option>
            <option value="idLanguage">Bahasa Indonesia</option>
        </select>
        </div>
        <div className="desktop-menu">
          <div className="flex lg:w-[300px]  w-[150px] justify-between">
            <Link className="desktop-navlink" href="/">Movies</Link>
            <Link className="desktop-navlink" href="/favourites">Favourite Movies</Link>
          </div>
        </div>
   

        <div onClick={clickBurgerIcon} className="burger-icon">
          <span className="block bg-white w-6 h-1"/>
          <span className="block bg-white w-6 h-1 my-1"/>
          <span className="block bg-white w-6 h-1"/>
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

            @media (min-width: 768px) {
                .desktop-menu {
                    display: flex;
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
