import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

//Import Components
import Template from "components/layouts/Template";
import CreatePost from "components/home/profile/posts/CreatePost";

//Import Actions
import { setTitle } from "store/actions/layouts";

export default function Home() {
  //Redux
  const dispatch = useDispatch();

  //Other Hooks
  const location = useLocation();

  //Effects
  useEffect(() => {
    document.title = "Modia | Home";
    dispatch(setTitle("Home"));
  });

  return (
    <Template>
      <CreatePost />
      <div
        className="w-full overflow-hidden"
        style={{ height: "2000px" }}
      ></div>
      <Link
        to="/posts/create"
        state={{ backgroundLocation: location }}
        className="absolute bottom-5 right-5 md:hidden btn btn-circle btn-primary shadow shadow-slate-500"
      >
        <i className="fa-regular fa-plus text-lg"></i>
      </Link>
    </Template>
  );
}
