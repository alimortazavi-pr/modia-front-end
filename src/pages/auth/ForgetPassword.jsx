import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Import Tools
import api from "api";

//Import Components
import Swal, { Toast } from "assets/js/Swal";

//Import Validators
import { forgetPasswordValidator } from "validators/authValidator";

export default function ForgetPassword() {
  //Redux
  const user = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();

  //States
  const [form, setForm] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ paths: [], messages: {} });

  //Effects
  useEffect(() => {
    if (user.login !== null && user.login) {
      return navigate("/");
    }
  }, [user.login, navigate]);

  useEffect(() => {
    document.title = "Modia | Forget Password";
  });

  //Functions
  function inputHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);
    //Validate and Send Request
    forgetPasswordValidator
      .validate(form, { abortEarly: false })
      .then(() => {
        api
          .post("/auth/password/email", form)
          .then(() => {
            Toast.fire({
              icon: "success",
              title: "Please check your email",
            });
            setLoading(false);
            setForm({
              email: "",
            });
            setErrors({ paths: [], messages: {} });
            navigate("/login");
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
      <div className="h-screen bg-dark-900 flex justify-center items-center">
        <div className="w-80">
          <h5 className="text-3xl text-white text-center mb-11">
            Forget password.
          </h5>
          <div className="w-full flex flex-col items-center">
            <form
              className="w-full flex flex-col items-center mb-5"
              onSubmit={submit}
            >
              <div className="form-control w-10/12 mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered border-2 rounded-xl"
                  name="email"
                  onChange={inputHandler}
                />
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
              <button
                type="submit"
                className={`btn w-10/12 mt-3 bg-gradient-to-tr from-sky-600 to-sky-300 border-0 rounded-xl normal-case ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                Submit
              </button>
            </form>
            <p className="text-gray-500 text-xs font-semibold mb-2">
              <Link to="/login" className="text-gray-200 mr-2">
                Login
              </Link>
              <span className="">|</span>
              <Link to="/register" className="text-gray-200 ml-2">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
