import { Link, useLocation } from "react-router-dom";

export default function Tab() {
  //Other Hooks
  const location = useLocation();

  return (
    <div className="h-14 border-t-1/2 border-gray-600 flex justify-around bg-dark-900 bg-opacity-50 md:hidden">
      <Link to="/" className="flex items-center justify-center w-full">
        <i
          className={`${
            location.pathname === "/" ? "fa-solid" : "fa-thin"
          } fa-house text-2xl`}
        ></i>
      </Link>
      <Link to="/explore" className="flex items-center justify-center w-full">
        <i
          className={`${
            location.pathname === "/explore" || location.pathname === "/explore/"
              ? "fa-solid"
              : "fa-thin"
          } fa-magnifying-glass text-2xl`}
        ></i>
      </Link>
      <Link to="/notifications" className="flex items-center justify-center w-full">
        <i
          className={`${
            location.pathname === "/notifications" ||
            location.pathname === "/notifications/"
              ? "fa-solid"
              : "fa-thin"
          } fa-bell text-2xl`}
        ></i>
      </Link>
      <Link to="#" className="flex items-center justify-center w-full">
        <i
          className={`${
            location.pathname === "/messages" ||
            location.pathname === "/messages/"
              ? "fa-solid"
              : "fa-thin"
          } fa-envelope text-2xl`}
        ></i>
      </Link>
    </div>
  );
}
