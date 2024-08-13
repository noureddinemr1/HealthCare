/* eslint-disable no-unused-vars */
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { useState } from 'react';

export default function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthUser(null);
    navigate('/login');
  };
  

  const handleEditProfile = () => {
    navigate('/editez-profile');
  };

  return (
    <>
      <nav className="bg-white w-full px-8 md:px-auto">
        <br />
        <div className="container mx-auto flex items-center justify-between flex-wrap md:flex-nowrap">
          <div className="flex items-center text-black-500 text-bold">
            <Link to="/">
            
            <svg
              className="inline-flex items-center w-10 text-deep-purple-accent-400 fill-teal-400"
              viewBox="-5 1 30 30"
            >
                        <path d="M14,2H10A3,3,0,0,0,7,5V6H5A3,3,0,0,0,2,9V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9a3,3,0,0,0-3-3H17V5A3,3,0,0,0,14,2ZM9,5a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6H9ZM20,9V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H19A1,1,0,0,1,20,9Zm-7,4h2v2H13v2H11V15H9V13h2V11h2Z"/>

            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-teal-400 uppercase">
              HealthCare
            </span>
          
            </Link>
          </div>
          <div className="block lg:hidden">
            <button
              className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-400 hover:text-gray-800 hover:border-gray-800"
              onClick={() => document.getElementById('menu').classList.toggle('hidden')}
            >
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="hidden w-full lg:flex lg:items-center lg:w-auto" id="menu">
            <ul className="flex flex-col lg:flex-row text-gray-500 font-semibold justify-between w-full lg:w-auto">
              <li className="md:px-4 md:py-2 hover:text-teal-400"><Link to="/">Accueil</Link></li>
              <li className="md:px-4 md:py-2 hover:text-teal-400"><Link to="/medecins">Médecins</Link></li>
              <li className="md:px-4 md:py-2 hover:text-teal-400"><Link to="/apropos">A propos</Link></li>
              <li className="md:px-4 md:py-2 hover:text-teal-400"><Link to="/contact">Contact</Link></li>
              {authUser ? <li className="md:px-4 md:py-2 hover:text-teal-400"><Link to="/rendez-vous"> Mes Rendez-vous</Link></li>: null}
              
            </ul>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-400 hover:bg-teal-500 text-gray-50 rounded-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 12a4 4 0 100-8 4 4 0 000 8zm-2 1a7 7 0 0114 0v2H8v-2a7 7 0 010-7z" clipRule="evenodd" />
              </svg>
              <span>{authUser?.user.username}</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <button
                  onClick={handleEditProfile}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-teal-500 hover:text-white"
                >
                  Editez Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-teal-500 hover:text-white"
                >
                  Se déconnecter
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
      <footer className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <a
            href="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <svg
              className="w-10 text-deep-purple-accent-400 fill-teal-400"
              viewBox="-5 -2 30 30"
            >
                        <path d="M14,2H10A3,3,0,0,0,7,5V6H5A3,3,0,0,0,2,9V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V9a3,3,0,0,0-3-3H17V5A3,3,0,0,0,14,2ZM9,5a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1V6H9ZM20,9V19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9A1,1,0,0,1,5,8H19A1,1,0,0,1,20,9Zm-7,4h2v2H13v2H11V15H9V13h2V11h2Z"/>

            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-teal-400 uppercase">
              HealthCare
            </span>
          </a>
          <div className="mt-6 lg:max-w-sm">
            <p className="text-sm text-gray-800">
            Simplifiez vos démarches médicales grâce à notre plateforme intuitive.
            </p>
            <p className="mt-4 text-sm text-gray-800">
            Découvrez des professionnels de santé près de chez vous et réservez votre consultation en ligne rapidement.
            </p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-base font-bold tracking-wide text-teal-400">
            Contacts
          </p>
          <div className="flex">
            <p className="mr-1 text-gray-800">Téléphone:</p>
            <a
              href="tel:850-123-5021"
              aria-label="Our phone"
              title="Our phone"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              23510638
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Email:</p>
            <a
              href="mailto:info@lorem.mail"
              aria-label="Our email"
              title="Our email"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              healthcare@gmail.com
            </a>
          </div>
          <div className="flex">
            <p className="mr-1 text-gray-800">Addresse:</p>
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Our address"
              title="Our address"
              className="transition-colors duration-300 text-deep-purple-accent-400 hover:text-deep-purple-800"
            >
              10 Av Habib Bourguiba , Douz
            </a>
          </div>
        </div>
        <div>
          <span className="text-base font-bold tracking-wide text-teal-400">
            Social
          </span>
          <div className="flex items-center mt-1 space-x-3">
            <a
              href="/"
              className="text-gray-500 hover:text-teal-400 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-teal-400  transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                <circle cx="15" cy="15" r="4" />
                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
              </svg>
            </a>
            <a
              href="/"
              className="text-gray-500 hover:text-teal-400  transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
          Vous pouvez nous contacter via Twitter, Instagram ou Facebook.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
        <p className="text-sm text-gray-600">
          © Copyright 2024 HealthCare . All rights reserved.
        </p>
        <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
          <li>
            <a
              href="/"
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              F.A.Q
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="/"
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              Terms &amp; Conditions
            </a>
          </li>
        </ul>
      </div>
    </footer>
    </>
  );
}
