import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//Import Tools
import api from "api";
import months from "assets/js/months";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { postValidator } from "validators/postValidator";

export default function CreateReply({ post, show, setShow }) {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Other Hooks

  //States
  const [form, setForm] = useState({
    content: "",
  });
  const [images, setImages] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Functions
  function inputHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function addImage(e) {
    const files = new Array(...e.target.files);
    if (imgsPreview.length >= 4 || imgsPreview.length + files.length > 4) {
      Swal.fire({
        icon: "error",
        text: "You can't upload more than 4 images",
        timer: 2000,
      });
      return;
    }
    const imgsPreviewArray = [];
    const imagesArray = [];
    if (files.length !== 0) {
      files.forEach((file, i) => {
        if (
          ["png", "jpeg", "jpg"].indexOf(
            file.name.split(".").pop().toLowerCase()
          ) === -1
        ) {
          Swal.fire({
            icon: "error",
            title: "Image format must be 'png' or 'jpeg' or 'jpg'",
            showConfirmButton: false,
            timer: "2000",
          });
          return;
        }
        const url = URL.createObjectURL(file);
        imgsPreviewArray.push({ url, id: i + 1 });
        imagesArray.push({ file, id: i + 1 });
      });
    }
    setImgsPreview([...imgsPreview, ...imgsPreviewArray]);
    setImages([...images, ...imagesArray]);
  }

  function deleteImage(imgId) {
    setImages([...images.filter((image) => image.id !== imgId)]);
    setImgsPreview([...imgsPreview.filter((img) => img.id !== imgId)]);
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    //Validate and Send Request
    postValidator
      .validate(form, { abortEarly: false })
      .then(() => {
        const data = new FormData();
        data.append("content", form.content);
        data.append("parent", post._id);
        images.forEach((image) => {
          data.append("images[]", image.file);
        });

        api
          .post("/profile/posts", data, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Post created",
            });
            setLoading(false);
            setForm({
              content: "",
            });
            setErrors({ paths: [], messages: {} });
            setShow(false);
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

  return (
    <>
      {show ? (
        <div className="w-screen h-screen fixed left-0 top-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="w-full h-full bg-dark-900 relative z-50 md:w-600 md:h-5/6 md:overflow-y-auto md:rounded-xl">
            <div className="h-12 max-h-12 flex items-center justify-between bg-dark-900 bg-opacity-50 sticky z-50 w-full backdrop-blur-sm">
              <div className="flex items-center">
                <div
                  className="w-10 flex items-center justify-center cursor-pointer py-2"
                  onClick={() => setShow(false)}
                >
                  <span className="md:hidden">
                    <i className="fa-regular fa-angle-left text-lg"></i>
                  </span>
                  <span className="hidden md:block">
                    <i className="fa-regular fa-xmark text-lg"></i>
                  </span>
                </div>
                <div className="flex items-center pl-1 md:pl-3">
                  <p className="font-semibold md:text-lg">Reply</p>
                </div>
              </div>
              <button
                className={`btn rounded-full btn-sm text-sm normal-case btn-primary mr-3 ${
                  loading ? "loading" : ""
                }`}
                disabled={loading || form.content.length <= 0}
                onClick={submit}
              >
                Post
              </button>
            </div>
            <li className="border-gray-500 px-4 py-3 flex">
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
                <div className="mb-2">
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
                </div>
                <Link to={`/posts/${post._id}`} className="text-sm">
                  {post.content}
                </Link>
                <Link to={`/posts/${post._id}`} className="grid grid-cols-2">
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
                </Link>
                <div className="flex justify-between pt-4">
                  <p className="text-sm text-gray-500">
                    Replying to{" "}
                    <Link
                      to={`/${post.user?.username}`}
                      className="text-purple-500"
                    >
                      @{post.user?.username}
                    </Link>
                  </p>
                </div>
              </div>
            </li>
            <div className="px-4 py-3 flex">
              <div className="avatar">
                <div className="rounded-full w-12 h-12">
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
              <div className="ml-3 flex-1">
                <div className="border-b border-gray-600">
                  <div className="form-control">
                    <textarea
                      className="focus:outline-none text-lg max-h-48 bg-dark-900 w-full pt-3 resize-none"
                      name="content"
                      placeholder="What's happening?"
                      onChange={inputHandler}
                      value={form.content}
                    ></textarea>
                    {errors.paths.includes("content") ? (
                      <label className="label">
                        <span className="label-text-alt text-red-500">
                          {errors.messages.content}
                        </span>
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="grid grid-cols-2">
                    {imgsPreview.map((img, i) => (
                      <div
                        className={`relative p-2 ${
                          imgsPreview.length === 1
                            ? "col-span-2"
                            : (imgsPreview.length === 3) & (i === 0)
                            ? "row-span-2"
                            : "col-auto"
                        }`}
                        key={i}
                      >
                        <span
                          className="cursor-pointer absolute top-3 left-3 w-8 h-8 bg-black bg-opacity-70 flex justify-center items-center rounded-full"
                          onClick={() => deleteImage(img.id)}
                        >
                          <i className="fa-solid fa-xmark text-white "></i>
                        </span>
                        <img
                          className="rounded-md md:rounded-2xl w-full h-full object-cover"
                          src={img.url}
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex pt-3 px-3">
                  <label
                    className={`${
                      imgsPreview.length >= 4
                        ? "text-gray-500"
                        : "text-purple-500 cursor-pointer"
                    } mr-2`}
                  >
                    <i className="fa-regular fa-image text-lg"></i>
                    <input
                      type="file"
                      className="hidden "
                      onChange={addImage}
                      accept=".png,.jpeg,.jpg"
                      multiple
                      disabled={imgsPreview.length >= 4}
                    />
                  </label>
                  <div className="text-purple-500 mr-2 cursor-pointer">
                    <i className="fa-regular fa-gif text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
