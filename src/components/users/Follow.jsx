import { useDispatch, useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Actions
import { setUser as setLoggedUser } from "store/actions/auth";

export default function Follow({ user, setUser, token }) {
  //Redux
  const { user: loggedUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //Functions
  function follow() {
    api
      .get(`/follow/${user.username}`, {
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then((response) => {
        if (user.followStatus) {
          setUser({
            ...user,
            followers: user.followers.filter(
              (follower) => follower.follows !== loggedUser._id
            ),
            followStatus: false,
          });
          dispatch(
            setLoggedUser({
              ...loggedUser,
              following: loggedUser.following.filter(
                (folloewd) => folloewd.followed !== user._id
              ),
            })
          );
        } else {
          setUser({
            ...user,
            followers: [...user.followers, response.data.follower],
            followStatus: true,
          });
          dispatch(
            setLoggedUser({
              ...loggedUser,
              following: [...loggedUser.following, response.data.follower],
            })
          );
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <button
      className={`btn btn-sm rounded-full border ${
        user.followStatus
          ? "btn-error btn-outline"
          : "border-gray-500 bg-dark-900 hover:border-gray-500 hover:bg-white hover:text-black"
      } normal-case`}
      onClick={follow}
    >
      {user.followStatus ? "Unfollow" : "Follow"}
    </button>
  );
}
