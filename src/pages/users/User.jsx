import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Template from "components/layouts/Template";
import Follow from "components/users/Follow";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function User() {
  //Redux
  const dispatch = useDispatch();
  const { user: loggedUser } = useSelector((state) => state.auth);

  //Other Hooks
  const location = useLocation();
  const params = useParams();

  //States
  const [user, setUser] = useState({
    admin: false,
    background: [],
    comments: [],
    createdAt: "",
    email: "",
    emailActive: false,
    followers: [],
    following: [],
    id: "",
    images: [],
    mobileActive: false,
    name: "",
    password: "",
    posts: [],
    profile: [],
    updatedAt: "",
    username: "",
    _id: "",
  });

  //Effects
  useEffect(() => {
    document.title = `Modia | ${user.name} (@${user.username})`;
    dispatch(setTitle(user.name));
  }, [user, dispatch]);

  useEffect(() => {
    api
      .get(`/users/${params.username}`, {
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [params.username, loggedUser?.token]);

  return (
    <Template>
      <div className="w-full h-36 sm:h-44 md:h-60 relative">
        {user.background?.length !== 0 ? (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5000/${user.background[0].path}`}
            alt=""
          />
        ) : (
          <div className="w-full h-full bg-gray-800 bg-opacity-50 absolute top-0 flex items-center justify-center"></div>
        )}
      </div>
      <div className="py-3 px-4">
        <div className="flex relative justify-end mb-4">
          <div className="avatar absolute -top-12 left-0 sm:-top-14 sm:left-0 md:-top-17 md:left-0">
            <div className="rounded-full mb-2 w-17 h-17 sm:w-24 sm:h-24 md:w-28 md:h-28 border-2 sm:border-4 border-dark-900">
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
          <div className="flex">
            <button className="btn btn-sm btn-circle rounded-full border border-gray-500 bg-dark-900 hover:border-gray-500 hover:bg-white hover:text-black normal-case mr-2">
              <i className="fa-regular fa-ellipsis"></i>
            </button>
            <Link
              to="#"
              className="btn btn-sm btn-circle rounded-full border border-gray-500 bg-dark-900 hover:border-gray-500 hover:bg-white hover:text-black normal-case mr-2"
            >
              <i className="fa-light fa-envelope"></i>
            </Link>
            <Follow
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
        <div className="mb-2">
          <p className="text-xl font-bold">{user.name}</p>
          <p className="text-gray-500 text-sm">@{user.username}</p>
        </div>
        <div className="mb-2 text-sm">{user.bio}</div>
        <div className="mb-2">
          {user.dateBirthday ? (
            <p className="text-sm text-gray-400">
              <i className="fa-thin fa-balloon mr-1"></i> Born{" "}
              {months[new Date(`${user.dateBirthday}`).getMonth()]}{" "}
              {new Date(`${user.dateBirthday}`).getDate()},{" "}
              {new Date(`${user.dateBirthday}`).getFullYear()}
            </p>
          ) : (
            ""
          )}
          <p className="text-sm text-gray-400">
            <i className="fa-thin fa-calendar-day mr-1"></i> Joined{" "}
            {months[new Date(`${user.createdAt}`).getMonth()]}{" "}
            {new Date(`${user.createdAt}`).getFullYear()}
          </p>
        </div>
        <div className="flex items-center">
          <Link to={`/${params.username}/following`} className="text-sm font-semibold text-gray-500 mr-4">
            <span className="text-white mr-1">{user.following?.length}</span>
            Following
          </Link>
          <Link to={`/${params.username}/followers`} className="text-sm font-semibold text-gray-500">
            <span className="text-white mr-1">{user.followers?.length}</span>
            Followers
          </Link>
        </div>
      </div>
      <div className="px-3 py-5 overflow-x-auto">
        <div className="tabs justify-between flex-nowrap w-96">
          <button className="tab tab-bordered border-purple-600 text-white">
            Posts
          </button>
          <button className="tab tab-bordered border-b-0">
            Posts & replies
          </button>
          <button className="tab tab-bordered border-b-0">Media</button>
          <button className="tab tab-bordered border-b-0">Likes</button>
        </div>
      </div>
      <ul>
        <li className="border-y border-gray-500 px-4 py-3 flex">
          <div className="avatar">
            <div className="rounded-full w-12 h-12">
              <img
                src="http://daisyui.com/tailwind-css-component-profile-1@40w.png"
                alt=""
              />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <div className="flex justify-between">
              <div>
                <span className="mr-1 text-sm font-semibold">
                  {user.name.length > 10
                    ? user.name.slice(0, 9) + "..."
                    : user.name}
                </span>
                <span className="mr-1 text-sm text-gray-500">
                  @
                  {user.username.length > 5
                    ? user.username.slice(0, 4) + "..."
                    : user.username}
                </span>
                <span className="text-sm text-gray-500">. Dec 16</span>
              </div>
              <span>
                <i className="fa-regular fa-ellipsis"></i>
              </span>
            </div>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse euismod tempus erat, id ultricies tortor rhoncus a.
              Quisque nec porta magna. Maecenas sit amet tristique odio, dapibus
              pellentesque neque. Nulla ut quam in tellus ornare interdum vel
              in.
            </p>
            <div className="flex justify-between pt-3 px-3">
              <div className="text-gray-500">
                <i className="fa-light fa-message mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-repeat mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-heart mr-2"></i>0
              </div>
              <div className="text-gray-500">
                <i className="fa-light fa-arrow-up-from-bracket mr-2"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <Link
        to="/posts/create"
        state={{ backgroundLocation: location }}
        className="absolute bottom-5 right-5 md:hidden btn btn-circle btn-primary shadow shadow-slate-500"
      >
        <i className="fa-regular fa-plus text-lg"></i>
      </Link>
    </Template>
  );
}
