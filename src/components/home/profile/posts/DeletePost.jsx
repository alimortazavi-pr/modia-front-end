import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

export default function DeletePost({ posts, setPosts, postId }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Functions
  function deletePost(postId) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/profile/posts/${postId}`, {
            headers: { Authorization: `Bearer ${user?.token}` },
          })
          .then(() => {
            setPosts(posts.filter((post) => post._id !== postId));
            Toast.fire({
              icon: "warning",
              title: "Post deleted",
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    });
  }

  return (
    <li
      className="text-sm px-5 py-3 text-red-600 font-semibold hover:bg-gray-600 hover:bg-opacity-20"
      onClick={() => deletePost(postId)}
    >
      <i className="fa-duotone fa-trash mr-3"></i>Delete post
    </li>
  );
}
