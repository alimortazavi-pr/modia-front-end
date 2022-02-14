import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { postValidator } from "validators/postValidator";

export default function Edit() {
  //Redux
  const { user } = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();
  const params = useParams();

  //States
  const [post, setPost] = useState({
    content: "",
  });
  const [images, setImages] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Effects
  useEffect(() => {
    api
      .get(`/posts/${params.post}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((response) => {
        setPost(response.data.post);
        setImgsPreview(response.data.post.images);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [user?.token, params.post]);

  //Functions
  function inputHandler(e) {
    setPost({
      ...post,
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

  function deleteImage(img) {
    if (img.path) {
      Swal.fire({
        title: "Are you sure?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/profile/images/${img._id}`, {
              headers: { Authorization: `Bearer ${user.token}` },
            })
            .then(() => {
              setImgsPreview([
                ...imgsPreview.filter((image) => image._id !== img._id),
              ]);

              Toast.fire({
                icon: "success",
                title: "Image Deleted",
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
      });
    } else {
      setImages([...images.filter((image) => image.id !== img.id)]);
      setImgsPreview([...imgsPreview.filter((image) => image.id !== img.id)]);
    }
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    //Validate and Send Request
    postValidator
      .validate(post, { abortEarly: false })
      .then(() => {
        const data = new FormData();
        data.append("content", post.content);
        images.forEach((image) => {
          data.append("images[]", image.file);
        });

        api
          .put(`/profile/posts/${params.post}`, data, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Post updated",
            });
            setLoading(false);
            setErrors({ paths: [], messages: {} });
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
            paths: [...errorsArray.paths, error.url],
            messages: { ...errorsArray.messages, [error.url]: error.message },
          };
        });
        setErrors(errorsArray);
        setLoading(false);
      });
  }

  return (
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
              <p className="font-semibold md:text-lg">Edit Post</p>
            </div>
          </div>
          <button
            className={`btn rounded-full btn-sm text-sm normal-case btn-primary mr-3 ${
              loading ? "loading" : ""
            }`}
            disabled={loading}
            onClick={submit}
          >
            Update
          </button>
        </div>
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
                  value={post.content}
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
                      onClick={() => deleteImage(img)}
                    >
                      <i className="fa-solid fa-xmark text-white "></i>
                    </span>
                    <img
                      className="rounded-md md:rounded-2xl w-full h-full object-cover"
                      src={img.url || `http://localhost:5000/${img.path}`}
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
  );
}
