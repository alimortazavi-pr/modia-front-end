import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Nav({ setShowDrawer }) {
  //Redux
  const { title } = useSelector((state) => state.layouts);
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-12 max-h-12 md:p-2 flex items-center bg-dark-900 bg-opacity-50 backdrop-blur-sm sticky w-full top-0 z-10">
      {location.pathname === "/" ? (
        <div className="avatar w-14 p-2 md:hidden">
          <div
            className="rounded-full cursor-pointer"
            onClick={() => setShowDrawer(true)}
          >
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
      ) : (
        <div
          className="w-10 flex items-center justify-center cursor-pointer py-2"
          onClick={() => navigate(-1)}
        >
          <i className="fa-regular fa-angle-left text-lg"></i>
        </div>
      )}
      <div className="flex items-center pl-1 md:pl-3">
        <p className="font-semibold md:text-lg">{title}</p>
      </div>
    </div>
  );
}
