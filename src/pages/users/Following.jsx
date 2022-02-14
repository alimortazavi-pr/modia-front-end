import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

//Import Tools
import api from "api";

//Import Components
import Template from "components/layouts/Template";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Following() {
  //Redux
  const dispatch = useDispatch();
  const { user: loggedUser } = useSelector((state) => state.auth);

  //Other Hooks
  const params = useParams();

  //States
  const [following, setFollowing] = useState([]);

  //Effects
  useEffect(() => {
    document.title = "Modia | Following";
    dispatch(setTitle("Following"));
  });

  useEffect(() => {
    api
      .get(`/users/${params.username}/following`, {
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then((response) => {
        setFollowing(response.data.following);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [params.username, loggedUser?.token]);

  function toggleFollow(user) {
    api
      .get(`/follow/${user.username}`, {
        headers: { Authorization: `Bearer ${loggedUser?.token}` },
      })
      .then(() => {
        setFollowing(
          following.map((followed) =>
            followed.followed._id === user._id
              ? { ...followed, followStatus: !followed.followStatus }
              : followed
          )
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (
    <Template>
      <div className="flex flex-col overflow-y-hidden">
        <div className="tabs justify-around border-b border-b-gray-600 h-10">
          <Link
            to={`/${params.username}/followers`}
            className="tab tab-bordered border-b-0"
          >
            Followers
          </Link>
          <Link
            to={`/${params.username}/following`}
            className="tab tab-bordered border-purple-600 text-white"
          >
            Following
          </Link>
        </div>
        <ul className="w-full">
          {following.map((followed) => (
            <li className="px-4 py-3 flex" key={followed._id}>
              <div className="avatar">
                <div className="rounded-full w-12 h-12">
                  <img
                    src={
                      followed.followed.profile?.length !== 0
                        ? `http://localhost:5000/${followed.followed.profile[0].path}`
                        : "http://localhost:5000/images/user.jpg"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <Link to={`/${followed.followed.username}`}>
                    <div className="mr-1 text-sm font-semibold">
                      {followed.followed.name}
                    </div>
                    <div className="mr-1 text-sm text-gray-500">
                      @{followed.followed.username}
                    </div>
                  </Link>
                  {followed.followed._id !== loggedUser._id ? (
                    <button
                      className={`btn btn-sm rounded-full border ${
                        followed.followStatus
                          ? "btn-error btn-outline"
                          : "border-gray-500 bg-dark-900 hover:border-gray-500 hover:bg-white hover:text-black"
                      } normal-case`}
                      onClick={() => toggleFollow(followed.followed)}
                    >
                      {followed.followStatus ? "Unfollow" : "Follow"}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-sm">{followed.followed.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Template>
  );
}