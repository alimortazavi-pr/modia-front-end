import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Template from "components/layouts/Template";
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { profileValidator } from "validators/profileValidator";

//Import Actions
import { setTitle } from "store/actions/layouts";
import { setUser } from "store/actions/auth";

export default function EditProfile() {
  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();
  const location = useLocation();

  //States
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    website: "",
    dateBirthday: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Effects
  useEffect(() => {
    document.title = `Modia | Edit profile`;
    dispatch(setTitle(user?.name));
    setForm({ ...user });
  }, [user, dispatch]);

  //Functions
  function inputHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit() {
    setLoading(true);
    profileValidator
      .validate({ ...form }, { abortEarly: false })
      .then(() => {
        api
          .put(`/profile`, form, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then((response) => {
            dispatch(setUser({ user: response.data }));

            setLoading(false);
            setForm({
              name: "",
              username: "",
              email: "",
              bio: "",
              website: "",
              dateBirthday: "",
            });
            setErrors({ paths: [], messages: {} });
            Toast.fire({
              icon: "success",
              title: "Profile Updated",
            });
            navigate("/profile");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              text: err.response.data.message,
              timer: 2000,
            });
            setLoading(false);
          });
      })
      .catch((err) => {
        let errorsArray = { paths: [], messages: {} };
        err.inner.forEach((error) => {
          errorsArray = {
            paths: [...errorsArray.paths, error.path],
            messages: { ...errorsArray.messages, [error.path]: error.message },
          };
        });
        setErrors(errorsArray);
        setLoading(false);
      });
  }

  function uploadProfile(e) {
    if (e.target.files[0]) {
      const image = new FormData();
      image.append("image", e.target.files[0]);
      api
        .post(`/profile/image`, image, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          dispatch(setUser({ user: response.data }));
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: err.response.data.message,
            timer: 2000,
          });
        });
    }
  }

  function uploadBackground(e) {
    if (e.target.files[0]) {
      const background = new FormData();
      background.append("background", e.target.files[0]);
      api
        .post(`/profile/background`, background, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          dispatch(setUser({ user: response.data }));
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            text: err.response.data.message,
            timer: 2000,
          });
        });
    }
  }

  return (
    <>
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
              className="btn btn-sm rounded-full border border-gray-500 bg-dark-900 normal-case"
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
            <div className="text-sm font-semibold text-gray-500 mr-4">
              <span className="text-white mr-1">{user?.following?.length}</span>
              Following
            </div>
            <div className="text-sm font-semibold text-gray-500">
              <span className="text-white mr-1">{user?.followers?.length}</span>
              Followers
            </div>
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
                    {user?.name.length > 10
                      ? user?.name.slice(0, 9) + "..."
                      : user?.name}
                  </span>
                  <span className="mr-1 text-sm text-gray-500">
                    @
                    {user?.username.length > 5
                      ? user?.username.slice(0, 4) + "..."
                      : user?.username}
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
                Quisque nec porta magna. Maecenas sit amet tristique odio,
                dapibus pellentesque neque. Nulla ut quam in tellus ornare
                interdum vel in.
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
      <div className="w-screen h-screen absolute top-0 z-10 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="w-full h-full bg-dark-900 relative z-50 md:w-600 md:h-5/6 md:overflow-y-auto md:rounded-xl">
          <div className="h-12 max-h-12 flex items-center justify-between bg-dark-900 bg-opacity-50 sticky z-50 w-full top-0 backdrop-blur-sm">
            <div className="flex items-center">
              <div
                className="w-10 flex items-center justify-center cursor-pointer py-2"
                onClick={() => navigate(-1)}
              >
                <span className="md:hidden">
                  <i className="fa-regular fa-angle-left text-lg"></i>
                </span>
                <span className="hidden md:block">
                  <i className="fa-regular fa-xmark text-lg"></i>
                </span>
              </div>
              <div className="flex items-center pl-1 md:pl-3">
                <p className="font-semibold md:text-lg">Edit profile</p>
              </div>
            </div>
            <button
              className={`btn rounded-full bg-white text-black btn-sm text-sm normal-case btn-outline mr-3 ${
                loading ? "loading" : ""
              }`}
              onClick={submit}
              disabled={loading}
            >
              Save
            </button>
          </div>
          <div className="w-full h-36 sm:h-44 md:h-60 relative">
            {user?.background?.length !== 0 ? (
              <img
                className="w-full h-full object-cover"
                src={`http://localhost:5000/${user?.background[0].path}`}
                alt=""
              />
            ) : (
              ""
            )}
            <div className="w-full h-full bg-gray-800 bg-opacity-50 absolute top-0 flex items-center justify-center">
              <input
                className="cursor-pointer absolute block opacity-0 top-0 w-full h-full"
                type="file"
                onChange={uploadBackground}
              />
              <button className="btn btn-circle btn-ghost ">
                <i className="fa-light fa-camera text-xl"></i>
              </button>
            </div>
          </div>
          <div className="py-3 px-4">
            <div className="flex relative justify-end mb-9">
              <div className="avatar absolute -top-12 left-0 sm:-top-14 sm:left-0 md:-top-17 md:left-0">
                <div className="rounded-full mb-2 w-17 h-17 md:w-24 md:h-24 border-2 md:border-4 border-dark-900 relative">
                  <img
                    src={
                      user?.profile && user?.profile?.length !== 0
                        ? `http://localhost:5000/${user?.profile[0].path}`
                        : "http://localhost:5000/images/user.jpg"
                    }
                    alt=""
                  />
                  <div className="w-full h-full bg-gray-800 bg-opacity-50 absolute top-0 flex items-center justify-center">
                    <input
                      className="cursor-pointer absolute block opacity-0 top-0 w-full h-full"
                      type="file"
                      onChange={uploadProfile}
                    />
                    <button className="btn btn-circle btn-ghost">
                      <i className="fa-light fa-camera text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <form className="">
              <div className="form-control w-full mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="input bg-dark-900 input-bordered"
                  name="name"
                  value={form.name}
                  onChange={inputHandler}
                ></input>
                {errors.paths.includes("name") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.name}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-full mb-4">
                <label className="input-group">
                  <span className="bg-white text-black">@</span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="input bg-dark-900 input-bordered  w-full"
                    name="username"
                    value={form.username}
                    onChange={inputHandler}
                  ></input>
                </label>
                {errors.paths.includes("username") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.username}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-full mb-4">
                <input
                  type="text"
                  placeholder="Email"
                  className="input bg-dark-900 input-bordered"
                  name="email"
                  value={form.email}
                  onChange={inputHandler}
                ></input>
                {errors.paths.includes("email") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.email}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control mb-4">
                <textarea
                  className="textarea h-24 textarea-bordered bg-dark-900 w-full"
                  placeholder="Bio"
                  name="bio"
                  onChange={inputHandler}
                  defaultValue={form.bio}
                ></textarea>
                <label className="label">
                  <span
                    className={`label-text-alt ${
                      form.bio?.length > 255 ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {form.bio?.length || 0} / 255
                  </span>
                </label>
                {errors.paths.includes("bio") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.bio}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-full mb-4">
                <input
                  type="text"
                  placeholder="Website"
                  className="input bg-dark-900 input-bordered"
                  name="website"
                  value={form.website}
                  onChange={inputHandler}
                ></input>
                {errors.paths.includes("website") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.website}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="form-control w-full mb-4">
                <input
                  type="date"
                  placeholder="Birthday"
                  className="input bg-dark-900 input-bordered"
                  name="dateBirthday"
                  value={form.dateBirthday}
                  onChange={inputHandler}
                ></input>
                {errors.paths.includes("dateBirthday") ? (
                  <label className="label">
                    <span className="label-text-alt text-red-500">
                      {errors.messages.dateBirthday}
                    </span>
                  </label>
                ) : (
                  ""
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
