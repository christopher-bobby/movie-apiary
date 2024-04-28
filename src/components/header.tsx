import React, { useState } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
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
  const setCookie = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; max-age=31536000; path=/`;
  };

  const { locale, asPath } = useRouter();
  const otherLocale = ["id", "en"].find((cur) => cur !== locale);
  return (
    <div className="navbar">
      <div className="container">
        <Link href="/">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "70px", marginTop: "10px" }}
            alt="Movie Logo"
            src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
          />
        </Link>

        {otherLocale && (
          <div>
            <Link
              href={asPath}
              locale={otherLocale}
              className="locale"
              onClick={() => setCookie(otherLocale)}
            >
              {t("switchLocale", { locale: otherLocale })}
            </Link>
          </div>
        )}

        <div className="desktop-menu">
          <Link
            className={`desktop-navlink ${pathname == "/" && "active"}`}
            href="/"
          >
            Movies
          </Link>
          <Link
            className={`desktop-navlink ${
              pathname == "/favourites" && "active"
            }`}
            href={"/favourites"}
          >
            Favourite Movies
          </Link>
        </div>

        <div onClick={clickBurgerIcon} className="burger-icon">
          <span />
          <span />
          <span />
        </div>

        {showBurgerMenu && (
          <div className="mobile-menu">
            <Link
              className={`mobile-navlink ${pathname == "/" && "active"}`}
              href="/"
            >
              Movies
            </Link>
            <Link
              className={`mobile-navlink ${
                pathname == "/favourites" && "active"
              }`}
              href="/favourites"
            >
              Favourite Movies
            </Link>
          </div>
        )}
      </div>
      <style global jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          z-index: 6;
          background: rgba(0, 0, 0, 0.9);
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          max-width: 1400px;
          margin: auto;
        }
      
        .movie-logo:hover {
          cursor: pointer;
        }
        .mobile-menu {
          position: absolute;
          left: 0px;
          top: 116px;
          width: calc(100% - 24px);
          padding: 8px 12px;
          background: #333;
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
        .mobile-navlink {
          color: #fff;
          display: block;
          font-size: 18px;
          padding: 8px 0px;
          text-decoration: none;
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
          content: "";
          display: block;
          margin: auto;
          height: 3px;
          width: 0;
          background: transparent;
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        .desktop-navlink:hover:after {
          width: 100%;
          background: rgba(255, 255, 255, 0.8);
        }
        .active {
          color: #fff;
        }
        @media (min-width: 768px) {
          .desktop-menu {
            display: flex;
            width: 500px;
            justify-content: right;
          }
          .mobile-navlink {
            display: none;
          }
          .burger-icon {
            display: none;
          }
        }
      `}</style>
  </div>
  );
};

export default Header;
