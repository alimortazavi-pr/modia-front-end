import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Drawer({ showDrawer, setShowDrawer }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className={`z-50 flex justify-between absolute w-full h-full duration-300 md:hidden ${
        showDrawer ? "left-0 opacity-100" : "-left-full opacity-0"
      }`}
    >
      <div className="w-72 h-full bg-dark-900 shadow-md shadow-slate-400 border-r border-white border-opacity-25 overflow-y-hidden">
        <div className="flex items-center justify-between py-3 px-5">
          <p className="font-semibold">Account info</p>
          <div className="cursor-pointer" onClick={() => setShowDrawer(false)}>
            <i className="fa-regular fa-xmark text-lg"></i>
          </div>
        </div>
        <div className="w-full h-full py-4 overflow-y-scroll">
          <div className="px-5 mb-3">
            <Link to={`/${user?.username}`} className="avatar w-3/12 mb-3">
              <div className="rounded-full">
                <img
                  src={
                    user?.profile && user?.profile?.length !== 0
                      ? `http://localhost:5000/${user?.profile[0]?.path}`
                      : "http://localhost:5000/images/user.jpg"
                  }
                  alt=""
                />
              </div>
            </Link>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-gray-500 mb-4">@{user?.username}</p>
            <div className="flex items-center">
              <div className="text-sm font-semibold text-gray-500 mr-4">
                <span className="text-white mr-1">
                  {user?.following?.length}
                </span>
                Following
              </div>
              <div className="text-sm font-semibold text-gray-500">
                <span className="text-white mr-1">
                  {user?.followers?.length}
                </span>
                Followers
              </div>
            </div>
          </div>
          <ul>
            <Link to="/profile">
              <li className="text-sm px-5 py-3">
                <i className="fa-thin fa-user mr-3"></i>Profile
              </li>
            </Link>
            <Link to="/bookmarks">
              <li className="text-sm px-5 py-3">
                <i className="fa-thin fa-bookmark mr-3"></i>Bookmarks
              </li>
            </Link>
          </ul>
          <hr className="border-gray-700 my-2" />
          <ul>
            <Link to="#">
              <li className="text-sm px-5 py-3">
                <i className="fa-thin fa-gear mr-3"></i>Setting and privacy
              </li>
            </Link>
          </ul>
          <hr className="border-gray-700 my-2" />
          <ul>
            <Link to="#">
              <li className="text-sm px-5 py-3">
                <i className="fa-thin fa-pen-paintbrush mr-3"></i>Display
              </li>
            </Link>
          </ul>
          <hr className="border-gray-700 my-2" />
          <ul>
            <Link to="/logout">
              <li className="text-sm px-5 py-3">
                <i className="fa-thin fa-arrow-right-from-bracket mr-3"></i>Log
                out
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div
        className="flex-1 h-full bg-gray-600 bg-opacity-25"
        onClick={() => setShowDrawer(false)}
      ></div>
    </div>
  );
}
