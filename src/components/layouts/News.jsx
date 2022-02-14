import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//Import Tools
import api from "api";

export default function News() {
  //Redux
  const { user: loggedUser } = useSelector((state) => state.auth);

  //Other hooks
  const location = useLocation();

  //States
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoadnig] = useState(true);

  useEffect(() => {
    setLoadnig(true);
    api
      .post(
        `/explore`,
        { value: input },
        {
          headers: { Authorization: `Bearer ${loggedUser?.token}` },
        }
      )
      .then((response) => {
        setUsers(response.data.users);
        setLoadnig(false);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [input, loggedUser?.token]);

  return (
    <div className="hidden lg:flex flex-col items-center justify-start lg:w-80 xl:w-96 p-4 overflow-y-scroll">
      <div className={`${location.pathname === "/explore" || location.pathname === "/explore/" ? "hidden": ""} w-full relative`}>
        <div className="relative w-full flex items-center mb-3">
          <div className="absolute right-3">
            {input ? (
              <span className="cursor-pointer" onClick={() => setInput("")}>
                <i className="fa-duotone fa-circle-xmark text-white text-xl"></i>
              </span>
            ) : (
              <i className="fa-light fa-magnifying-glass"></i>
            )}
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full pr-10 input input-primary input-bordered border-none rounded-full bg-gray-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {loading ? (
          <div className="w-full flex justify-center items-center py-10">
            <i className="fa-duotone fa-spinner-third animate-spin text-4xl"></i>
          </div>
        ) : users.length !== 0 ? (
          <ul className="max-h-96 overflow-auto w-full bg-zinc-900 rounded-lg shadow-md shadow-slate-600 z-50 border-1/2 border-slate-600 absolute">
            {users.map((user) => (
              <Link
                to={`/${user.username}`}
                className="px-4 py-4 flex hover:bg-gray-600 hover:bg-opacity-20 duration-200"
                key={user._id}
              >
                <div className="avatar">
                  <div className="rounded-full w-12 h-12 md:w-14 md:h-14">
                    <img
                      src={
                        user.profile?.length !== 0
                          ? `http://localhost:5000/${user.profile[0].path}`
                          : "http://localhost:5000/images/user.jpg"
                      }
                      alt=""
                    />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex justify-between">
                    <div>
                      <div className="mr-1 text-sm font-semibold">
                        {user.name}
                      </div>
                      <div className="mr-1 text-sm text-gray-500">
                        @{user.username}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm">{user.bio}</p>
                </div>
              </Link>
            ))}
          </ul>
        ) : input ? (
          <div className="max-h-96 overflow-auto w-full bg-zinc-900 rounded-lg shadow-md shadow-slate-600 z-50 border-1/2 border-slate-600 absolute flex justify-center items-center py-10">
            <p className="text-sm italic font-semibold">No user found</p>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="rounded-xl w-full bg-gray-800 p-3 -z-10">
        <p className="text-xl font-semibold">What's happening</p>
        <div style={{ height: "400px" }}></div>
      </div>
    </div>
  );
}
