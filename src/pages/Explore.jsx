import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Import Tools
import api from "api";

//Import Components
import Template from "components/layouts/Template";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Explore() {
  //Redux
  const dispatch = useDispatch();
  const { user: loggedUser } = useSelector((state) => state.auth);

  //States
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoadnig] = useState(true);

  //Effects
  useEffect(() => {
    document.title = "Modia | Explore";
    dispatch(setTitle("Explore"));
  });

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
    <Template>
      <div className="px-3 my-3">
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
      </div>
      {loading ? (
        <div className="w-full flex justify-center items-center py-10">
          <i className="fa-duotone fa-spinner-third animate-spin text-4xl"></i>
        </div>
      ) : (
        <ul className="w-full">
          {users.length !== 0 ? (
            users.map((user) => (
              <Link
                to={`/${user.username}`}
                className="px-4 py-5 flex hover:bg-gray-600 hover:bg-opacity-20 duration-200"
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
            ))
          ) : input ? (
            <div className="w-full flex justify-center items-center py-10">
              <p className="text-sm italic font-semibold">No user found</p>
            </div>
          ) : (
            ""
          )}
        </ul>
      )}
    </Template>
  );
}
