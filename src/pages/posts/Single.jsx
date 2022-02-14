import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Template from "components/layouts/Template";
import Like from "components/home/posts/Like";
import ReplyPost from "components/home/posts/ReplyPost";
import RepliesList from "components/home/posts/RepliesList";
import Share from "components/home/posts/Share";
import Repost from "components/home/posts/Repost";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function SinglePost() {
  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const params = useParams();
  const replyInput = useRef(null);

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
      <div className="border-gray-500 py-3">
        <div className="px-3">
          <div className="flex items-center">
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
            <div className="flex justify-between ml-3">
              <div>
                <div className="mr-1 text-sm font-semibold">
                  {post.user?.name}
                </div>
                <div className="mr-1 text-sm text-gray-500">
                  @{post.user?.username}
                </div>
              </div>
            </div>
          </div>
          {post.parent ? (
            <div className="flex justify-between pt-4">
              <p className="text-sm text-gray-500">
                Replying to{" "}
                <Link
                  to={`/${post.parent?.user?.username}`}
                  className="text-purple-500"
                >
                  @{post.parent?.user?.username}
                </Link>
              </p>
            </div>
          ) : (
            ""
          )}
          <div>
            <p className="text-md mt-7 mb-8">{post.content}</p>
            <div className="flex text-gray-500 font-semibold text-sm">
              {new Date(`${post.createdAt}`).getHours() < 10
                ? "0" + new Date(`${post.createdAt}`).getHours()
                : new Date(`${post.createdAt}`).getHours()}
              :
              {new Date(`${post.createdAt}`).getMinutes() < 10
                ? "0" + new Date(`${post.createdAt}`).getMinutes()
                : new Date(`${post.createdAt}`).getMinutes()}
              . {months[new Date(`${post.createdAt}`).getMonth()]}{" "}
              {new Date(`${post.createdAt}`).getDay()},{" "}
              {new Date(`${post.createdAt}`).getFullYear()}
            </div>
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
            <div className="flex pt-3  border-t border-gray-500 mt-4">
              <p className="text-gray-500 mr-5">
                <span className="text-white">{post.repostsLength}</span> Repost
              </p>
              <p className="text-gray-500 mr-5">
                <span className="text-white">{post.posts?.length}</span> Replies
              </p>
              <p className="text-gray-500 mr-5">
                <span className="text-white">{post.likesLength}</span> Likes
              </p>
            </div>
            <div className="flex justify-between py-3 px-14 border-y border-gray-500 mt-4">
              <div
                className="text-gray-500 cursor-pointer"
                onClick={() => replyInput.current.focus()}
              >
                <i className="fa-regular fa-message text-xl mr-2"></i>
              </div>
              <Repost post={post} setPost={setPost} />
              <Like post={post} setPost={setPost} />
              <Share post={post} />
            </div>
            <ReplyPost post={post} setPost={setPost} replyInput={replyInput} />
          </div>
        </div>
        <RepliesList post={post} setPost={setPost} />
      </div>
    </Template>
  );
}
