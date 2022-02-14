import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Aside() {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const location = useLocation();

  //States
  const [moreDropDown, setMoreDropDown] = useState(false);
  const [accountDropDown, setAccountDropDown] = useState(false);

  return (
    <div className="hidden md:flex w-20 xl:w-64 border-r-1/2 border-gray-600 flex-col bg-dark-900 bg-opacity-50">
      <Link
        to="/"
        className="flex justify-center h-20 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <i className="fa-brands fa-twitter text-2xl"></i>
        </div>
      </Link>
      <Link
        to="/"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/" ? "fa-solid" : "fa-light"
              } fa-house text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Home
          </p>
        </div>
      </Link>
      <Link
        to="/explore"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/explore" ||
                location.pathname === "/explore/"
                  ? "fa-solid"
                  : "fa-light"
              } fa-magnifying-glass text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Explore
          </p>
        </div>
      </Link>
      <Link
        to="/notifications"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/notifications" ||
                location.pathname === "/notifications/"
                  ? "fa-solid"
                  : "fa-light"
              } fa-bell text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Notifications
          </p>
        </div>
      </Link>
      <Link
        to="#"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/messages" ||
                location.pathname === "/messages/"
                  ? "fa-solid"
                  : "fa-light"
              } fa-envelope text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Messages
          </p>
        </div>
      </Link>
      <Link
        to="/bookmarks"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/bookmarks" ||
                location.pathname === "/bookmarks/"
                  ? "fa-solid"
                  : "fa-light"
              } fa-bookmark text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Bookmarks
          </p>
        </div>
      </Link>
      <Link
        to="/profile"
        className="flex justify-center mb-1 xl:justify-start"
      >
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <span>
            <i
              className={`${
                location.pathname === "/profile" ||
                location.pathname === "/profile/"
                  ? "fa-solid"
                  : "fa-light"
              } fa-user text-xl xl:w-1/12`}
            ></i>
          </span>
          <p className="hidden xl:block ml-3 text-xl font-light xl:w-11/12">
            Profile
          </p>
        </div>
      </Link>
      <div className="flex justify-center mb-1 xl:justify-start relative xl:mb-3">
        <div className="flex items-center xl:min-w-min p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200">
          <button
            className={`flex items-center`}
            onClick={() => setMoreDropDown(!moreDropDown)}
          >
            <i className={`fa-light fa-circle-ellipsis text-xl`}></i>
            <p className="hidden xl:block ml-3 text-xl font-light">More</p>
          </button>
        </div>
        {moreDropDown ? (
          <div className="absolute bg-dark-900 w-48 left-10 bottom-10 shadow shadow-slate-500 border border-white border-opacity-25 rounded-xl py-2 z-10">
            <ul>
              <Link to="#">
                <li className="text-sm px-5 py-3 hover:bg-gray-600 hover:bg-opacity-20">
                  <i className="fa-thin fa-gear mr-3"></i>Setting and privacy
                </li>
              </Link>
            </ul>
            <hr className="border-gray-700 my-2" />
            <ul>
              <Link to="#">
                <li className="text-sm px-5 py-3 hover:bg-gray-600 hover:bg-opacity-20">
                  <i className="fa-thin fa-pen-paintbrush mr-3"></i>Display
                </li>
              </Link>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center h-14 xl:justify-start">
        <Link
          to="/posts/create"
          state={{ backgroundLocation: location }}
          className="btn btn-circle btn-primary xl:w-10/12"
        >
          <span className="xl:hidden">
            <i className="fa-light fa-plus text-xl text-white "></i>
          </span>
          <p className="hidden xl:block">Post</p>
        </Link>
      </div>
      <div className="flex items-end justify-center flex-1 p-4 relative xl:justify-start">
        <div
          className="flex xl:w-full xl:p-3 rounded-full hover:bg-gray-800 hover:bg-opacity-30 duration-200 cursor-pointer"
          onClick={() => setAccountDropDown(!accountDropDown)}
        >
          <div className="avatar xl:w-12">
            <div className="rounded-full">
              <img
                src={
                  user?.profile && user?.profile?.length !== 0
                    ? `http://localhost:5000/${user?.profile[0].path}`
                    : "http://localhost:5000/images/user.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="hidden flex-1 xl:flex justify-between items-center px-3">
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-gray-500">@{user?.username}</p>
            </div>
            <div>
              <i className="fa-regular fa-ellipsis"></i>
            </div>
          </div>
        </div>
        {accountDropDown ? (
          <div className="absolute bg-dark-900 w-72 left-14 bottom-14 shadow shadow-slate-500 border border-white border-opacity-25 rounded-xl py-2 z-10">
            <div className="flex px-3 py-1">
              <div className="avatar w-12">
                <div className="rounded-full">
                  <img
                    src={
                      user?.profile && user?.profile?.length !== 0
                        ? `http://localhost:5000/${user?.profile[0].path}`
                        : "http://localhost:5000/images/user.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="flex-1 flex justify-between items-center px-3">
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm text-gray-500">@{user?.username}</p>
                </div>
                <div>
                  <i className="fa-light fa-check text-purple-400 text-lg"></i>
                </div>
              </div>
            </div>
            <hr className="border-gray-700 my-2" />
            <ul>
              <Link to="/logout">
                <li className="text-sm px-5 py-3">
                  <i className="fa-thin fa-arrow-right-from-bracket mr-2"></i>
                  Log out @{user?.username}
                </li>
              </Link>
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
