import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Header = () => {
    const router = useRouter()
    const [showBurgerMenu, setShowBurgerMenu] = useState<boolean>(false);
    const [currentLanguage, setCurrentLanguage] = useState('en');

  const clickBurgerIcon = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }
  const changeLanguage = (e: any) => {
    setCurrentLanguage(e.currentTarget.value)
  }

  return (
    <>
      <div className="sticky top-0 left-0 z-10 bg-black flex w-full px-6 py-4 items-center justify-between flex-3">
        <img
          onClick={() => router.push("/")}
          src="https://www.freepnglogos.com/uploads/star-wars-logo-0.png"
          className="lg:w-[200px] w-[100px] cursor-pointer"
          alt="Star Wars Logo"
        />
        <div>
        <select onChange={changeLanguage}>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
        </select>
        </div>
        <div className="hidden md:flex">
          <div className="flex lg:w-[300px]  w-[150px] justify-between">
            <Link className="text-white cursor-pointer transform hover:underline hover:text-customYellow transition duration-500 ease-in-out " href="/">Movies</Link>
            <Link className="text-white cursor-pointer transform hover:underline hover:text-customYellow transition duration-500 ease-in-out" href="/favourites">Favourite Movies</Link>
          </div>
       
        </div>
   

        <div onClick={clickBurgerIcon} className="block md:hidden">
          <span className="block bg-white w-6 h-1"/>
          <span className="block bg-white w-6 h-1 my-1"/>
          <span className="block bg-white w-6 h-1"/>
        </div>

       {showBurgerMenu && 
          <div className="absolute w-full p-2 left-0 top-20 bg-black px-6">
            <Link className="text-white block text-xl mb-2" href="/">Movies</Link>
            <Link className="text-white block text-xl"  href='/favourites'>Favourite Movies</Link>
          </div>
        }
      </div>
    </>
  );
};

export default Header;
