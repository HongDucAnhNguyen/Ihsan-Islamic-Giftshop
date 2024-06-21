"use client";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Link from "next/link";

const NavbarClient = ({ cartLength, user }) => {
  return (
    <nav className="py-2 border-b">
      <div className="container max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between px-10 py-3 gap-4 w-full">
          <div className="flex gap-5">
            <a href="/">
              <Image
                src="/images/logo.png"
                height="40"
                width="120"
                alt="Ihsan"
              />
            </a>
            <SearchBar />
          </div>

          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 fill-black"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </button>

            <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 items-center">
              <li className="mb-6 hidden max-lg:block"></li>

              <li className="group max-lg:border-b max-lg:py-3 relative">
                <button className="hover:text-lime-600 text-gray-600 text-[15px] font-bold lg:hover:fill-lime-600 block">
                  Shop Categories
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16px"
                    height="16px"
                    className="ml-1 inline-block"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                      data-name="16"
                      data-original="#000000"
                    />
                  </svg>
                </button>
                <ul className="absolute shadow-lg bg-white space-y-3 lg:top-5 max-lg:top-8 -left-6 min-w-[250px] z-50 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                  <li className="border-b py-2 ">
                    <a
                      href="/?category=Quran"
                      className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Quran
                    </a>
                  </li>
                  <li className="border-b py-2 ">
                    <a
                      href="/?category=Mens+Clothing"
                      className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Mens Clothing
                    </a>
                  </li>
                  <li className="border-b py-2 ">
                    <a
                      href="/?category=Womens+Clothing"
                      className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Womens Clothing
                    </a>
                  </li>
                  <li className="border-b py-2 ">
                    <a
                      href="/?category=Accessories"
                      className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                    >
                      Accessories
                    </a>
                  </li>
                </ul>
              </li>

              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  href="/about"
                  className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                >
                  About
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3">
                <Link
                  href="/contact"
                  className="hover:text-lime-600 text-gray-600 text-[15px] font-bold block"
                >
                  Contact
                </Link>
              </li>
              <li className="max-lg:border-b max-lg:py-3">
                <a
                  href="/cart"
                  className="flex items-center space-x-8 max-lg:ml-auto"
                >
                  <span className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20px"
                      height="20px"
                      className="cursor-pointer fill-[#333] hover:fill-lime-600 inline"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                        data-original="#000000"
                      ></path>
                    </svg>
                    <span className="absolute left-auto -ml-1 top-0 rounded-full bg-black px-1 py-0 text-xs text-white">
                      {cartLength > 0 ? cartLength : 0}
                    </span>
                  </span>

                  <button id="toggleOpen" className="lg:hidden">
                    <svg
                      className="w-7 h-7"
                      fill="#000"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </a>
              </li>
              <li className="max-lg:border-b max-lg:py-3">
                {!user?.username && (
                  <a
                    href="/login"
                    className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                  >
                    <i className="text-gray-400 w-5 fa fa-user"></i>
                    <span className="hidden lg:inline ml-1">Sign in</span>
                  </a>
                )}
                {user?.username && (
                  <a href="/profile">
                    <div className="cursor-pointer">
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        src={
                          user?.userAvatar?.url || "/images/default_avatar.png"
                        }
                      />
                    </div>
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
