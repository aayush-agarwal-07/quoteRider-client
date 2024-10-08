import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { gsap } from "gsap";

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    // Initial hide of dropdown
    if (currentUser && dropdownRef.current) {
      gsap.set(dropdownRef.current, { opacity: 0, pointerEvents: "none" });
    }
  }, [currentUser]);

  const handleSignout = async () => {
    try {
      const res = await fetch(
        "https://quoterider-server.onrender.com/api/user/signout",
        {
          method: "POST",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleMouseEnter = () => {
    if (currentUser && dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    if (currentUser && dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b-2 border-gray-200 dark:border-gray-700">
      <div className="w-[100%] sm:max-w-[90%] sm:mx-auto px-4 py-[1px]sm:py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center w-[20vw]">
          <img
            className="w-[50px] sm:w-[70px]"
            src="https://firebasestorage.googleapis.com/v0/b/projects-images.appspot.com/o/logo-(1).png?alt=media&token=fd468f51-42a9-488a-8b93-0582a7ee8389"
          />
        </Link>
        <Link to="/" className="font-semibold sm:text-4xl dark:text-white absolute">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Quote
          </span>
          Rider
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center flex-grow max-w-xs"
        >
          <input
            type="text"
            placeholder="Search..."
            className="hidden lg:block w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="lg:hidden w-12 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400"
          >
            <AiOutlineSearch />
          </button>
        </form>
        <nav className="hidden sm:block">
          <ul className="flex space-x-4 gap-9">
            <li>
              <Link
                to="/"
                className={`text-gray-700 dark:text-gray-300 text-xl ${
                  path === "/" ? "font-semibold underline" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`text-gray-700 dark:text-gray-300 text-xl ${
                  path === "/about" ? "font-semibold underline" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/all-posts"
                className={`text-gray-700 dark:text-gray-300 text-xl ${
                  path === "/all-posts" ? "font-semibold underline" : ""
                }`}
              >
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/all-videos"
                className={`text-gray-700 dark:text-gray-300 text-xl ${
                  path === "/all-videos" ? "font-semibold underline" : ""
                }`}
              >
                Videos
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-12 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400"
          >
            {theme === "light" ? <FaSun /> : <FaMoon />}
          </button>
          {currentUser ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button ref={profileButtonRef} className="flex items-center">
                <img
                  src={currentUser.profilePicture}
                  alt="user"
                  className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              </button>
              <div
                ref={dropdownRef}
                className="absolute right-0 top-8 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
              >
                <div className="px-4 py-2">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    @{currentUser.username}
                  </span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400">
                    {currentUser.email}
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <Link to="/dashboard?tab=profile">
                    <button className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link to="/sign-in">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-md">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
