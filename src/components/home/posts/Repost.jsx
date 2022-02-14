import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal from "assets/js/Swal";

export default function Repost({ post, setPost }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Functions
  function toggleRepost() {
    api
      .get(`/profile/posts/${post._id}/repost`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setPost({
          ...post,
          repostsLength: post.repostStatus
            ? post.repostsLength - 1
            : post.repostsLength + 1,
          repostStatus: post.repostStatus ? false : true,
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

  return (
    <div
      className={`${
        post.repostStatus ? "text-purple-500" : "text-gray-500"
      } cursor-pointer`}
      onClick={toggleRepost}
    >
      <i className="fa-regular fa-repeat text-xl mr-2"></i>
    </div>
  );
}
