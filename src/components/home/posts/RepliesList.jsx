import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Swal from "assets/js/Swal";
import Share from "components/home/posts/Share";
import CreateReply from "components/home/posts/CreateReply";

export default function RepliesList({ post, setPost }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //States
  const [show, setShow] = useState(false);
  const [postSelected, setPostSelected] = useState({});

  //Functions
  function toggleRepost(reply) {
    api
      .get(`/profile/posts/${reply._id}/repost`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setPost({
          ...post,
          posts: post.posts.map((ry) => {
            if (reply._id === ry._id) {
              ry.repostStatus
                ? (ry.repostsLength -= 1)
                : (ry.repostsLength += 1);
              ry.repostStatus = !ry.repostStatus;
              return ry;
            } else {
              return ry;
            }
          }),
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response.data.message,
          timer: 2000,
        });
      });
  }

  function toggleLike(reply) {
    api
      .get(`/like/${reply._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setPost({
          ...post,
          posts: post.posts.map((ry) => {
            if (reply._id === ry._id) {
              ry.likeStatus ? (ry.likesLength -= 1) : (ry.likesLength += 1);
              ry.likeStatus = !ry.likeStatus;
              return ry;
            } else {
              return ry;
            }
          }),
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          text: err.response.data.message,
          timer: 2000,
        });
      });
  }

  function showReplyComponent(reply) {
    setShow(true);
    setPostSelected(reply);
  }

  return (
    <>
      {" "}
      <ul className="min-h-screen">
        {post.posts?.map((reply) => (
          <li
            className="border-t border-gray-500 px-4 py-3 flex"
            key={reply._id}
          >
            <div className="avatar">
              <div className="rounded-full w-12 h-12">
                <img
                  src={
                    reply.user.profile && reply.user.profile?.length !== 0
                      ? `http://localhost:5000/${reply.user.profile[0].path}`
                      : "http://localhost:5000/images/user.jpg"
                  }
                  alt=""
                />
              </div>
            </div>
            <div className="ml-3 flex-1">
              <div className="mb-2">
                <div>
                  <span className="mr-1 text-sm font-semibold">
                    {reply.user.name.length > 10
                      ? reply.user.name.slice(0, 9) + "..."
                      : reply.user.name}
                  </span>
                  <span className="mr-1 text-sm text-gray-500">
                    @
                    {reply.user.username.length > 5
                      ? reply.user.username.slice(0, 4) + "..."
                      : reply.user.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    . {months[new Date(`${reply.createdAt}`).getMonth()]}{" "}
                    {new Date(`${reply.createdAt}`).getDay()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Replying to{" "}
                  <Link
                    to={`/${reply.user?.username}`}
                    className="text-purple-500"
                  >
                    @{post.user?.username}
                  </Link>
                </p>
              </div>
              <Link to={`/posts/${reply._id}`} className="text-sm">
                {reply.content}
              </Link>
              <Link to={`/posts/${reply._id}`} className="grid grid-cols-2">
                {reply.images?.map((img, i) => (
                  <div
                    className={`relative p-1 ${
                      reply.images?.length === 1
                        ? "col-span-2"
                        : (reply.images?.length === 3) & (i === 0)
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
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={() => showReplyComponent(reply)}
                >
                  <i className="fa-light fa-message mr-1"></i>
                  {reply.posts?.length}
                </div>
                <div
                  className={`${
                    reply.repostStatus ? "text-purple-500" : "text-gray-500"
                  } cursor-pointer`}
                  onClick={() => toggleRepost(reply)}
                >
                  <i className="fa-light fa-repeat mr-1"></i>
                  {reply.repostsLength}
                </div>
                <div
                  className={`${
                    reply.likeStatus ? "text-red-500" : "text-gray-500"
                  } cursor-pointer`}
                  onClick={() => toggleLike(reply)}
                >
                  <i
                    className={`${
                      reply.likeStatus ? "fa-solid" : "fa-regular"
                    } fa-heart mr-1`}
                  ></i>
                  {reply.likesLength}
                </div>
                <Share post={reply} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <CreateReply show={show} setShow={setShow} post={postSelected} />
    </>
  );
}
