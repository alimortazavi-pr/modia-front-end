import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Template from "components/layouts/Template";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function SinglePost() {
  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const params = useParams();

  //States
  const [post, setPost] = useState({});

  //Effects
  useEffect(() => {
    document.title = `Modia | ${user?.name} (@${user?.username})`;
    dispatch(setTitle("Post"));
  }, [user, dispatch]);

  useEffect(() => {
    api
      .get(`/posts/${params.post}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setPost(response.data.post);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [user?.token, params.post]);

  return (
    <Template>
      <li className="border-gray-500 px-4 py-3 flex">
        <Link to={`/${post.user?.username}`} className="avatar">
          <div className="rounded-full w-12 h-12">
            <img
              src={
                post.user?.profile && post.user?.profile?.length !== 0
                  ? `http://localhost:5000/${post.user?.profile[0].path}`
                  : "http://localhost:5000/images/user.jpg"
              }
              alt=""
            />
          </div>
        </Link>
        <div className="ml-3 flex-1">
          <div className="flex justify-between">
            <div>
              <span className="mr-1 text-sm font-semibold">
                {post.user?.name.length > 10
                  ? post.user?.name.slice(0, 9) + "..."
                  : post.user?.name}
              </span>
              <span className="mr-1 text-sm text-gray-500">
                @
                {post.user?.username.length > 5
                  ? post.user?.username.slice(0, 4) + "..."
                  : post.user?.username}
              </span>
              <span className="text-sm text-gray-500">
                . {months[new Date(`${post.createdAt}`).getMonth()]}{" "}
                {new Date(`${post.createdAt}`).getDay()}
              </span>
            </div>
            <span>
              <i className="fa-regular fa-ellipsis"></i>
            </span>
          </div>
          <p className="text-sm mb-3">{post.content}</p>
          <div className="grid grid-cols-2">
            {post.images?.map((img, i) => (
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
          </div>
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
    </Template>
  );
}
