import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal from "assets/js/Swal";

export default function Like({ post, setPost }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Functions
  function toggleLike() {
    api
      .get(`/like/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(() => {
        setPost({
          ...post,
          likesLength: post.likeStatus
            ? post.likesLength - 1
            : post.likesLength + 1,
          likeStatus: !post.likeStatus,
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
        post.likeStatus ? "text-red-500" : "text-gray-500"
      } cursor-pointer`}
      onClick={toggleLike}
    >
      <i
        className={`${
          post.likeStatus ? "fa-solid" : "fa-regular"
        } fa-heart text-xl mr-2`}
      ></i>
    </div>
  );
}
