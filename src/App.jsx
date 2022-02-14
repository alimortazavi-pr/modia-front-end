import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

//Import Assets
import "assets/css/globals.css";
import "assets/fonts/fontawesome/css/all.min.css";

//Import Tools
import api from "api";

//Import Router
import routes from "router";

//Import Actions
import { login, notLogin } from "store/actions/auth";

//Import Components
import Loading from "components/layouts/Loading";
// import Footer from "components/layouts/Footer";
import CreatePost from "pages/profile/posts/Create";
import EditPost from "pages/profile/posts/Edit";

export default function App() {
  //Redux
  const user = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.layouts.loading);
  const dispatch = useDispatch();

  //Other Hooks
  const location = useLocation();
  let state = location.state;

  //Effects
  useEffect(
    () => {
      const token = localStorage.getItem("token");
      if (token) {
        api
          .get("/check-login", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            dispatch(login({ token, user: response.data.user }));
          })
          .catch((err) => {
            console.log(err.response);
            dispatch(notLogin());
          });
      } else {
        dispatch(notLogin());
      }
    },
    // eslint-disable-next-line
    [user.login]
  );

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        {routes.map(({ path, Component, exact }) => {
          return (
            <Route
              key={path}
              path={path}
              exact={exact}
              element={
                <>
                  <Loading loading={loading} />
                  <Component />
                  {/* <Footer /> */}
                </>
              }
            />
          );
        })}
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/posts/create" element={<CreatePost />} />
          <Route path="/posts/:post/edit" element={<EditPost />} />
        </Routes>
      )}
    </>
  );
}
