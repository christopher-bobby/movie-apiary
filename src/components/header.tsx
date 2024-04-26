import React, { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Header = () => {
  const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const pathname = usePathname();

  const clickBurgerIcon = () => {
    setShowBurgerMenu(!showBurgerMenu);
  };
 
  const t = useTranslations("LocaleSwitcher");

  const { locale, locales, route } = useRouter();
  const otherLocale = locales?.find((cur) => cur !== locale);
  return (
    <>
      <div className="navbar">
        <Link href="/">
          <Image
            src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
            className="movie-logo"
            width="200"
            height="100"
            alt="Movie Logo"
          />
        </Link>

        <div>
          <Link href={route} locale={otherLocale} className="locale">
            {t("switchLocale", { locale: otherLocale })}
          </Link>
        </div>

        <div className="desktop-menu">
          <Link className={`desktop-navlink ${pathname == "/" && "active"}`} href="/">Movies</Link>
          <Link className={`desktop-navlink ${pathname == "/favourites" && "active"}`} href={"/favourites"}>Favourite Movies</Link>
        </div>

        <div onClick={clickBurgerIcon} className="burger-icon">
          <span />
          <span />
          <span />
        </div>

        {showBurgerMenu && 
          <div className="mobile-menu">
            <Link className={`mobile-navlink ${pathname == "/" && "active"}`} href="/">Movies</Link>
            <Link className={`mobile-navlink ${pathname == "/favourites" && "active"}`} href='/favourites'>Favourite Movies</Link>
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
            top: 122px;
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
          .locale {
            color: #fff;
            text-decoration: none;
          }
          .desktop-navlink {
            color: rgba(255, 255, 255, 0.8);
            padding: 10px;
            text-decoration: none;
            font-size: 20px;
          }
          .desktop-navlink:after {
            content: '';
            display: block;
            margin: auto;
            height: 3px;
            width: 0;
            background: transparent;
            transition: width .3s ease, background-color .3s ease;
          }
          .desktop-navlink:hover:after{
            width: 100%;
            background: rgba(255,255,255,0.8);
          }
          .active {
            color: #fff;
          }
      `}</style>
      </div>
    </>
  );
};

export default Header;
