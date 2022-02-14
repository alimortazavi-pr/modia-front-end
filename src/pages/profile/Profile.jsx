import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Template from "components/layouts/Template";
import DeletePost from "components/home/profile/posts/DeletePost";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Profile() {
  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const location = useLocation();

  //States
  const [posts, setPosts] = useState([]);
  const [postOptionDropDown, setPostOptionDropDown] = useState({
    status: false,
    postId: "",
  });

  //Effects
  useEffect(() => {
    document.title = `Modia | ${user?.name} (@${user?.username})`;
    dispatch(setTitle(user?.name));
  }, [user, dispatch]);

  useEffect(() => {
    api
      .get(`/profile/posts`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setPosts(response.data.posts);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [user?.token, location]);

  return (
    <Template>
      <div className="w-full h-36 sm:h-44 md:h-60 relative">
        {user?.background?.length !== 0 ? (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5000/${user?.background[0].path}`}
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
                  user?.profile && user?.profile?.length !== 0
                    ? `http://localhost:5000/${user?.profile[0].path}`
                    : "http://localhost:5000/images/user.jpg"
                }
                alt=""
              />
            </div>
          </div>
          <Link
            to="/setting/profile"
            className="btn btn-sm rounded-full border border-gray-500 bg-dark-900 hover:border-gray-500 hover:bg-white hover:text-black normal-case"
          >
            Edit profile
          </Link>
        </div>
        <div className="mb-2">
          <p className="text-xl font-bold">{user?.name}</p>
          <p className="text-gray-500 text-sm">@{user?.username}</p>
        </div>
        <div className="mb-2 text-sm">{user?.bio}</div>
        <div className="mb-2">
          {user?.dateBirthday ? (
            <p className="text-sm text-gray-400">
              <i className="fa-thin fa-balloon mr-1"></i> Born{" "}
              {months[new Date(`${user?.dateBirthday}`).getMonth()]}{" "}
              {new Date(`${user?.dateBirthday}`).getDate()},{" "}
              {new Date(`${user?.dateBirthday}`).getFullYear()}
            </p>
          ) : (
            ""
          )}
          <p className="text-sm text-gray-400">
            <i className="fa-thin fa-calendar-day mr-1"></i> Joined{" "}
            {months[new Date(`${user?.createdAt}`).getMonth()]}{" "}
            {new Date(`${user?.createdAt}`).getFullYear()}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to={`/${user?.username}/following`}
            className="text-sm font-semibold text-gray-500 mr-4"
          >
            <span className="text-white mr-1">{user?.following?.length}</span>
            Following
          </Link>
          <Link
            to={`/${user?.username}/followers`}
            className="text-sm font-semibold text-gray-500"
          >
            <span className="text-white mr-1">{user?.followers?.length}</span>
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
      <ul className="min-h-screen">
        {posts.map((post) => (
          <li
            className="border-t border-gray-500 px-4 py-3 flex"
            key={post._id}
          >
            <div className="avatar">
              <div className="rounded-full w-12 h-12">
                <img
                  src={
                    post.user.profile && post.user.profile?.length !== 0
                      ? `http://localhost:5000/${post.user.profile[0].path}`
                      : "http://localhost:5000/images/user.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between relative">
                <div>
                  <span className="mr-1 text-sm font-semibold">
                    {post.user.name.length > 10
                      ? post.user.name.slice(0, 9) + "..."
                      : post.user.name}
                  </span>
                  <span className="mr-1 text-sm text-gray-500">
                    @
                    {post.user.username.length > 5
                      ? post.user.username.slice(0, 4) + "..."
                      : post.user.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    . {months[new Date(`${post.createdAt}`).getMonth()]}{" "}
                    {new Date(`${post.createdAt}`).getDay()}
                  </span>
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setPostOptionDropDown({
                      status: !postOptionDropDown.status,
                      postId: post._id,
                    })
                  }
                >
                  <i className="fa-regular fa-ellipsis"></i>
                </span>
                {postOptionDropDown.status &&
                postOptionDropDown.postId === post._id ? (
                  <div className="absolute bg-dark-900 w-40 right-0 top-6 shadow shadow-slate-500 border border-white border-opacity-25 rounded-lg py-2 z-10">
                    <ul>
                      <li>
                        <DeletePost
                          posts={posts}
                          setPosts={setPosts}
                          postId={post._id}
                        />
                        <Link
                          to={`/posts/${post._id}/edit`}
                          state={{ backgroundLocation: location }}
                        >
                          <li className="text-sm px-5 py-3 hover:bg-gray-600 hover:bg-opacity-20">
                            <i className="fa-duotone fa-pen-to-square mr-3"></i>
                            Edit post
                          </li>
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <Link to={`/posts/${post._id}`} className="text-sm">
                {post.content}
              </Link>
              <Link to={`/posts/${post._id}`} className="grid grid-cols-2">
                {post.images.map((img, i) => (
                  <div
                    className={`relative p-1 ${
                      post.images?.length === 1
                        ? "col-span-2"
                        : (post.images?.length === 3) & (i === 0)
                        ? "row-span-2"
                        : "col-auto"
                    }`}
                    key={i}
                  >
                    <img
                      className="rounded-md md:rounded-2xl w-full h-full object-cover"
                      src={`http://localhost:5000/${img.path}`}
                      alt=""
                    />
                  </div>
                ))}
              </Link>
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
        ))}
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
